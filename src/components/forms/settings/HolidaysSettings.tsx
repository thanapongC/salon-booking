"use client";

import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Chip,
  useTheme,
  Grid2,
} from "@mui/material";
import { useFormikContext } from "formik";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import * as Yup from "yup";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { useStoreContext } from "@/contexts/StoreContext";
import { HolidayType } from "@prisma/client";
import { Holiday } from "@/interfaces/Store";
import LoadingButton from "@mui/lab/LoadingButton";

const validationSchema = Yup.object({});

export default function HolidaysSettings() {

  const theme = useTheme();
  // const { submitForm, isSubmitting, isValid } = useFormikContext();
  const { holidays, setHolidays, setHolidaysList, holidaysList } =
    useStoreContext();

  const [openDialog, setOpenDialog] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null);

  const handleFormSubmit = async (
    values: Holiday,
    {
      setSubmitting,
      setErrors,
      resetForm,
      validateForm,
    }: FormikHelpers<Holiday> // ใช้ FormikHelpers เพื่อให้ Type ถูกต้อง
  ) => {
    console.log("values");

    // validateForm(); // บังคับ validate หลังจากรีเซ็ต
    // setSubmitting(true); // เริ่มสถานะ Loading/Submittings

    // const result = await storeService.updateTimeSettingStore(values);

    // // // // // // 3. จัดการเมื่อสำเร็จ
    // setNotify({
    //   open: true,
    //   message: result.message,
    //   color: result.success ? "success" : "error",
    // });
  };

  const handleOpenDialog = (holiday?: Holiday) => {
    // if (holiday) {
    //   setEditingHoliday(holiday)
    //   setFormData(holiday)
    // } else {
    //   setEditingHoliday(null)
    //   setFormData({
    //     date: new Date(),
    //     name: "",
    //     type: "annual",
    //     fullDay: true,
    //     startTime: "09:00",
    //     endTime: "18:00",
    //   })
    // }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingHoliday(null);
  };

  const handleSave = () => {
    // if (!formData.name || !formData.date) {
    //   setSnackbar({ open: true, message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    //   return;
    // }
    // if (editingHoliday) {
    //   setHolidays(
    //     holidays.map((h) =>
    //       h.id === editingHoliday.id
    //         ? ({ ...formData, id: h.id } as Holiday)
    //         : h
    //     )
    //   );
    //   setSnackbar({ open: true, message: "แก้ไขวันหยุดสำเร็จ" });
    // } else {
    //   const newHoliday: Holiday = {
    //     ...formData,
    //     id: Date.now().toString(),
    //   } as Holiday;
    //   setHolidays([...holidays, newHoliday]);
    //   setSnackbar({ open: true, message: "เพิ่มวันหยุดสำเร็จ" });
    // }
    // handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    // setHolidays(holidays.filter((h) => h.id !== id));
    // setSnackbar({ open: true, message: "ลบวันหยุดสำเร็จ" });
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Box
              component="h2"
              sx={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: theme.palette.primary.main,
                mb: 0.5,
              }}
            >
              วันหยุดประจำปี / วันหยุดพิเศษ
            </Box>
            <Box
              component="p"
              sx={{
                fontSize: "0.875rem",
                color: theme.palette.text.secondary,
              }}
            >
              กำหนดวันหยุดของร้านเพื่อป้องกันการจองในวันดังกล่าว
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              bgcolor: theme.palette.primary.main,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
              marginLeft: 5,
            }}
          >
            เพิ่มวันหยุด
          </Button>
        </Box>

        {holidaysList.length === 0 ? (
          <Card
            sx={{
              textAlign: "center",
              py: 6,
              bgcolor: theme.palette.grey[100],
              border: `2px dashed ${theme.palette.divider}`,
            }}
          >
            <CalendarIcon
              sx={{
                fontSize: 64,
                color: theme.palette.text.secondary,
                mb: 2,
              }}
            />
            <Box sx={{ color: theme.palette.text.secondary }}>
              ยังไม่มีวันหยุด คลิก &quot;เพิ่มวันหยุด&quot; เพื่อเริ่มต้น
            </Box>
          </Card>
        ) : (
          <Grid2 container spacing={2}>
            {holidaysList.map((holiday) => (
              <Grid2 size={{ xs: 12, md: 6 }} key={holiday.id}>
                <Card
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    "&:hover": {
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            fontWeight: 600,
                            fontSize: "1rem",
                            color: theme.palette.primary.main,
                            mb: 1,
                          }}
                        >
                          {holiday.holidayName}
                        </Box>
                        <Box
                          sx={{
                            fontSize: "0.875rem",
                            color: theme.palette.text.secondary,
                            mb: 1,
                          }}
                        >
                          {/* {holiday.date.toLocaleDateString("th-TH", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })} */}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            flexWrap: "wrap",
                          }}
                        >
                          <Chip
                            label={
                              holiday.holidayType === HolidayType.ANNUAL
                                ? "วันหยุดประจำปี"
                                : "วันหยุดพิเศษ"
                            }
                            size="small"
                            sx={{
                              bgcolor:
                                holiday.holidayType === HolidayType.ANNUAL
                                  ? theme.palette.secondary.light
                                  : theme.palette.warning.light,
                              color: theme.palette.text.primary,
                            }}
                          />
                          <Chip
                            label={
                              holiday.fullDay
                                ? "ปิดทั้งวัน"
                                : `${holiday.startTime} - ${holiday.endTime}`
                            }
                            size="small"
                            sx={{
                              bgcolor: theme.palette.grey[200],
                              color: theme.palette.text.primary,
                            }}
                          />
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <IconButton
                          size="small"
                          // onClick={() => handleOpenDialog(holiday)}
                          sx={{ color: theme.palette.secondary.main }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(holiday.id)}
                          sx={{ color: theme.palette.error.main }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        )}

        <Formik<Holiday>
          initialValues={holidays} // ใช้ state เป็น initialValues
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
            submitForm
          }) => (
            <Form>
              <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
              >
                <DialogTitle sx={{ bgcolor: theme.palette.grey[100] }}>
                  {editingHoliday ? "แก้ไขวันหยุด" : "เพิ่มวันหยุด"}
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                    mt={3}
                  >
                    <DatePicker
                      label="เลือกวันที่"
                      // value={formData.date}
                      // onChange={(newValue) => setFormData({ ...formData, date: newValue ? newValue : new Date() })}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                        },
                      }}
                    />

                    <TextField
                      label="ชื่อวันหยุด"
                      // value={formData.name}
                      // onChange={(e) =>
                      //   setFormData({ ...formData, name: e.target.value })
                      // }
                      placeholder="เช่น วันปีใหม่, ปิดซ่อมร้าน"
                      fullWidth
                    />

                    <FormControl fullWidth>
                      <InputLabel>ประเภทวันหยุด</InputLabel>
                      <Select
                        // value={formData.type}
                        label="ประเภทวันหยุด"
                        // onChange={(e) =>
                        //   setFormData({
                        //     ...formData,
                        //     type: e.target.value as "annual" | "special",
                        //   })
                        // }
                      >
                        <MenuItem value="annual">วันหยุดประจำปี</MenuItem>
                        <MenuItem value="special">วันหยุดพิเศษ</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControlLabel
                      control={
                        <Switch
                        checked={holidays.fullDay}
                        // onChange={(e) =>
                        //   setFormData({
                        //     ...formData,
                        //     fullDay: e.target.checked,
                        //   })
                        // }
                        />
                      }
                      label="ปิดทั้งวัน"
                    />

                    {!holidays.fullDay && (
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <TimePicker
                          label="เวลาเริ่มต้น"
                          // value={formData.startTime ? new Date(`2000-01-01T${formData.startTime}`) : null}
                          // onChange={(newValue) => {
                          //   if (newValue) {
                          //     setFormData({
                          //       ...formData,
                          //       startTime: newValue.toTimeString().slice(0, 5),
                          //     })
                          //   }
                          // }}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                            },
                          }}
                        />
                        <TimePicker
                          label="เวลาสิ้นสุด"
                          // value={formData.endTime ? new Date(`2000-01-01T${formData.endTime}`) : null}
                          // onChange={(newValue) => {
                          //   if (newValue) {
                          //     setFormData({
                          //       ...formData,
                          //       endTime: newValue.toTimeString().slice(0, 5),
                          //     })
                          //   }
                          // }}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                            },
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                  <Button onClick={handleCloseDialog}>ยกเลิก</Button>
                  <LoadingButton
                    variant="contained"
                    onClick={submitForm}
                    color="primary"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      "&:hover": {
                        bgcolor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    บันทึก
                  </LoadingButton>
                </DialogActions>
              </Dialog>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}
