"use client";

import { Box, Typography, Paper, Avatar, Chip, useTheme } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Staff } from "@/components/lib/admin-booking";

interface StaffSelectorProps {
  staffList: Staff[];
  value: string;
  onChange: (staffId: string) => void;
  selectedServiceId: string;
  error?: string;
}

export function StaffSelector({
  staffList,
  value,
  onChange,
  selectedServiceId,
  error,
}: StaffSelectorProps) {
  const theme = useTheme();

  // Filter staff who can provide the selected service
  const availableStaff = selectedServiceId
    ? staffList.filter((staff) => staff.serviceIds.includes(selectedServiceId))
    : staffList;

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
        เลือกพนักงาน *
      </Typography>

      {!selectedServiceId ? (
        <Paper
          sx={{
            p: 3,
            textAlign: "center",
            bgcolor: theme.palette.grey[50],
          }}
        >
          <Typography variant="body2" color="text.secondary">
            กรุณาเลือกบริการก่อน
          </Typography>
        </Paper>
      ) : availableStaff.length === 0 ? (
        <Paper
          sx={{
            p: 3,
            textAlign: "center",
            bgcolor: theme.palette.warning.main + "10",
          }}
        >
          <Typography variant="body2" color="warning.main">
            ไม่มีพนักงานที่ให้บริการนี้
          </Typography>
        </Paper>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)" },
            gap: 2,
          }}
        >
          {/* Any staff option */}
          <Paper
            onClick={() => onChange("any")}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              border: 2,
              borderColor: value === "any" ? theme.palette.primary.main : "transparent",
              bgcolor: value === "any" ? theme.palette.primary.main + "10" : theme.palette.background.paper,
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: theme.palette.primary.main,
                transform: "translateY(-2px)",
                boxShadow: theme.shadows[4],
              },
            }}
          >
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: value === "any" ? theme.palette.primary.main : theme.palette.grey[300],
              }}
            >
              <PersonIcon />
            </Avatar>
            <Typography
              variant="body2"
              fontWeight={value === "any" ? 600 : 400}
              color={value === "any" ? "primary" : "text.primary"}
            >
              ใครก็ได้
            </Typography>
            <Chip
              size="small"
              label="แนะนำ"
              color="primary"
              variant={value === "any" ? "filled" : "outlined"}
              sx={{ height: 20, fontSize: 11 }}
            />
          </Paper>

          {/* Individual staff options */}
          {availableStaff.map((staff) => (
            <Paper
              key={staff.id}
              onClick={() => onChange(staff.id)}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                border: 2,
                borderColor: value === staff.id ? theme.palette.primary.main : "transparent",
                bgcolor: value === staff.id ? theme.palette.primary.main + "10" : theme.palette.background.paper,
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  transform: "translateY(-2px)",
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <Avatar
                src={staff.avatar}
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: value === staff.id ? theme.palette.primary.main : theme.palette.grey[300],
                }}
              >
                {staff.nickname?.[0] || staff.firstName[0]}
              </Avatar>
              <Typography
                variant="body2"
                fontWeight={value === staff.id ? 600 : 400}
                color={value === staff.id ? "primary" : "text.primary"}
                textAlign="center"
              >
                คุณ{staff.nickname || staff.firstName}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}
      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
