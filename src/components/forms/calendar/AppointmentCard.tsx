"use client"

import { Box, Typography, useTheme, alpha } from "@mui/material"
import {
  AccessTime as TimeIcon,
  Person as PersonIcon,
} from "@mui/icons-material"
import { Appointment } from "@/components/lib/calendar"
import { getStatusColor, getStatusLabel } from "@/components/lib/calendar-data"

interface AppointmentCardProps {
  appointment: Appointment
  onClick: (appointment: Appointment) => void
  compact?: boolean
}

export default function AppointmentCard({ appointment, onClick, compact = false }: AppointmentCardProps) {
  const theme = useTheme()
  const statusColor = getStatusColor(appointment.status)

  if (compact) {
    return (
      <Box
        onClick={() => onClick(appointment)}
        sx={{
          bgcolor: alpha(appointment.serviceColor, 0.15),
          borderLeft: `3px solid ${appointment.serviceColor}`,
          borderRadius: 1,
          p: 0.5,
          cursor: 'pointer',
          overflow: 'hidden',
          height: '100%',
          '&:hover': {
            bgcolor: alpha(appointment.serviceColor, 0.25),
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {appointment.customerName}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: '0.65rem',
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {appointment.serviceName}
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      onClick={() => onClick(appointment)}
      sx={{
        bgcolor: alpha(appointment.serviceColor, 0.1),
        borderLeft: `4px solid ${appointment.serviceColor}`,
        borderRadius: 1.5,
        p: 1.5,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: alpha(appointment.serviceColor, 0.2),
          transform: 'translateY(-1px)',
          boxShadow: `0 2px 8px ${alpha(appointment.serviceColor, 0.3)}`,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
          }}
        >
          {appointment.customerName}
        </Typography>
        <Box
          sx={{
            bgcolor: alpha(statusColor, 0.15),
            color: statusColor,
            px: 1,
            py: 0.25,
            borderRadius: 1,
            fontSize: '0.65rem',
            fontWeight: 600,
          }}
        >
          {getStatusLabel(appointment.status)}
        </Box>
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: appointment.serviceColor,
          fontWeight: 500,
          mb: 0.5,
        }}
      >
        {appointment.serviceName}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <TimeIcon sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            {appointment.startTime} - {appointment.endTime}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <PersonIcon sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            {appointment.staffName}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
