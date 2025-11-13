import { Box, Card, Typography } from "@mui/material";
import ForgetPasswordForm from "@/components/forms/auth/ForgetPasswordForm";
import Image from "next/image";

const ForgetPassword = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: 4,
      }}
    >
      <Card
        sx={{
          width: "80%",
          maxWidth: "1200px",
          display: "flex",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: 4,
          minHeight: "500px",
        }}
      >
        {/* Left Section */}
        {/* <Box
          sx={{
            backgroundColor: "#3f51b5",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            flexDirection: "column",
            padding: 6,
          }}
        >
          <Image
            src="/images/logos/logo-white-png.png"
            alt="logo"
            height={70}
            width={80}
            priority
          />

          <Typography variant="h3" fontWeight="bold" mb={3}>
            EzyAccount
          </Typography>
          <Typography variant="h6" textAlign="center">
          โปรแกรมบัญชีใช้งานง่าย ที่เป็นเสมือนเพื่อคู่คิดธุรกิจคุณ
          </Typography>
        </Box> */}

        {/* Right Section */}
        <Box
          sx={{
            flex: 1,
            padding: 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
            ลืมรหัสผ่าน
          </Typography>
          <ForgetPasswordForm />
        </Box>
      </Card>
    </Box>
  );
};

export default ForgetPassword;
