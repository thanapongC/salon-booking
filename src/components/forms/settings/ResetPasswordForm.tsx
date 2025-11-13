"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
// import { useSnackbarContext } from "@/contexts/SnackbarContext";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร")
    .required("กรุณากรอกรหัสผ่านใหม่"),
});

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // ดึง token จาก URL
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { setSnackbar } = useSnackbarContext();

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setIsSubmitting(true);
    // try {
    //   const response = await fetch("/api/reset-password", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ token, newPassword: values.newPassword }),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     setSnackbar({
    //       message: "เปลี่ยนรหัสผ่านสำเร็จ!",
    //       notiColor: "success",
    //     });
    //   } else {
    //     setSnackbar({
    //       message: data.message || "เกิดข้อผิดพลาด",
    //       notiColor: "error",
    //     });
    //   }
    // } catch (error) {
    //   setSnackbar({
    //     message: "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์",
    //     notiColor: "error",
    //   });
    // } finally {
    //   setIsSubmitting(false);
    //   setSubmitting(false);
    // }
  };

  return (
    <Formik
      initialValues={{ newPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field name="newPassword">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    label="รหัสผ่านใหม่"
                    type="password"
                    fullWidth
                    error={touched.newPassword && Boolean(errors.newPassword)}
                    helperText={touched.newPassword && errors.newPassword}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              {isSubmitting ? (
                <CircularProgress />
              ) : (
                <Button type="submit" variant="contained" fullWidth>
                  เปลี่ยนรหัสผ่าน
                </Button>
              )}
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
