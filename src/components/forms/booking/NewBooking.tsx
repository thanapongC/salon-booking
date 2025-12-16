import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid2,
  TextField,
  Avatar,
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as Yup from "yup";
import { Field, FieldProps, Form, Formik } from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import { uniqueId } from "lodash";

import { LoadingButton } from "@mui/lab";
import ConfirmDelete from "@/components/shared/ConfirmDelete";
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
import StatusBooking from "@/components/shared/Status";
import dayjs from "dayjs";
import { Bath, MonitorCog, Phone, Plus, Save, Timer } from "lucide-react";
import { bookingService } from "@/utils/services/api-services/BookingAPI";
import { useBookingContext } from "@/contexts/BookingContext";
import { Booking, initialBooking } from "@/interfaces/Booking";
import { useStoreContext } from "@/contexts/StoreContext";
import { EmployeeSelect, ServiceSelect } from "@/interfaces/Store";
import { TimePicker } from "@mui/x-date-pickers";
import { CustomerType } from "@prisma/client";
import { useEmployeeContext } from "@/contexts/EmployeeContext";

interface BookingProps {
  viewOnly?: boolean;
}

const BookingForm: FC<BookingProps> = ({ viewOnly = false }) => {
  const { setBookingForm, bookingEdit, setBookingEdit, setBookings, bookings } =
    useBookingContext();
  const { servicesSelect } = useStoreContext();
  const { employeeSelect } = useEmployeeContext();
  const { setNotify, notify, setOpenBackdrop, openBackdrop } =
    useNotifyContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disabledForm, setDisabledForm] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const localActive = useLocale();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("กรุณากรอกรหัสอุปกรณ์"),
    durationMinutes: Yup.number().required("กรุณาใส่เวลาของคอร์ส"),
    price: Yup.number().required("กรุณาใส่ราคาของคอร์ส"),
  });

  const handleFormSubmit = (
    value: Booking,
    { resetForm, validateForm }: any
  ) => {
    validateForm(); // บังคับ validate หลังจากรีเซ็ต
    setIsLoading(true);
    console.log(value);
    if (bookingEdit) {
      handleUpdateBooking(value);
    } else {
      handleCreateBooking(value);
    }
    resetForm(); // รีเซ็ตค่าฟอร์ม
  };

  const handleUpdateBooking = async (Booking: Booking) => {
    setOpenBackdrop(true);
    const result = await bookingService.updateBooking(Booking);
    setOpenBackdrop(false);
    setNotify({
      open: true,
      message: result.message,
      color: result.success ? "success" : "error",
    });
    if (result.success) {
      router.push(`/${localActive}/protected/admin/inventory`);
    }
  };

  const handleCreateBooking = async (Booking: Booking) => {
    setOpenBackdrop(true);
    const result = await bookingService.createBooking(Booking);
    setOpenBackdrop(false);
    setNotify({
      open: true,
      message: result.message,
      color: result.success ? "success" : "error",
    });
    if (result.success) {
      router.push(`/${localActive}/protected/admin/inventory`);
    }
  };

  const handleGetSelectCategory = async () => {
    // const result = await categoryBooking.getSelectCategory();
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

  const getDataBooking = () => {
    const BookingId = params.get("BookingId");
    axios
      .get(`/api/Booking?BookingId=${BookingId}`)
      .then(({ data }) => {
        // const modifiedData: Booking = {
        //   ...data,
        //   aboutBooking: {
        //     ...data.aboutBooking,
        //     purchaseDate: dayjs(data.aboutBooking.purchaseDate),
        //   },
        // };
        // setBookings(modifiedData);
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
  //     .get(`/api/Booking/type?getbycharacter=true`)
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
  //     Booking.aboutBooking?.stockStatus ===
  //       BookingStatus.CurrentlyRenting ||
  //     Booking.aboutBooking?.stockStatus === BookingStatus.InActive ||
  //     Booking.aboutBooking?.stockStatus === BookingStatus.Damaged
  //   ) {
  //     setDisabledForm(true);
  //   }
  // }, [Booking]);

  useEffect(() => {
    setIsLoading(true);

    if (pathname.includes("new")) {
      setBookingForm(initialBooking);
      setBookingEdit(false);
      setDisabledForm(false);
    } else {
      setBookingEdit(true);
      getDataBooking();
    }

    // getTypeData();
    handleGetSelectCategory();

    return () => {
      setBookingForm(initialBooking);
      setBookingEdit(false);
      setDisabledForm(false);
    };
  }, []);

  return (
    <>
      <Formik<Booking>
        initialValues={initialBooking} // ใช้ state เป็น initialValues
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
                        <Plus size={20} />
                      </Avatar>
                      <Typography variant="h4" gutterBottom ml={2} mt={0.5}>
                        เพิ่มการจอง
                      </Typography>
                    </Grid2>
                  </Grid2>
                </Grid2>

                <Grid2 container size={{ xs: 12 }} mb={4} spacing={2}>
                  <Grid2 size={{ xs: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel id="other-contact-label">
                        ช่องทางการจอง (จำเป็น)
                      </InputLabel>
                      <Select
                        labelId="other-contact-label"
                        label="ช่องทางการจอง (จำเป็น)"
                        value={values.customerType && values.customerType}
                        onChange={(e) => {
                          setFieldValue("customerType", e.target.value);
                        }}
                      >
                        <MenuItem value={CustomerType.WALK_IN}>
                          Walk In
                        </MenuItem>
                        <MenuItem value={CustomerType.OTHER_CONTACT}>
                          ช่องทางอื่นๆ
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid2>

                  {/* Booking Name */}
                  <Grid2 size={{ xs: 6 }}>
                    <Field name="serviceId">
                      {({ field }: FieldProps) => (
                        <Autocomplete
                          id="serviceId"
                          options={servicesSelect}
                          getOptionLabel={(option: ServiceSelect) =>
                            option.name
                          }
                          loading
                          onInputChange={(event, value) => {
                            // Handle typed value when no matching option
                            if (
                              value &&
                              !servicesSelect.some((opt) => opt.id === value)
                            ) {
                              setFieldValue("serviceId", value);
                            }
                          }}
                          onChange={(event, value) => {
                            setFieldValue(
                              "serviceId",
                              value !== null ? value.id : ""
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="เลือกบริการ (จำเป็น)"
                              name="serviceId"
                              error={
                                touched.serviceId && Boolean(errors.serviceId)
                              }
                              helperText={touched.serviceId && errors.serviceId}
                            />
                          )}
                        />
                      )}
                    </Field>
                  </Grid2>

                  <Grid2 size={{ xs: 12 }} mb={2} mt={2}>
                    <Grid2 container alignItems="center">
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        <Timer size={20} />
                      </Avatar>
                      <Typography variant="h4" gutterBottom ml={2} mt={0.5}>
                        กำหนดเวลานัด - เลือกพนักงาน
                      </Typography>
                    </Grid2>
                  </Grid2>

                  <Grid2 size={{ xs: 6 }}>
                    <Field name="bookingDate">
                      {({ field, form }: FieldProps) => (
                        <DatePicker
                          // disabled={openBackdrop || isSubmitting || disabledForm}
                          label="วันที่"
                          sx={{ minWidth: "100%" }}
                          // ✔ เวลา (dayjs) หรือ null
                          value={
                            values.bookingDate
                              ? dayjs(values.bookingDate)
                              : null
                          }
                          // ✔ อัปเดตค่าเวลาใน Formik อย่างถูกต้อง
                          onChange={(newValue) => {
                            form.setFieldValue(
                              "bookingDate",
                              newValue ? newValue.toISOString() : null
                            );
                          }}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: Boolean(
                                touched.bookingDate && errors.bookingDate
                              ),
                              helperText:
                                touched.bookingDate && errors.bookingDate
                                  ? String(errors.bookingDate)
                                  : "",
                            },
                          }}
                        />
                      )}
                    </Field>
                  </Grid2>

                  <Grid2 size={{ xs: 6 }}>
                    <Field name="bookingTime">
                      {({ field, form }: FieldProps) => (
                        <TimePicker
                          // disabled={openBackdrop || isSubmitting || disabledForm}
                          label="เวลา"
                          sx={{ minWidth: "100%" }}
                          // ✔ เวลา (dayjs) หรือ null
                          value={
                            values.bookingTime
                              ? dayjs(values.bookingTime)
                              : null
                          }
                          // ✔ อัปเดตค่าเวลาใน Formik อย่างถูกต้อง
                          onChange={(newValue) => {
                            form.setFieldValue(
                              "bookingTime",
                              newValue ? newValue.toISOString() : null
                            );
                          }}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: Boolean(
                                touched.bookingTime && errors.bookingTime
                              ),
                              helperText:
                                touched.bookingTime && errors.bookingTime
                                  ? String(errors.bookingTime)
                                  : "",
                            },
                          }}
                        />
                      )}
                    </Field>
                  </Grid2>

                  <Grid2 size={{ xs: 6 }}>
                    <Field name="employeeId">
                      {({ field }: FieldProps) => (
                        <Autocomplete
                          id="employeeId"
                          options={employeeSelect}
                          getOptionLabel={(option: EmployeeSelect) =>
                            option.name
                          }
                          loading
                          onInputChange={(event, value) => {
                            // Handle typed value when no matching option
                            if (
                              value &&
                              !employeeSelect.some((opt) => opt.id === value)
                            ) {
                              setFieldValue("employeeId", value);
                            }
                          }}
                          onChange={(event, value) => {
                            setFieldValue(
                              "employeeId",
                              value !== null ? value.id : ""
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="เลือกพนักงาน (จำเป็น)"
                              name="employeeId"
                              error={
                                touched.employeeId && Boolean(errors.employeeId)
                              }
                              helperText={
                                touched.employeeId && errors.employeeId
                              }
                            />
                          )}
                        />
                      )}
                    </Field>
                  </Grid2>

                  <Grid2 size={{ xs: 12 }} mb={2} mt={2}>
                    <Grid2 container alignItems="center">
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        <Phone size={20} />
                      </Avatar>
                      <Typography variant="h4" gutterBottom ml={2} mt={0.5}>
                        ช่องทางการติดต่อ
                      </Typography>
                    </Grid2>
                  </Grid2>

                  <Grid2 size={{ xs: 6 }}>
                    <Field name="customerName">
                      {({ field }: FieldProps) => (
                        <TextField
                          {...field}
                          name="customerName"
                          label="ชื่อลูกค้า (จำเป็น)"
                          // sx={{ textTransform: "uppercase" }}
                          value={values.customerName ? values.customerName : ""}
                          onChange={(e) => {
                            setFieldValue("customerName", e.target.value);
                          }}
                          slotProps={{
                            inputLabel: { shrink: true },
                            input: {
                              readOnly: viewOnly ? true : false,
                            },
                          }}
                          placeholder=""
                          error={
                            touched.customerName && Boolean(errors.customerName)
                          }
                          helperText={
                            touched.customerName && errors.customerName
                          }
                          fullWidth
                          disabled={
                            openBackdrop || isSubmitting || disabledForm
                          }
                        />
                      )}
                    </Field>
                  </Grid2>

                  <Grid2 size={{ xs: 6 }}>
                    <Field name="customerPhone">
                      {({ field }: FieldProps) => (
                        <TextField
                          {...field}
                          name="customerPhone"
                          label="เบอร์โทร (จำเป็น)"
                          // sx={{ textTransform: "uppercase" }}
                          value={
                            values.customerPhone ? values.customerPhone : ""
                          }
                          onChange={(e) => {
                            setFieldValue("customerPhone", e.target.value);
                          }}
                          slotProps={{
                            inputLabel: { shrink: true },
                            input: {
                              readOnly: viewOnly ? true : false,
                            },
                          }}
                          placeholder=""
                          error={
                            touched.customerPhone &&
                            Boolean(errors.customerPhone)
                          }
                          helperText={
                            touched.customerPhone && errors.customerPhone
                          }
                          fullWidth
                          disabled={
                            openBackdrop || isSubmitting || disabledForm
                          }
                        />
                      )}
                    </Field>
                  </Grid2>

                  <Grid2 size={{ xs: 6 }}>
                    <Field name="customerEmail">
                      {({ field }: FieldProps) => (
                        <TextField
                          {...field}
                          name="customerEmail"
                          label="Email (ถ้ามี)"
                          // sx={{ textTransform: "uppercase" }}
                          value={
                            values.customerEmail ? values.customerEmail : ""
                          }
                          onChange={(e) => {
                            setFieldValue("customerEmail", e.target.value);
                          }}
                          slotProps={{
                            inputLabel: { shrink: true },
                            input: {
                              readOnly: viewOnly ? true : false,
                            },
                          }}
                          placeholder=""
                          error={
                            touched.customerEmail &&
                            Boolean(errors.customerEmail)
                          }
                          helperText={
                            touched.customerEmail && errors.customerEmail
                          }
                          fullWidth
                          disabled={
                            openBackdrop || isSubmitting || disabledForm
                          }
                        />
                      )}
                    </Field>
                  </Grid2>


                </Grid2>
              </Grid2>

              <Grid2
                sx={{ mt: 5, display: "flex", justifyContent: "flex-start" }}
              >
                <LoadingButton
                  variant="contained"
                  type="submit"
                  color="primary"
                  sx={{ mr: 1 }}
                  disabled={openBackdrop || isSubmitting || disabledForm}
                  loading={openBackdrop || isSubmitting}
                  startIcon={<Save />}
                >
                  เพิ่มบริการ
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

export default BookingForm;
