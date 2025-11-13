import React, { FC, useEffect, useState } from "react";
import { Box, Typography, Grid2, TextField, Avatar } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as Yup from "yup";
import { Field, FieldProps, Form, Formik } from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import { uniqueId } from "lodash";

import { LoadingButton } from "@mui/lab";
import { useCategoryContext } from "@/contexts/CategoryContext";
import ConfirmDelete from "@/components/shared/used/ConfirmDelete";
import { ButtonType } from "@/interfaces/ShredType";
import { useNotifyContext } from "@/contexts/NotifyContext";
import axios from "axios";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useLocale } from "next-intl";
import StatusService from "@/components/shared/used/Status";
import dayjs from "dayjs";
import { Bath, MonitorCog } from "lucide-react";
import { AutoFixHigh, Category, Handyman, More } from "@mui/icons-material";
import { IconCurrencyBaht } from "@tabler/icons-react";
import { serviceService } from "@/utils/services/api-services/ServiceAPI";
import { useServiceContext } from "@/contexts/ServiceContext";
import { Service, initialService } from "@/interfaces/Store";

interface ServiceProps {
  viewOnly?: boolean;
}

const ServiceForm: FC<ServiceProps> = ({ viewOnly = false }) => {
  const { setServiceForm, serviceEdit, setServiceEdit, setServices, services } =
    useServiceContext();
  const { setNotify, notify, setOpenBackdrop, openBackdrop } =
    useNotifyContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disabledForm, setDisabledForm] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const localActive = useLocale();

  const validationSchema = Yup.object().shape({
    serialNo: Yup.string().required("กรุณากรอกรหัสอุปกรณ์"),
    ServiceName: Yup.string().required("กรุณากรอกชื่ออุปกรณ์"),
    aboutService: Yup.object().shape({
      rentalPriceCurrent: Yup.number()
        .required("กรุณากรอกราคาค่าเช่า")
        .min(1, "กรุณากรอกค่าที่มากกว่า 0"),
      stockStatus: Yup.string().required("กรุณาเลือกสถานะอุปกรณ์"),
      QTY: Yup.number().required("กรุณาใส่จำนวน"),
    }),
  });

  const handleFormSubmit = (
    value: Service,
    { resetForm, validateForm }: any
  ) => {
    validateForm(); // บังคับ validate หลังจากรีเซ็ต
    setIsLoading(true);
    console.log(value);
    if (serviceEdit) {
      handleUpdateService(value);
    } else {
      handleCreateService(value);
    }
    resetForm(); // รีเซ็ตค่าฟอร์ม
  };

  const handleUpdateService = async (Service: Service) => {
    setOpenBackdrop(true);
    const result = await serviceService.updateService(Service);
    setOpenBackdrop(false);
    setNotify({
      open: true,
      message: result.message,
      color: result.success ? "success" : "error",
    });
    if (result.success) {
      router.push(`/${localActive}/protected/inventory`);
    }
  };

  const handleCreateService = async (Service: Service) => {
    setOpenBackdrop(true);
    const result = await serviceService.createService(Service);
    setOpenBackdrop(false);
    setNotify({
      open: true,
      message: result.message,
      color: result.success ? "success" : "error",
    });
    if (result.success) {
      router.push(`/${localActive}/protected/inventory`);
    }
  };

  const handleGetSelectCategory = async () => {
    // const result = await categoryService.getSelectCategory();
    // if (result.success) {
    //   setCategorySelectState(result.data);
    // } else {
    //   setNotify({
    //     open: true,
    //     message: result.message,
    //     color: result.success ? "success" : "error",
    //   });
    // }
  };

  const getDataService = () => {
    const ServiceId = params.get("ServiceId");
    axios
      .get(`/api/Service?ServiceId=${ServiceId}`)
      .then(({ data }) => {
        // const modifiedData: Service = {
        //   ...data,
        //   aboutService: {
        //     ...data.aboutService,
        //     purchaseDate: dayjs(data.aboutService.purchaseDate),
        //   },
        // };

        // setServices(modifiedData);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Request cancelled");
        } else {
          console.error("Fetch error:", error);
        }
      })
      .finally(() => {});
  };

  // const getTypeData = () => {
  //   axios
  //     .get(`/api/Service/type?getbycharacter=true`)
  //     .then(({ data }) => {
  //       setTypeSelectState(data.data);
  //     })
  //     .catch((error) => {
  //       if (error.name === "AbortError") {
  //         console.log("Request cancelled");
  //       } else {
  //         console.error("Fetch error:", error);
  //       }
  //     })
  //     .finally(() => {});
  // };

  // useEffect(() => {
  //   if (
  //     Service.aboutService?.stockStatus ===
  //       ServiceStatus.CurrentlyRenting ||
  //     Service.aboutService?.stockStatus === ServiceStatus.InActive ||
  //     Service.aboutService?.stockStatus === ServiceStatus.Damaged
  //   ) {
  //     setDisabledForm(true);
  //   }
  // }, [Service]);

  useEffect(() => {
    setIsLoading(true);

    if (pathname.includes("new")) {
      setServiceForm(initialService);
      setServiceEdit(false);
      setDisabledForm(false);
    } else {
      setServiceEdit(true);
      getDataService();
    }

    // getTypeData();
    handleGetSelectCategory();

    return () => {
      setServiceForm(initialService);
      setServiceEdit(false);
      setDisabledForm(false);
    };
  }, []);

  return (
    <>
      <Formik<Service>
        initialValues={initialService} // ใช้ state เป็น initialValues
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
        enableReinitialize // เพื่อให้ Formik อัปเดตค่าจาก useState
      >
        {({
          values,
          setFieldValue,
          errors,
          touched,
          isSubmitting,
          resetForm,
        }) => (
          <Form>
            <Box p={3} border="1px solid #ccc" borderRadius="8px">
              <Grid2 container spacing={3}>
                <Grid2 size={{ xs: 12 }}>
                  <Grid2 size={{ xs: 12 }} mb={2}>
                    <Grid2 container alignItems="center">
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        <MonitorCog size={20} />
                      </Avatar>
                      <Typography variant="h4" gutterBottom ml={2} mt={0.5}>
                        รายละเอียดอุปกรณ์
                      </Typography>
                    </Grid2>
                  </Grid2>
                  {/* {Service.aboutService?.stockStatus !==
                    ServiceStatus.InStock && (
                    <StatusService
                      status={Service.aboutService?.stockStatus}
                      message='อุปกรณ์อยู่ระหว่างใช้งาน "ไม่สามารถแก้ไข" หรือ "ยกเลิกใช้งานได้"'
                    />
                  )} */}
                </Grid2>

                {/* Service ID */}
                <Grid2 size={{ xs: 6 }}>
                  <Field name="serialNo">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        name="serialNo"
                        label="รหัสอุปกรณ์ (จำเป็น)"
                        // sx={{ textTransform: "uppercase" }}
                        // value={values.serialNo ? values.serialNo : ""}
                        onChange={(e) => {
                          setFieldValue(
                            "serialNo",
                            e.target.value.toUpperCase()
                          );
                        }}
                        slotProps={{
                          inputLabel: { shrink: true },
                          input: {
                            readOnly: viewOnly ? true : false,
                          },
                        }}
                        // placeholder="EXAMPLE: SN-00001"
                        // error={touched.serialNo && Boolean(errors.serialNo)}
                        // helperText={touched.serialNo && errors.serialNo}
                        fullWidth
                        disabled={openBackdrop || isSubmitting || disabledForm}
                      />
                    )}
                  </Field>
                </Grid2>

                {/* Service Name */}
                <Grid2 size={{ xs: 6 }}>
                  <Field name="ServiceName">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        name="ServiceName"
                        label="ชื่ออุปกรณ์ (จำเป็น)"
                        // value={values.ServiceName}
                        onChange={(e) => {
                          setFieldValue("ServiceName", e.target.value);
                        }}
                        placeholder="EXAMPLE: Crane Tower"
                        slotProps={{
                          inputLabel: { shrink: true },
                          input: {
                            readOnly: viewOnly ? true : false,
                          },
                        }}
                        // error={
                        //   touched.ServiceName && Boolean(errors.ServiceName)
                        // }
                        // helperText={
                        //   touched.ServiceName && errors.ServiceName
                        // }
                        fullWidth
                        disabled={openBackdrop || isSubmitting || disabledForm}
                      />
                    )}
                  </Field>
                </Grid2>

                <Grid2 size={{ xs: 6 }}>
                  <Field name="model">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        name="model"
                        label="Model"
                        // sx={{ textTransform: "uppercase" }}
                        // value={values.model ? values.model : ""}
                        onChange={(e) => {
                          setFieldValue(
                            "model",
                            e.target.value
                          );
                        }}
                        slotProps={{
                          inputLabel: { shrink: true },
                          input: {
                            readOnly: viewOnly ? true : false,
                          },
                        }}
                        placeholder=""
                        // error={touched.model && Boolean(errors.model)}
                        // helperText={touched.model && errors.model}
                        fullWidth
                        disabled={openBackdrop || isSubmitting || disabledForm}
                      />
                    )}
                  </Field>
                </Grid2>

                {/* Rental Price */}
                <Grid2 size={{ xs: 6 }}>
                  <Field name="aboutService.rentalPriceCurrent">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        disabled={openBackdrop || isSubmitting || disabledForm}
                        name="aboutService.rentalPriceCurrent"
                        // placeholder="EXAMPLE: 999999999"
                        label="ราคาเช่าปัจจุบัน/เดือน (จำเป็น)"
                        // value={values.aboutService?.rentalPriceCurrent ?? ""}
                        slotProps={{
                          inputLabel: { shrink: true },
                          input: {
                            readOnly: viewOnly ? true : false,
                            endAdornment: <IconCurrencyBaht />,
                          },
                        }}
                        type="number"
                        onChange={(e) => {
                          const newValue = e.target.value.replace(/\D/g, ""); // กรองเฉพาะตัวเลข
                          setFieldValue(
                            "aboutService.rentalPriceCurrent",
                            newValue || ""
                          ); // ป้องกัน NaN
                        }}
                        // error={
                        //   touched.aboutService?.rentalPriceCurrent &&
                        //   Boolean(errors.aboutService?.rentalPriceCurrent)
                        // }
                        // helperText={
                        //   touched.aboutService?.rentalPriceCurrent &&
                        //   errors.aboutService?.rentalPriceCurrent
                        // }
                        fullWidth
                      />
                    )}
                  </Field>
                </Grid2>

                <Grid2 size={{ xs: 6 }}>
                  <Field name="aboutService.ServicePrice">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        disabled={openBackdrop || isSubmitting || disabledForm}
                        name="aboutService.ServicePrice"
                        label="ราคาอุปกรณ์ (ถ้ามี)"
                        // placeholder="EXAMPLE: 9999999"
                        // value={values.aboutService?.ServicePrice ?? ""}
                        slotProps={{
                          inputLabel: { shrink: true },
                          input: {
                            readOnly: viewOnly ? true : false,
                            endAdornment: <IconCurrencyBaht />,
                          },
                        }}
                        type="number"
                        onChange={(e) => {
                          const newValue = e.target.value.replace(/\D/g, ""); // กรองเฉพาะตัวเลข
                          setFieldValue(
                            "aboutService.ServicePrice",
                            newValue || ""
                          ); // ป้องกัน NaN
                        }}
                        // error={
                        //   touched.aboutService?.ServicePrice &&
                        //   Boolean(errors.aboutService?.ServicePrice)
                        // }
                        // helperText={
                        //   touched.aboutService?.ServicePrice &&
                        //   errors.aboutService?.ServicePrice
                        // }
                        fullWidth
                      />
                    )}
                  </Field>
                </Grid2>

                <Grid2 size={{ xs: 6 }}>
                  <Field name="aboutService.QTY">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        name="aboutService.QTY"
                        label="จำนวน (จำเป็น)"
                        // value={values.aboutService?.QTY ? values.aboutService?.QTY : ""}
                        onChange={(e) => {
                          // setFieldValue("aboutService.QTY", e.target.value);
                          const newValue = e.target.value.replace(/\D/g, ""); // กรองเฉพาะตัวเลข
                          setFieldValue(
                            "aboutService.QTY",
                            newValue || ""
                          ); // ป้องกัน NaN
                        }}
                        slotProps={{
                          inputLabel: { shrink: true },
                          input: {
                            readOnly: viewOnly ? true : false,
                          },
                        }}
                        // error={
                        //   touched.aboutService?.QTY &&
                        //   Boolean(errors.aboutService?.QTY)
                        // }
                        // helperText={
                        //   touched.aboutService?.QTY &&
                        //   errors.aboutService?.QTY
                        // }
                        fullWidth
                        disabled={openBackdrop || isSubmitting || disabledForm}
                      />
                    )}
                  </Field>
                </Grid2>

                <Grid2 size={{ xs: 6 }}>
                  <Field name="purchaseDate">
                    {({ field }: FieldProps) => (
                      <DatePicker
                        disabled={openBackdrop || isSubmitting || disabledForm}
                        label="วันที่ซื้ออุปกรณ์ (ถ้ามี)"
                        name="purchaseDate"
                        sx={{ minWidth: "100%" }}
                        // value={
                        //   values.aboutService?.purchaseDate !== undefined
                        //     ? dayjs(values.aboutService.purchaseDate)
                        //     : null
                        // }
                        onChange={(newValue) => {
                          setFieldValue(
                            "aboutService.purchaseDate",
                            newValue
                          );
                        }}
                        slotProps={
                          {
                            // textField: {
                            //   helperText: "DD/MM/YYYY",
                            // },
                          }
                        }
                      />
                    )}
                  </Field>
                </Grid2>

                <Grid2 size={{ xs: 6 }}>
                  <Field name="registerDate">
                    {({ field }: FieldProps) => (
                      <DatePicker
                        disabled={openBackdrop || isSubmitting || disabledForm}
                        label="วันที่ลงทะเบียน (ถ้ามี)"
                        name="registerDate"
                        sx={{ minWidth: "100%" }}
                        // value={
                        //   values.aboutService?.registerDate !== undefined
                        //     ? dayjs(values.aboutService.registerDate)
                        //     : null
                        // }
                        onChange={(newValue) => {
                          setFieldValue(
                            "aboutService.registerDate",
                            newValue
                          );
                        }}
                        slotProps={
                          {
                            // textField: {
                            //   helperText: "DD/MM/YYYY",
                            // },
                          }
                        }
                      />
                    )}
                  </Field>
                </Grid2>

                {/* Status */}
                {/* <Grid2 size={{ xs: 6 }}>
                  <FormControl
                    fullWidth
                    error={
                      touched.aboutService?.stockStatus &&
                      Boolean(errors.aboutService?.stockStatus)
                    }
                    disabled={openBackdrop || isSubmitting || disabledForm}
                  >
                    <InputLabel id="stockStatus-label">สถานะอุปกรณ์</InputLabel>
                    <Field name="aboutService.stockStatus">
                      {({ field }: any) => (
                        <Select
                          type="hidden"
                          {...field}
                          label="สถานะอุปกรณ์ (จำเป็น)"
                          labelId="stockStatus-label"
                          value={values.aboutService.stockStatus}
                          onChange={(event) => {
                            console.log(event.target);
                            const value = event.target.value as ServiceStatus;
                            setFieldValue("aboutService.stockStatus", value);
                          }}
                          slotProps={{
                            inputLabel: { shrink: true },
                            input: {
                              readOnly: viewOnly ? true : false,
                            },
                          }}
                        >
                          {Object.values(ServiceStatus).map((status) => (
                            <MenuItem key={status} value={status}>
                              {status}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    </Field>
                    {touched.aboutService?.stockStatus &&
                      errors.aboutService?.stockStatus && (
                        <FormHelperText>
                          {errors.aboutService?.stockStatus}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Grid2> */}
              </Grid2>

              <Grid2 container spacing={3}>
                <Grid2 size={{ xs: 12 }} sx={{ mt: 5 }}>
                  <Grid2 size={{ xs: 12 }} mb={2}>
                    <Grid2 container alignItems="center">
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        <Category />
                      </Avatar>
                      <Typography variant="h4" gutterBottom ml={2} mt={0.5}>
                        กำหนดหมวดหมู่
                      </Typography>
                    </Grid2>
                  </Grid2>
                </Grid2>
                {/* Category */}
                <Grid2 size={{ xs: 6 }}>
                  {/* <Field name="categoryId">
                    {({ field }: FieldProps) => (
                      <Autocomplete
                        disabled={disabledForm || isLoading}
                        id="categoryId"
                        placeholder="เลือกหมวดหมู่"
                        value={
                          values.categoryId
                            ? values.category?.categoryName
                            : null
                        }
                        options={categorySelectState}
                        getOptionLabel={(option: CategorySelect | string) =>
                          typeof option === "string"
                            ? option
                            : option.categoryName
                        }
                        loading
                        onChange={(event, value) => {
                          if (typeof value !== "string") {
                            setFieldValue(
                              "categoryId",
                              value !== null ? value.categoryId : ""
                            );
                          }
                        }}
                        readOnly={viewOnly ? true : false}
                        renderInput={(params) => (
                          <TextField
                            value={
                              values.categoryId
                                ? values.category?.categoryName
                                : null
                            }
                            label="หมวดหมู่"
                            name="categoryId"
                            {...params}
                          />
                        )}
                      />
                    )}
                  </Field> */}
                  {/* <Field name="categoryId">
                    {({ field }: FieldProps) => (
                      <Autocomplete
                        disabled={openBackdrop || isSubmitting || disabledForm}
                        id="categoryId"
                        // options={categorySelectState}
                        // getOptionLabel={(option: CategorySelect) =>
                        //   option.categoryName
                        // }
                        // isOptionEqualToValue={(option, value) =>
                        //   option.categoryId === value.categoryId
                        // }
                        // value={
                        //   categorySelectState.find(
                        //     (cat) => cat.categoryId === values.categoryId
                        //   ) || null
                        // }
                        // onChange={(event, value) => {
                        //   setFieldValue(
                        //     "categoryId",
                        //     value ? value.categoryId : ""
                        //   );
                        // }}
                        readOnly={viewOnly}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="หมวดหมู่"
                            name="categoryId"
                          />
                        )}
                      />
                    )}
                  </Field> */}
                </Grid2>
              </Grid2>

              <Grid2 container spacing={3}>
                <Grid2 size={{ xs: 12 }} sx={{ mb: 2, mt: 5 }}>
                  <Grid2 size={{ xs: 12 }} mb={2}>
                    <Grid2 container alignItems="center">
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        <More fontSize="small" />
                      </Avatar>
                      <Typography variant="h4" gutterBottom ml={2} mt={0.5}>
                        เพิ่มเติม
                      </Typography>
                    </Grid2>
                  </Grid2>
                </Grid2>

                {/* Service Brand */}
                <Grid2 size={{ xs: 6 }}>
                  <Field name="brand">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        name="brand"
                        label="แบรนด์ (ถ้ามี)"
                        // value={values.brand ? values.brand : ""}
                        onChange={(e) => {
                          setFieldValue("brand", e.target.value);
                        }}
                        slotProps={{
                          inputLabel: { shrink: true },
                          input: {
                            readOnly: viewOnly ? true : false,
                          },
                        }}
                        fullWidth
                        disabled={openBackdrop || isSubmitting || disabledForm}
                      />
                    )}
                  </Field>
                </Grid2>

                <Grid2 size={{ xs: 6 }}>
                  <Field name="aboutService.PO">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        name="PO"
                        label="PO (ถ้ามี)"
                        // value={values.aboutService?.PO ? values.aboutService?.PO : ""}
                        onChange={(e) => {
                          setFieldValue("aboutService.PO", e.target.value);
                        }}
                        slotProps={{
                          inputLabel: { shrink: true },
                          input: {
                            readOnly: viewOnly ? true : false,
                          },
                        }}
                        fullWidth
                        disabled={openBackdrop || isSubmitting || disabledForm}
                      />
                    )}
                  </Field>
                </Grid2>
                <Grid2 size={{ xs: 6 }}>
                  <Field name="aboutService.fixAssetsNumber">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        name="aboutService.fixAssetsNumber"
                        label="fixAssetsNumber (ถ้ามี)"
                        // value={values.aboutService?.fixAssetsNumber ? values.aboutService?.fixAssetsNumber : ""}
                        onChange={(e) => {
                          setFieldValue("aboutService.fixAssetsNumber", e.target.value);
                        }}
                        slotProps={{
                          inputLabel: { shrink: true },
                          input: {
                            readOnly: viewOnly ? true : false,
                          },
                        }}
                        fullWidth
                        disabled={openBackdrop || isSubmitting || disabledForm}
                      />
                    )}
                  </Field>
                </Grid2>
                <Grid2 size={{ xs: 6 }}>
                  <Field name="aboutService.BTLNumber">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        name="aboutService.BTLNumber"
                        label="BTLNumber (ถ้ามี)"
                        // value={values.aboutService?.BTLNumber ? values.aboutService?.BTLNumber : ""}
                        onChange={(e) => {
                          setFieldValue("aboutService.BTLNumber", e.target.value);
                        }}
                        slotProps={{
                          inputLabel: { shrink: true },
                          input: {
                            readOnly: viewOnly ? true : false,
                          },
                        }}
                        fullWidth
                        disabled={openBackdrop || isSubmitting || disabledForm}
                      />
                    )}
                  </Field>
                </Grid2>

                {/* Service Description */}
                <Grid2 size={{ xs: 6 }}>
                  <Field name="description">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        name="description"
                        label="รายละเอียดอุปกรณ์ (ถ้ามี)"
                        // value={values.description ? values.description : ""}
                        multiline
                        rows={4}
                        onChange={(e) => {
                          setFieldValue("description", e.target.value);
                        }}
                        slotProps={{
                          inputLabel: { shrink: true },
                          input: {
                            readOnly: viewOnly ? true : false,
                          },
                        }}
                        fullWidth
                        disabled={openBackdrop || isSubmitting || disabledForm}
                      />
                    )}
                  </Field>
                </Grid2>

                {/* Type */}
                {/* <Grid2 size={{ xs: 6 }}>
                  <Field name="ServiceTypeId">
                    {({ field }: FieldProps) => (
                      <Autocomplete
                        disabled={disabledForm}
                        id="ServiceTypeId"
                        options={typeSelectState}
                        getOptionLabel={(option: TypeSelect) =>
                          option.ServiceTypeName
                        }
                        loading
                        onChange={(e, value) => {
                          setFieldValue(
                            "ServiceTypeId",
                            value !== null ? value.ServiceTypeId : ""
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            label="ประเภทอุปกรณ์"
                            name="ServiceTypeId"
                            {...params}
                          />
                        )}
                      />
                    )}
                  </Field>
                </Grid2> */}
              </Grid2>
              <Grid2
                sx={{ mt: 5, display: "flex", justifyContent: "flex-end" }}
              >
                {/* {ServiceEdit === false ? (
                    <Button
                      variant="outlined"
                      onClick={makeFakeData}
                      sx={{ mr: 1 }}
                      startIcon={<AutoFixHigh />}
                    >
                      สร้างแบบรวดเร็ว
                    </Button>
                  ) : (
                    ""
                  )} */}

                <LoadingButton
                  variant="contained"
                  type="submit"
                  color="primary"
                  sx={{ mr: 1 }}
                  disabled={openBackdrop || isSubmitting || disabledForm}
                  loading={openBackdrop || isSubmitting}
                  startIcon={<Handyman />}
                >
                  {/* {!ServiceEdit ? "เพิ่มอุปกรณ์" : "แก้ไขอุปกรณ์"} */}
                </LoadingButton>
                <ConfirmDelete
                  itemId={uniqueId()}
                  onDisable={openBackdrop || isSubmitting}
                  onDelete={() => resetForm()}
                  massage={`คุณต้องการล้างฟอร์มใช่หรือไม่?`}
                  buttonType={ButtonType.Button}
                />
              </Grid2>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ServiceForm;
