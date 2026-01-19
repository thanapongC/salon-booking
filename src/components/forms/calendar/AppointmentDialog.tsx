"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  Chip,
  useTheme,
  alpha,
} from "@mui/material"
import {
  Close as CloseIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  EventNote as NoteIcon,
  Edit as EditIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material"
import { Appointment } from "@/components/lib/calendar"
import { getStatusColor, getStatusLabel } from "@/components/lib/calendar-data"

interface AppointmentDialogProps {
  open: boolean
  appointment: Appointment | null
  onClose: () => void
  onReschedule: (appointment: Appointment) => void
  onCancel: (appointment: Appointment) => void
}

export default function AppointmentDialog({
  open,
  appointment,
  onClose,
  onReschedule,
  onCancel,
}: AppointmentDialogProps) {
  const theme = useTheme()

  if (!appointment) return null

  const statusColor = getStatusColor(appointment.status)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
        },
      }}
    >
      {/* Header with service color */}
      <Box
        sx={{
          bgcolor: alpha(appointment.serviceColor, 0.15),
          borderBottom: `4px solid ${appointment.serviceColor}`,
          p: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              {appointment.serviceName}
            </Typography>
            <Chip
              label={getStatusLabel(appointment.status)}
              size="small"
              sx={{
                mt: 1,
                bgcolor: alpha(statusColor, 0.15),
                color: statusColor,
                fontWeight: 600,
              }}
            />
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        {/* Customer info */}
        <Typography
          variant="subtitle2"
          sx={{ color: theme.palette.text.secondary, mb: 1 }}
        >
          ข้อมูลลูกค้า
        </Typography>
        <Box
          sx={{
            bgcolor: alpha(theme.palette.grey[100], 0.5),
            borderRadius: 2,
            p: 2,
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {appointment.customerName}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon sx={{ fontSize: 18, color: theme.palette.text.secondary }} />
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                {appointment.customerPhone}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon sx={{ fontSize: 18, color: theme.palette.text.secondary }} />
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                {appointment.customerEmail}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Appointment details */}
        <Typography
          variant="subtitle2"
          sx={{ color: theme.palette.text.secondary, mb: 1 }}
        >
          รายละเอียดนัดหมาย
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1.5,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TimeIcon sx={{ color: theme.palette.primary.main }} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                วันที่และเวลา
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {new Date(appointment.date).toLocaleDateString('th-TH', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {appointment.startTime} - {appointment.endTime} ({appointment.duration} นาที)
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1.5,
                bgcolor: alpha(theme.palette.secondary.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PersonIcon sx={{ color: theme.palette.secondary.main }} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                พนักงานผู้ให้บริการ
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {appointment.staffName}
              </Typography>
            </Box>
          </Box>

          {appointment.notes && (
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1.5,
                  bgcolor: alpha(theme.palette.warning.main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <NoteIcon sx={{ color: theme.palette.warning.dark }} />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  หมายเหตุ
                </Typography>
                <Typography variant="body1">
                  {appointment.notes}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => onReschedule(appointment)}
          sx={{
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
          }}
        >
          เลื่อนนัด
        </Button>
        <Button
          variant="contained"
          startIcon={<CancelIcon />}
          onClick={() => onCancel(appointment)}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: '#fff',
          }}
        >
          ยกเลิกนัดหมาย
        </Button>
      </DialogActions>
    </Dialog>
  )
}
