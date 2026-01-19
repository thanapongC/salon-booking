"use client"

import { Box, Typography, Paper, useTheme, alpha, useMediaQuery } from "@mui/material"
import AppointmentCard from "./AppointmentCard"
import { Appointment } from "@/components/lib/calendar"
import { timeSlots } from "@/utils/lib/booking-data"

interface WeekViewProps {
  currentDate: Date
  appointments: Appointment[]
  onAppointmentClick: (appointment: Appointment) => void
}

export default function WeekView({ currentDate, appointments, onAppointmentClick }: WeekViewProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Get start of week (Sunday)
  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate)
    const day = startOfWeek.getDay()
    startOfWeek.setDate(startOfWeek.getDate() - day)

    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(date.getDate() + i)
      days.push(date)
    }
    return days
  }

  const weekDays = getWeekDays()
  const dayNames = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.']
  const today = new Date().toISOString().split('T')[0]

  const getAppointmentsForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return appointments.filter(apt => apt.date === dateStr)
  }

  const getAppointmentForSlot = (date: Date, time: string) => {
    const dayAppointments = getAppointmentsForDay(date)
    return dayAppointments.filter(apt => {
      return apt.startTime === time
    })
  }

  // Mobile view - show as list per day
  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {weekDays.map((date, dayIndex) => {
          const dateStr = date.toISOString().split('T')[0]
          const isToday = dateStr === today
          const dayAppointments = getAppointmentsForDay(date)

          return (
            <Paper
              key={dayIndex}
              elevation={0}
              sx={{
                bgcolor: theme.palette.background.paper,
                borderRadius: 2,
                overflow: 'hidden',
                border: `1px solid ${isToday ? theme.palette.primary.main : theme.palette.divider}`,
              }}
            >
              {/* Day header */}
              <Box
                sx={{
                  p: 2,
                  bgcolor: isToday ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.grey[100], 0.3),
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: isToday ? theme.palette.primary.main : theme.palette.text.primary,
                  }}
                >
                  {dayNames[dayIndex]} {date.getDate()}
                  {isToday && (
                    <Box
                      component="span"
                      sx={{
                        ml: 1,
                        bgcolor: theme.palette.primary.main,
                        color: '#fff',
                        px: 1,
                        py: 0.25,
                        borderRadius: 1,
                        fontSize: '0.7rem',
                      }}
                    >
                      วันนี้
                    </Box>
                  )}
                </Typography>
              </Box>

              {/* Appointments */}
              <Box sx={{ p: 1.5 }}>
                {dayAppointments.length > 0 ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {dayAppointments
                      .sort((a, b) => a.startTime.localeCompare(b.startTime))
                      .map(apt => (
                        <AppointmentCard
                          key={apt.id}
                          appointment={apt}
                          onClick={onAppointmentClick}
                        />
                      ))}
                  </Box>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      textAlign: 'center',
                      py: 2,
                    }}
                  >
                    ไม่มีนัดหมาย
                  </Typography>
                )}
              </Box>
            </Paper>
          )
        })}
      </Box>
    )
  }

  // Desktop view - grid layout
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
      {/* Header row with day names */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '80px repeat(7, 1fr)',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            p: 1.5,
            borderRight: `1px solid ${theme.palette.divider}`,
            bgcolor: alpha(theme.palette.grey[100], 0.3),
          }}
        />
        {weekDays.map((date, index) => {
          const dateStr = date.toISOString().split('T')[0]
          const isToday = dateStr === today

          return (
            <Box
              key={index}
              sx={{
                p: 1.5,
                textAlign: 'center',
                borderRight: index < 6 ? `1px solid ${theme.palette.divider}` : 'none',
                bgcolor: isToday ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.grey[100], 0.3),
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  display: 'block',
                }}
              >
                {dayNames[index]}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: isToday ? theme.palette.primary.main : theme.palette.text.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {date.getDate()}
                {isToday && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: theme.palette.primary.main,
                      ml: 0.5,
                    }}
                  />
                )}
              </Typography>
            </Box>
          )
        })}
      </Box>

      {/* Time grid */}
      <Box sx={{ maxHeight: 600, overflow: 'auto' }}>
        {timeSlots.map((time: any, timeIndex: any) => (
          <Box
            key={time}
            sx={{
              display: 'grid',
              gridTemplateColumns: '80px repeat(7, 1fr)',
              minHeight: 50,
              borderBottom: timeIndex < timeSlots.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
            }}
          >
            {/* Time label */}
            <Box
              sx={{
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

            {/* Day columns */}
            {weekDays.map((date, dayIndex) => {
              const slotAppointments = getAppointmentForSlot(date, time)
              const dateStr = date.toISOString().split('T')[0]
              const isToday = dateStr === today

              return (
                <Box
                  key={dayIndex}
                  sx={{
                    p: 0.5,
                    borderRight: dayIndex < 6 ? `1px solid ${theme.palette.divider}` : 'none',
                    bgcolor: isToday
                      ? alpha(theme.palette.primary.main, 0.03)
                      : time.endsWith(':00')
                      ? 'transparent'
                      : alpha(theme.palette.grey[100], 0.1),
                    minHeight: 50,
                  }}
                >
                  {slotAppointments.map(apt => (
                    <AppointmentCard
                      key={apt.id}
                      appointment={apt}
                      onClick={onAppointmentClick}
                      compact
                    />
                  ))}
                </Box>
              )
            })}
          </Box>
        ))}
      </Box>
    </Paper>
  )
}
