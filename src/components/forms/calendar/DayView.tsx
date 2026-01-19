"use client"

import { Box, Typography, Paper, useTheme, alpha } from "@mui/material"
import AppointmentCard from "./AppointmentCard"
import { Appointment } from "@/components/lib/calendar"
import { timeSlots } from "@/utils/lib/booking-data"

interface DayViewProps {
  currentDate: Date
  appointments: Appointment[]
  onAppointmentClick: (appointment: Appointment) => void
}

export default function DayView({ currentDate, appointments, onAppointmentClick }: DayViewProps) {
  const theme = useTheme()
  const dateStr = currentDate.toISOString().split('T')[0]
  
  const dayAppointments = appointments.filter(apt => apt.date === dateStr)

  const getAppointmentForSlot = (time: string) => {
    return dayAppointments.filter(apt => {
      const aptStart = apt.startTime
      const aptEnd = apt.endTime
      return time >= aptStart && time < aptEnd
    })
  }

  const isAppointmentStart = (apt: Appointment, time: string) => {
    return apt.startTime === time
  }

  const getAppointmentHeight = (apt: Appointment) => {
    const slots = apt.duration / 30
    return slots * 60 // 60px per 30-min slot
  }

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.paper,
        borderRadius: 2,
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Time grid */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {timeSlots.map((time: any, index: any) => {
          const slotAppointments = getAppointmentForSlot(time)
          const startingAppointments = slotAppointments.filter(apt => isAppointmentStart(apt, time))
          
          return (
            <Box
              key={time}
              sx={{
                display: 'flex',
                minHeight: 60,
                borderBottom: index < timeSlots.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
              }}
            >
              {/* Time label */}
              <Box
                sx={{
                  width: 80,
                  flexShrink: 0,
                  p: 1,
                  borderRight: `1px solid ${theme.palette.divider}`,
                  bgcolor: alpha(theme.palette.grey[100], 0.3),
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                  }}
                >
                  {time}
                </Typography>
              </Box>

              {/* Appointments area */}
              <Box
                sx={{
                  flex: 1,
                  p: 0.5,
                  position: 'relative',
                  bgcolor: time.endsWith(':00') ? 'transparent' : alpha(theme.palette.grey[100], 0.15),
                }}
              >
                {startingAppointments.map((apt) => (
                  <Box
                    key={apt.id}
                    sx={{
                      position: 'relative',
                      mb: 0.5,
                    }}
                  >
                    <AppointmentCard
                      appointment={apt}
                      onClick={onAppointmentClick}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )
        })}
      </Box>
    </Paper>
  )
}
