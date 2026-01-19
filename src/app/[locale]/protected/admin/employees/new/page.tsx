"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Snackbar,
  Alert,
  Breadcrumbs,
  Link,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@mui/material/styles";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import StaffForm from "@/components/forms/employees/NewStaffForm";
import { StaffFormData } from "@/components/lib/staff";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { Sidebar } from "lucide-react";

export default function NewStaffPage() {
  const theme = useTheme();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = (data: StaffFormData) => {
    console.log("Staff data:", data);
    setSnackbar({
      open: true,
      message: "เพิ่มพนักงานเรียบร้อยแล้ว",
      severity: "success",
    });
    // In real app, redirect to staff list after success
  };

  const handleCancel = () => {
    // In real app, navigate back to staff list
    window.history.back();
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          // ml: { xs: 0, md: "280px" },
        }}
      >

        {/* Staff Form */}
        <StaffForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </Box>

    </Box>
  );
}



// "use client";

// import {
//   Grid,
//   Box,
//   TextField,
//   Button,
//   Typography,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
// } from "@mui/material";
// import PageContainer from "@/components/container/PageContainer";
// import { useLocale, useTranslations } from "next-intl";
// import Breadcrumb from "@/components/shared/BreadcrumbCustom";
// import BaseCard from "@/components/shared/BaseCard";
// import { useEffect, useState } from "react";
// import { useBreadcrumbContext } from "@/contexts/BreadcrumbContext";
// import NewEmployee from "@/components/forms/employees/NewEmployee_old";

// const NewEmployeePage = () => {
//   const t = useTranslations("HomePage");
//   const localActive = useLocale();

//   const { setBreadcrumbs } = useBreadcrumbContext();

//   useEffect(() => {
//     setBreadcrumbs([
//       { name: "หน้าแรก", href: `/${localActive}/protected/admin/dashboard` },
//       { name: "จัดการพนักงาน", href: `/${localActive}/protected/admin/employees` },
//       { name: "เพิ่มพนักงาน", href: `/${localActive}/protected/admin/employees/new` },
//     ]);
//     return () => {
//       setBreadcrumbs([]);
//     };
//   }, []);

//   return (
//     <PageContainer title="" description="">
//       <Typography variant="h1" mt={2} >
//         การจัดการพนักงาน
//       </Typography>
//       <BaseCard title="">
//         <NewEmployee/>
//       </BaseCard>
//     </PageContainer>
//   );
// };

// export default NewEmployeePage;


