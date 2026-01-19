"use client";

import { Box, Typography, Paper, Divider, useTheme } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import SpaIcon from "@mui/icons-material/Spa";
import PhoneIcon from "@mui/icons-material/Phone";
import { BookingFormData, Staff, BOOKING_CHANNELS, Service } from "@/utils/lib/booking";

interface BookingSummaryProps {
  formData: BookingFormData;
  services: Service[];
  staffList: Staff[];
}

export function BookingSummary({ formData, services, staffList }: BookingSummaryProps) {
  const theme = useTheme();

  const selectedService = services.find((s) => s.id === formData.serviceId);
  const selectedStaff = staffList.find((s) => s.id === formData.staffId);
  const selectedChannel = BOOKING_CHANNELS.find((c) => c.value === formData.channel);

  const formatDate = (date: Date | null) => {
    if (!date) return "-";
    return date.toLocaleDateString("th-TH", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const summaryItems = [
    {
      icon: <SpaIcon />,
      label: "บริการ",
      value: selectedService?.name || "-",
      subValue: selectedService ? `${selectedService.duration} นาที` : undefined,
    },
    {
      icon: <EventIcon />,
      label: "วันที่",
      value: formatDate(formData.date),
    },
    {
      icon: <AccessTimeIcon />,
      label: "เวลา",
      value: formData.time || "-",
    },
    {
      icon: <PersonIcon />,
      label: "พนักงาน",
      value: formData.staffId === "any" ? "ใครก็ได้" : selectedStaff ? `คุณ${selectedStaff.nickname || selectedStaff.firstName}` : "-",
    },
    {
      icon: <PersonIcon />,
      label: "ลูกค้า",
      value: formData.customerName || "-",
    },
    {
      icon: <PhoneIcon />,
      label: "เบอร์โทร",
      value: formData.customerPhone || "-",
    },
  ];

  return (
    <Paper
      sx={{
        p: 3,
        bgcolor: theme.palette.primary.main + "05",
        border: `1px solid ${theme.palette.primary.main}20`,
      }}
    >
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        สรุปการจอง
      </Typography>

      <Box
        sx={{
          display: "inline-flex",
          px: 2,
          py: 0.5,
          bgcolor: theme.palette.primary.main + "15",
          borderRadius: 2,
          mb: 2,
        }}
      >
        <Typography variant="body2" color="primary" fontWeight={500}>
          ช่องทาง: {selectedChannel?.label}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {summaryItems.map((item, index) => (
          <Box key={index}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
              <Box sx={{ color: theme.palette.primary.main, mt: 0.25 }}>{item.icon}</Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {item.value}
                </Typography>
                {item.subValue && (
                  <Typography variant="caption" color="text.secondary">
                    {item.subValue}
                  </Typography>
                )}
              </Box>
            </Box>
            {index < summaryItems.length - 1 && <Divider sx={{ mt: 2 }} />}
          </Box>
        ))}
      </Box>

      {selectedService && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="subtitle1" fontWeight={600}>
              ราคารวม
            </Typography>
            <Typography variant="h5" color="primary" fontWeight={700}>
              {selectedService.price.toLocaleString()} บาท
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  );
}
