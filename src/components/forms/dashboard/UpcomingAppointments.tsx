"use client"

import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  useTheme,
  Divider,
} from "@mui/material"
import EventIcon from "@mui/icons-material/Event"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import { Appointment } from "@/components/lib/calendar"
interface UpcomingAppointmentsProps {
  appointments: Appointment[]
}

export default function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps) {
  const theme = useTheme()

  const today = new Date().toISOString().split('T')[0]
  const upcomingAppointments = appointments
    .filter(apt => apt.date > today)
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date)
      if (dateCompare !== 0) return dateCompare
      return a.startTime.localeCompare(b.startTime)
    })
    .slice(0, 3)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }
    return date.toLocaleDateString('th-TH', options)
  }

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
            นัดหมายที่จะถึง
          </Typography>
          <EventIcon sx={{ color: theme.palette.secondary.main }} />
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {upcomingAppointments.length === 0 ? (
            <ListItem>
              <ListItemText
                primary="ไม่มีนัดหมายที่จะถึง"
                sx={{ textAlign: "center", color: theme.palette.text.secondary }}
              />
            </ListItem>
          ) : (
            upcomingAppointments.map((appointment, index) => (
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
                  <Box
                    sx={{
                      width: 4,
                      height: 60,
                      borderRadius: 2,
                      backgroundColor: appointment.serviceColor,
                      mr: 2,
                    }}
                  />
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {appointment.customerName}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {appointment.serviceName}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Chip
                            icon={<EventIcon sx={{ fontSize: 14 }} />}
                            label={formatDate(appointment.date)}
                            size="small"
                            sx={{
                              height: 24,
                              fontSize: "0.75rem",
                              backgroundColor: theme.palette.grey[100],
                              color: theme.palette.text.primary,
                              "& .MuiChip-icon": {
                                color: theme.palette.text.secondary,
                              },
                            }}
                          />
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <AccessTimeIcon sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                              {appointment.startTime}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                {index < upcomingAppointments.length - 1 && <Divider />}
              </Box>
            ))
          )}
        </List>
      </CardContent>
    </Card>
  )
}
