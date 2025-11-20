"use client";

import type React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Chip,
  Grid2,
  Pagination,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import BuildIcon from "@mui/icons-material/Build";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useState } from "react";

// Define the appointment type
interface Appointment {
  id: number;
  dateTime: string;
  customerName: string;
  serviceName: string;
  serviceProvider: string;
  status: "pending" | "completed";
}

const generateSampleAppointments = (): Appointment[] => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date: Date, hour: number, minute: number): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hourStr = String(hour).padStart(2, "0");
    const minuteStr = String(minute).padStart(2, "0");
    return `${day}-${month}-${year} - ${hourStr}:${minuteStr}`;
  };

  return [
    {
      id: 1,
      dateTime: formatDate(today, 9, 0),
      customerName: "สมชาย ใจดี",
      serviceName: "ตัดผมชาย ทรงวินเทจ", // เปลี่ยนบริการ
      serviceProvider: "ช่างแม็ก", // เปลี่ยนชื่อช่าง
      status: "pending",
    },
    {
      id: 2,
      dateTime: formatDate(today, 10, 30),
      customerName: "สมหญิง รักงาม",
      serviceName: "ทำสีผมแฟชั่น", // เปลี่ยนบริการ
      serviceProvider: "ช่างแอน", // เปลี่ยนชื่อช่าง
      status: "pending",
    },
    {
      id: 3,
      dateTime: formatDate(today, 13, 0),
      customerName: "วิชัย สุขสันต์",
      serviceName: "สระ ซอย จัดแต่งทรง", // เปลี่ยนบริการ
      serviceProvider: "ช่างบอย", // เปลี่ยนชื่อช่าง
      status: "pending",
    },
    {
      id: 4,
      dateTime: formatDate(today, 14, 30),
      customerName: "นิภา เจริญ",
      serviceName: "ดัดผมวอลลุ่ม", // เปลี่ยนบริการ
      serviceProvider: "ช่างแอน",
      status: "pending",
    },
    {
      id: 5,
      dateTime: formatDate(tomorrow, 9, 0),
      customerName: "ประเสริฐ มั่งมี",
      serviceName: "ตัดผมเด็ก", // เปลี่ยนบริการ
      serviceProvider: "ช่างแม็ก",
      status: "pending",
    },
    {
      id: 6,
      dateTime: formatDate(tomorrow, 10, 30),
      customerName: "สุภา ใจงาม",
      serviceName: "ทรีตเมนต์บำรุงผมเสีย", // เปลี่ยนบริการ
      serviceProvider: "ช่างแอน",
      status: "pending",
    },
    {
      id: 7,
      dateTime: formatDate(tomorrow, 13, 0),
      customerName: "จิรายุ สุขใจ",
      serviceName: "โกนหนวดและกันจอน", // เปลี่ยนบริการ
      serviceProvider: "ช่างบอย",
      status: "pending",
    },
    {
      id: 8,
      dateTime: formatDate(tomorrow, 14, 30),
      customerName: "มาลี ดีงาม",
      serviceName: "ต่อผม (นัดปรึกษา)", // เปลี่ยนบริการ
      serviceProvider: "ช่างแอน",
      status: "pending",
    },
  ];
};

const sampleAppointments: Appointment[] = generateSampleAppointments();

interface AppointmentCalendarProps {
  appointments?: Appointment[];
  onCompleteService?: (appointmentId: number) => void;
  itemsPerPage?: number; // Added items per page prop
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  appointments = sampleAppointments,
  onCompleteService,
  itemsPerPage = 8, // Default to 8 items per page (2 rows of 4 columns)
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleCompleteService = (appointmentId: number) => {
    if (onCompleteService) {
      onCompleteService(appointmentId);
    } else {
      console.log(`Complete service for appointment ID: ${appointmentId}`);
    }
  };

  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = appointments.slice(startIndex, endIndex);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 700 }}>
        ปฏิทินนัดหมาย
      </Typography>

      <Grid2 container spacing={3}>
        {currentAppointments.map((appointment) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={appointment.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
                border: "2px solid", // Added border
                borderColor: "divider", // Using theme divider color
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 10px 25px rgba(85, 172, 238, 0.15)",
                  borderColor: "primary.main", // Change border color on hover
                },
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Chip
                    label={
                      appointment.status === "completed"
                        ? "เสร็จสิ้น"
                        : "รอดำเนินการ"
                    }
                    color={
                      appointment.status === "completed" ? "success" : "secondary"
                    }
                    size="small"
                  />
                </Box>

                {/* Date and Time */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTimeIcon
                    sx={{ color: "primary.main", fontSize: 20 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "text.primary" }}
                  >
                    {appointment.dateTime}
                  </Typography>
                </Box>

                {/* Customer Name */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PersonIcon sx={{ color: "secondary.main", fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    {appointment.customerName}
                  </Typography>
                </Box>

                {/* Service Name */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <BuildIcon sx={{ color: "warning.main", fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    {appointment.serviceName}
                  </Typography>
                </Box>

                {/* Service Provider */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EngineeringIcon
                    sx={{ color: "success.main", fontSize: 20 }}
                  />
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    {appointment.serviceProvider}
                  </Typography>
                </Box>

                {/* Complete Service Button */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleCompleteService(appointment.id)}
                  disabled={appointment.status === "completed"}
                  sx={{
                    marginTop: "auto",
                    fontWeight: 700,
                  }}
                >
                  {appointment.status === "completed"
                    ? "เสร็จสิ้นแล้ว"
                    : "บริการเสร็จสิ้น"}
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
};

export default AppointmentCalendar;
