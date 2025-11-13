"use client";

import { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNotifyContext } from "@/contexts/NotifyContext";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("กรุณากรอกชื่อ"),
  username: Yup.string().required("กรุณากรอกชื่อผู้ใช้งาน"),
  address: Yup.string().required("กรุณากรอกที่อยู่"),
  phone: Yup.string()
    .required("กรุณากรอกเบอร์โทร")
    .matches(/^[0-9]{10}$/, "เบอร์โทรต้องมี 10 หลัก"),
  email: Yup.string().required("กรุณากรอกอีเมล").email("รูปแบบอีเมลไม่ถูกต้อง"),
  password: Yup.string().required("กรุณากรอกรหัสผ่าน"),
  confirmPassword: Yup.string()
    .required("กรุณากรอกยืนยันรหัสผ่าน")
    .oneOf([Yup.ref("password")], "รหัสผ่านไม่ตรงกัน"),
  termsAccepted: Yup.bool().oneOf([true], "กรุณายอมรับเงื่อนไขการใช้บริการ"),
});

const AuthRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredName, setRegisteredName] = useState(""); // เก็บชื่อผู้ใช้ที่สมัครสำเร็จ
  const { setNotify } = useNotifyContext();
  
  const router = useRouter();
  const localActive = useLocale();

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        setRegisteredName(data.user.name); // บันทึกชื่อผู้ใช้ที่สมัครสำเร็จ
        setNotify({
          open: true,
          message: `สมัครสมาชิกสำเร็จ! ยินดีต้อนรับคุณ ${data.user.name}`,
          color: "success",
        });

        // **Login อัตโนมัติหลังจากสมัครสมาชิก**
        const loginRes = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (loginRes?.error) {
          setNotify({ 
            open: true,
            message: loginRes.error, 
            color: "error" });
        } else {
          router.push("/protected/dashboard"); // ไปหน้า Dashboard
        }
      } else {
        // แสดงข้อความผิดพลาดจาก API
        const errorMessage =
          data.message || "เกิดข้อผิดพลาดระหว่างการสมัครสมาชิก";
        setNotify({
          open: true,
          message: errorMessage,
          color: "error",
        });
        console.error("Error during registration:", errorMessage); // ล็อกข้อผิดพลาด
      }
    } catch (error) {
      setNotify({
        open: true,
        message: "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์",
        color: "error",
      });
      console.error("Server error:", error); // ล็อกข้อผิดพลาด
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* แสดงข้อความยินดีต้อนรับเมื่อสมัครสำเร็จ */}
      {registeredName && (
        <Typography variant="h5" color="primary" gutterBottom>
          ยินดีต้อนรับ, {registeredName}!
        </Typography>
      )}

      <Formik
        initialValues={{
          name: "",
          username: "",
          address: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
          termsAccepted: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              {/* <Grid item xs={6}>
                <Field name="name">
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      label="ชื่อ"
                      placeholder="กรุณากรอกชื่อ"
                      fullWidth
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  )}
                </Field>
              </Grid> */}
              <Grid item xs={12}>
                <Field name="username">
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      label="ชื่อผู้ใช้งาน"
                      placeholder="กรุณากรอกชื่อผู้ใช้งาน"
                      fullWidth
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                    />
                  )}
                </Field>
              </Grid>
              {/* <Grid item xs={12}>
                <Field name="address">
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      label="ที่อยู่"
                      placeholder="บ้านเลขที่, ตำบล, อำเภอ, จังหวัด, รหัสไปรษณีย์ "
                      fullWidth
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  )}
                </Field>
              </Grid> */}
              {/* <Grid item xs={6}>
                <Field name="phone">
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      label="เบอร์โทร"
                      placeholder="กรุณากรอกเบอร์โทร เช่น 0901234567"
                      fullWidth
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                  )}
                </Field>
              </Grid> */}
              <Grid item xs={12}>
                <Field name="email">
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      label="อีเมล"
                      placeholder="กรุณากรอกอีเมล"
                      type="email"
                      fullWidth
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={6}>
                <Field name="password">
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      label="รหัสผ่าน"
                      type={showPassword ? "text" : "password"}
                      placeholder="กรุณากรอกรหัสผ่าน"
                      fullWidth
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleTogglePassword}>
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={6}>
                <Field name="confirmPassword">
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      label="ยืนยันรหัสผ่าน"
                      type={showPassword ? "text" : "password"}
                      placeholder="กรุณากรอกยืนยันรหัสผ่าน"
                      fullWidth
                      error={
                        touched.confirmPassword &&
                        Boolean(errors.confirmPassword)
                      }
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleTogglePassword}>
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="termsAccepted"
                      checked={values.termsAccepted}
                      onChange={(e) =>
                        setFieldValue("termsAccepted", e.target.checked)
                      }
                    />
                  }
                  label="ฉันยอมรับเงื่อนไขการใช้บริการ"
                />
                {errors.termsAccepted && (
                  <Typography color="error">{errors.termsAccepted}</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                {isSubmitting ? (
                  <CircularProgress />
                ) : (
                  <Button type="submit" variant="contained" fullWidth>
                    สมัครสมาชิก
                  </Button>
                )}
              </Grid>
              <Grid item xs={12}>

              <Button type="submit" variant="outlined" fullWidth onClick={() => router.push(`/${localActive}/auth/sign-in`)}>
                    คุณมีบัญชีอยู่เเล้ว?
              </Button>
              </Grid>

            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthRegisterForm;
