"use client";

import { FC, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Grid2,
} from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNotifyContext } from "@/contexts/NotifyContext";
import { authService } from "@/utils/services/api-services/AuthAPI";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("กรุณากรอกอีเมล").email("รูปแบบอีเมลไม่ถูกต้อง"),
});

export default function ForgetPasswordForm() {
  const { setNotify, notify, setOpenBackdrop, openBackdrop } =
    useNotifyContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { setSnackbar } = useSnackbarContext();

  const handleFormSubmit = async (
    values: { email: string },
    {
      setSubmitting,
      setErrors,
      resetForm,
      validateForm,
    }: FormikHelpers<{ email: string }> // ใช้ FormikHelpers เพื่อให้ Type ถูกต้อง
  ) => {
    validateForm(); // บังคับ validate หลังจากรีเซ็ต
    setSubmitting(true); // เริ่มสถานะ Loading/Submittings

    // let result;

    // if (editingHoliday)
    const result = await authService.sendForgotPassword(values.email);

    setNotify({
      open: true,
      message: result.message,
      color: result.success ? "success" : "error",
    });
  };

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12 }}>
              <Field name="email">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    label="อีเมล"
                    type="email"
                    fullWidth
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                )}
              </Field>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              {isSubmitting ? (
                <CircularProgress />
              ) : (
                <Button type="submit" variant="contained" fullWidth>
                  ส่งลิงก์รีเซ็ตรหัสผ่าน
                </Button>
              )}
            </Grid2>
          </Grid2>
        </Form>
      )}
    </Formik>
  );
}
