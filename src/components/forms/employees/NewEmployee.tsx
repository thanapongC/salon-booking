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
import StatusEmployee from "@/components/shared/used/Status";
import dayjs from "dayjs";
import { Bath, MonitorCog } from "lucide-react";
import { AutoFixHigh, Category, Handyman, More } from "@mui/icons-material";
import { IconCurrencyBaht } from "@tabler/icons-react";
import { employeeService } from "@/utils/services/api-services/EmployeeAPI";
import { useEmployeeContext } from "@/contexts/EmployeeContext";
import { Employee, initialEmployee } from "@/interfaces/Store";

interface EmployeeProps {
  viewOnly?: boolean;
}

const EmployeeForm: FC<EmployeeProps> = ({ viewOnly = false }) => {
  const { setEmployeeForm, employeeEdit, setEmployeeEdit, setEmployees, employees } =
    useEmployeeContext();
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
    EmployeeName: Yup.string().required("กรุณากรอกชื่ออุปกรณ์"),
    aboutEmployee: Yup.object().shape({
      rentalPriceCurrent: Yup.number()
        .required("กรุณากรอกราคาค่าเช่า")
        .min(1, "กรุณากรอกค่าที่มากกว่า 0"),
      stockStatus: Yup.string().required("กรุณาเลือกสถานะอุปกรณ์"),
      QTY: Yup.number().required("กรุณาใส่จำนวน"),
    }),
  });

  const handleFormSubmit = (
    value: Employee,
    { resetForm, validateForm }: any
  ) => {
    validateForm(); // บังคับ validate หลังจากรีเซ็ต
    setIsLoading(true);
    console.log(value);
    if (employeeEdit) {
      handleUpdateEmployee(value);
    } else {
      handleCreateEmployee(value);
    }
    resetForm(); // รีเซ็ตค่าฟอร์ม
  };

  const handleUpdateEmployee = async (Employee: Employee) => {
    setOpenBackdrop(true);
    const result = await employeeService.updateEmployee(Employee);
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

  const handleCreateEmployee = async (Employee: Employee) => {
    setOpenBackdrop(true);
    const result = await employeeService.createEmployee(Employee);
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

  const getDataEmployee = () => {
    const EmployeeId = params.get("EmployeeId");
    axios
      .get(`/api/Employee?EmployeeId=${EmployeeId}`)
      .then(({ data }) => {
        // const modifiedData: Employee = {
        //   ...data,
        //   aboutEmployee: {
        //     ...data.aboutEmployee,
        //     purchaseDate: dayjs(data.aboutEmployee.purchaseDate),
        //   },
        // };

        // setEmployees(modifiedData);
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
  //     .get(`/api/Employee/type?getbycharacter=true`)
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
  //     Employee.aboutEmployee?.stockStatus ===
  //       EmployeeStatus.CurrentlyRenting ||
  //     Employee.aboutEmployee?.stockStatus === EmployeeStatus.InActive ||
  //     Employee.aboutEmployee?.stockStatus === EmployeeStatus.Damaged
  //   ) {
  //     setDisabledForm(true);
  //   }
  // }, [Employee]);

  useEffect(() => {
    setIsLoading(true);

    if (pathname.includes("new")) {
      setEmployeeForm(initialEmployee);
      setEmployeeEdit(false);
      setDisabledForm(false);
    } else {
      setEmployeeEdit(true);
      getDataEmployee();
    }

    // getTypeData();
    handleGetSelectCategory();

    return () => {
      setEmployeeForm(initialEmployee);
      setEmployeeEdit(false);
      setDisabledForm(false);
    };
  }, []);

  return (
    <>
      <Formik<Employee>
        initialValues={initialEmployee} // ใช้ state เป็น initialValues
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
                  {/* {Employee.aboutEmployee?.stockStatus !==
                    EmployeeStatus.InStock && (
                    <StatusEmployee
                      status={Employee.aboutEmployee?.stockStatus}
                      message='อุปกรณ์อยู่ระหว่างใช้งาน "ไม่สามารถแก้ไข" หรือ "ยกเลิกใช้งานได้"'
                    />
                  )} */}
                </Grid2>

                {/* Employee ID */}
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

                {/* Employee Name */}
                <Grid2 size={{ xs: 6 }}>
                  <Field name="EmployeeName">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        name="EmployeeName"
                        label="ชื่ออุปกรณ์ (จำเป็น)"
                        // value={values.EmployeeName}
                        onChange={(e) => {
                          setFieldValue("EmployeeName", e.target.value);
                        }}
                        placeholder="EXAMPLE: Crane Tower"
                        slotProps={{
                          inputLabel: { shrink: true },
                          input: {
                            readOnly: viewOnly ? true : false,
                          },
                        }}
                        // error={
                        //   touched.EmployeeName && Boolean(errors.EmployeeName)
                        // }
                        // helperText={
                        //   touched.EmployeeName && errors.EmployeeName
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
                  <Field name="aboutEmployee.rentalPriceCurrent">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        disabled={openBackdrop || isSubmitting || disabledForm}
                        name="aboutEmployee.rentalPriceCurrent"
                        // placeholder="EXAMPLE: 999999999"
                        label="ราคาเช่าปัจจุบัน/เดือน (จำเป็น)"
                        // value={values.aboutEmployee?.rentalPriceCurrent ?? ""}
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
                            "aboutEmployee.rentalPriceCurrent",
                            newValue || ""
                          ); // ป้องกัน NaN
                        }}
                        // error={
                        //   touched.aboutEmployee?.rentalPriceCurrent &&
                        //   Boolean(errors.aboutEmployee?.rentalPriceCurrent)
                        // }
                        // helperText={
                        //   touched.aboutEmployee?.rentalPriceCurrent &&
                        //   errors.aboutEmployee?.rentalPriceCurrent
                        // }
                        fullWidth
                      />
                    )}
                  </Field>
                </Grid2>

                <Grid2 size={{ xs: 6 }}>
                  <Field name="aboutEmployee.EmployeePrice">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        disabled={openBackdrop || isSubmitting || disabledForm}
                        name="aboutEmployee.EmployeePrice"
                        label="ราคาอุปกรณ์ (ถ้ามี)"
                        // placeholder="EXAMPLE: 9999999"
                        // value={values.aboutEmployee?.EmployeePrice ?? ""}
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
                            "aboutEmployee.EmployeePrice",
                            newValue || ""
                          ); // ป้องกัน NaN
                        }}
                        // error={
                        //   touched.aboutEmployee?.EmployeePrice &&
                        //   Boolean(errors.aboutEmployee?.EmployeePrice)
                        // }
                        // helperText={
                        //   touched.aboutEmployee?.EmployeePrice &&
                        //   errors.aboutEmployee?.EmployeePrice
                        // }
                        fullWidth
                      />
                    )}
                  </Field>
                </Grid2>

                <Grid2 size={{ xs: 6 }}>
                  <Field name="aboutEmployee.QTY">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        name="aboutEmployee.QTY"
                        label="จำนวน (จำเป็น)"
                        // value={values.aboutEmployee?.QTY ? values.aboutEmployee?.QTY : ""}
                        onChange={(e) => {
                          // setFieldValue("aboutEmployee.QTY", e.target.value);
                          const newValue = e.target.value.replace(/\D/g, ""); // กรองเฉพาะตัวเลข
                          setFieldValue(
                            "aboutEmployee.QTY",
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
                        //   touched.aboutEmployee?.QTY &&
                        //   Boolean(errors.aboutEmployee?.QTY)
                        // }
                        // helperText={
                        //   touched.aboutEmployee?.QTY &&
                        //   errors.aboutEmployee?.QTY
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
                        //   values.aboutEmployee?.purchaseDate !== undefined
                        //     ? dayjs(values.aboutEmployee.purchaseDate)
                        //     : null
                        // }
                        onChange={(newValue) => {
                          setFieldValue(
                            "aboutEmployee.purchaseDate",
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
                        //   values.aboutEmployee?.registerDate !== undefined
                        //     ? dayjs(values.aboutEmployee.registerDate)
                        //     : null
                        // }
                        onChange={(newValue) => {
                          setFieldValue(
                            "aboutEmployee.registerDate",
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
                      touched.aboutEmployee?.stockStatus &&
                      Boolean(errors.aboutEmployee?.stockStatus)
                    }
                    disabled={openBackdrop || isSubmitting || disabledForm}
                  >
                    <InputLabel id="stockStatus-label">สถานะอุปกรณ์</InputLabel>
                    <Field name="aboutEmployee.stockStatus">
                      {({ field }: any) => (
                        <Select
                          type="hidden"
                          {...field}
                          label="สถานะอุปกรณ์ (จำเป็น)"
                          labelId="stockStatus-label"
                          value={values.aboutEmployee.stockStatus}
                          onChange={(event) => {
                            console.log(event.target);
                            const value = event.target.value as EmployeeStatus;
                            setFieldValue("aboutEmployee.stockStatus", value);
                          }}
                          slotProps={{
                            inputLabel: { shrink: true },
                            input: {
                              readOnly: viewOnly ? true : false,
                            },
                          }}
                        >
                          {Object.values(EmployeeStatus).map((status) => (
                            <MenuItem key={status} value={status}>
                              {status}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    </Field>
                    {touched.aboutEmployee?.stockStatus &&
                      errors.aboutEmployee?.stockStatus && (
                        <FormHelperText>
                          {errors.aboutEmployee?.stockStatus}
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

                {/* Employee Brand */}
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
                  <Field name="aboutEmployee.PO">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        name="PO"
                        label="PO (ถ้ามี)"
                        // value={values.aboutEmployee?.PO ? values.aboutEmployee?.PO : ""}
                        onChange={(e) => {
                          setFieldValue("aboutEmployee.PO", e.target.value);
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
                  <Field name="aboutEmployee.fixAssetsNumber">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        name="aboutEmployee.fixAssetsNumber"
                        label="fixAssetsNumber (ถ้ามี)"
                        // value={values.aboutEmployee?.fixAssetsNumber ? values.aboutEmployee?.fixAssetsNumber : ""}
                        onChange={(e) => {
                          setFieldValue("aboutEmployee.fixAssetsNumber", e.target.value);
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
                  <Field name="aboutEmployee.BTLNumber">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        name="aboutEmployee.BTLNumber"
                        label="BTLNumber (ถ้ามี)"
                        // value={values.aboutEmployee?.BTLNumber ? values.aboutEmployee?.BTLNumber : ""}
                        onChange={(e) => {
                          setFieldValue("aboutEmployee.BTLNumber", e.target.value);
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

                {/* Employee Description */}
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
                  <Field name="EmployeeTypeId">
                    {({ field }: FieldProps) => (
                      <Autocomplete
                        disabled={disabledForm}
                        id="EmployeeTypeId"
                        options={typeSelectState}
                        getOptionLabel={(option: TypeSelect) =>
                          option.EmployeeTypeName
                        }
                        loading
                        onChange={(e, value) => {
                          setFieldValue(
                            "EmployeeTypeId",
                            value !== null ? value.EmployeeTypeId : ""
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            label="ประเภทอุปกรณ์"
                            name="EmployeeTypeId"
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
                {/* {EmployeeEdit === false ? (
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
                  {/* {!EmployeeEdit ? "เพิ่มอุปกรณ์" : "แก้ไขอุปกรณ์"} */}
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

export default EmployeeForm;
