"use client"

import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Button,
  useTheme,
  Divider,
} from "@mui/material"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { Appointment } from "@/components/lib/calendar"
import { getStatusColor, getStatusLabel } from "@/components/lib/calendar-data"

interface TodayAppointmentsProps {
  appointments: Appointment[]
}

export default function TodayAppointments({ appointments }: TodayAppointmentsProps) {
  const theme = useTheme()

  const todayAppointments = appointments
    .filter(apt => apt.date === new Date().toISOString().split('T')[0])
    .sort((a, b) => a.startTime.localeCompare(b.startTime))

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            p: 3,
            pb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            นัดหมายวันนี้
          </Typography>
          <Chip
            label={`${todayAppointments.length} รายการ`}
            size="small"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
              fontWeight: 500,
            }}
          />
        </Box>
        <Divider />
        <List sx={{ p: 0, maxHeight: 360, overflow: "auto" }}>
          {todayAppointments.length === 0 ? (
            <ListItem>
              <ListItemText
                primary="ไม่มีนัดหมายวันนี้"
                sx={{ textAlign: "center", color: theme.palette.text.secondary }}
              />
            </ListItem>
          ) : (
            todayAppointments.map((appointment, index) => (
              <Box key={appointment.id}>
                <ListItem
                  sx={{
                    px: 3,
                    py: 2,
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        backgroundColor: appointment.serviceColor,
                        width: 44,
                        height: 44,
                      }}
                    >
                      {appointment.customerName.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {appointment.customerName}
                        </Typography>
                        <Chip
                          label={getStatusLabel(appointment.status)}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: "0.7rem",
                            backgroundColor: `${getStatusColor(appointment.status)}20`,
                            color: getStatusColor(appointment.status),
                            fontWeight: 500,
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {appointment.serviceName} - {appointment.staffName}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <AccessTimeIcon sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            {appointment.startTime} - {appointment.endTime}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                {index < todayAppointments.length - 1 && <Divider />}
              </Box>
            ))
          )}
        </List>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            endIcon={<ArrowForwardIcon />}
            sx={{
              color: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            ดูทั้งหมด
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
