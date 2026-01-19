"use client"

import React from "react"

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
  useTheme
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import PrintIcon from '@mui/icons-material/Print'
import LanguageIcon from '@mui/icons-material/Language'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import PhoneIcon from '@mui/icons-material/Phone'
import ChatIcon from '@mui/icons-material/Chat'
import { BookingRecord } from "@/components/lib/bookings"
import { bookingChannelConfig, bookingStatusConfig } from "@/components/lib/bookings-data"

interface BookingDetailDialogProps {
  open: boolean
  booking: BookingRecord | null
  onClose: () => void
  onEdit: (booking: BookingRecord) => void
}

const ChannelIcon = ({ channel }: { channel: string }) => {
  const theme = useTheme()
  switch (channel) {
    case 'online': return <LanguageIcon sx={{ color: theme.palette.text.secondary }} />
    case 'walk-in': return <DirectionsWalkIcon sx={{ color: theme.palette.text.secondary }} />
    case 'phone': return <PhoneIcon sx={{ color: theme.palette.text.secondary }} />
    case 'line': return <ChatIcon sx={{ color: theme.palette.text.secondary }} />
    default: return <LanguageIcon sx={{ color: theme.palette.text.secondary }} />
  }
}

export default function BookingDetailDialog({
  open,
  booking,
  onClose,
  onEdit
}: BookingDetailDialogProps) {
  const theme = useTheme()

  if (!booking) return null

  const statusConfig = bookingStatusConfig[booking.status]
  const channelConfig = bookingChannelConfig[booking.channel]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('th-TH', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const InfoRow = ({ label, value, valueColor }: { label: string; value: string | React.ReactNode; valueColor?: string }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 500, color: valueColor || theme.palette.text.primary, textAlign: 'right' }}>
        {value}
      </Typography>
    </Box>
  )

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: `1px solid ${theme.palette.divider}`,
        pb: 2
      }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            รายละเอียดการจอง
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            {booking.id}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip
            size="small"
            label={statusConfig.label}
            sx={{
              bgcolor: statusConfig.bgColor,
              color: statusConfig.color,
              fontWeight: 500
            }}
          />
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {/* Customer Info */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 1 }}>
            ข้อมูลลูกค้า
          </Typography>
          <Box sx={{ bgcolor: theme.palette.grey[100], borderRadius: 2, p: 2 }}>
            <InfoRow label="ชื่อ" value={booking.customerName} />
            <InfoRow label="เบอร์โทร" value={booking.customerPhone} />
            <InfoRow label="อีเมล" value={booking.customerEmail} />
          </Box>
        </Box>

        {/* Service Info */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 1 }}>
            ข้อมูลบริการ
          </Typography>
          <Box sx={{ bgcolor: theme.palette.grey[100], borderRadius: 2, p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: booking.serviceColor
                }}
              />
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {booking.service}
              </Typography>
            </Box>
            <InfoRow label="ประเภทบริการ" value={booking.serviceType === 'with-staff' ? 'มีพนักงาน' : 'ไม่ระบุพนักงาน'} />
            <InfoRow label="พนักงาน" value={booking.staffName} />
            <InfoRow label="ระยะเวลา" value={`${booking.duration} นาที`} />
            <Divider sx={{ my: 1 }} />
            <InfoRow 
              label="ราคา" 
              value={`${booking.price.toLocaleString()} บาท`} 
              valueColor={theme.palette.primary.main}
            />
          </Box>
        </Box>

        {/* Schedule Info */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 1 }}>
            วันเวลา
          </Typography>
          <Box sx={{ bgcolor: theme.palette.grey[100], borderRadius: 2, p: 2 }}>
            <InfoRow label="วันที่" value={formatDate(booking.date)} />
            <InfoRow label="เวลา" value={`${booking.time} - ${booking.endTime}`} />
          </Box>
        </Box>

        {/* Notes */}
        {booking.notes && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 1 }}>
              หมายเหตุ
            </Typography>
            <Box sx={{ bgcolor: theme.palette.warning.light, borderRadius: 2, p: 2 }}>
              <Typography variant="body2">{booking.notes}</Typography>
            </Box>
          </Box>
        )}

        {/* Meta Info */}
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 1 }}>
            ข้อมูลเพิ่มเติม
          </Typography>
          <Box sx={{ bgcolor: theme.palette.grey[100], borderRadius: 2, p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, flex: 1 }}>
                ช่องทางการจอง
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ChannelIcon channel={booking.channel} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {channelConfig.label}
                </Typography>
              </Box>
            </Box>
            <InfoRow label="สร้างเมื่อ" value={formatDateTime(booking.createdAt)} />
            <Divider sx={{ my: 1 }} />
            <InfoRow label="แก้ไขล่าสุด" value={formatDateTime(booking.updatedAt)} />
            <InfoRow label="ผู้แก้ไข" value={booking.updatedBy} />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Button
          variant="outlined"
          startIcon={<PrintIcon />}
          sx={{
            borderColor: theme.palette.grey[300],
            color: theme.palette.text.primary
          }}
        >
          พิมพ์
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => onEdit(booking)}
          sx={{
            bgcolor: theme.palette.primary.main,
            '&:hover': { bgcolor: theme.palette.primary.dark }
          }}
        >
          แก้ไข
        </Button>
      </DialogActions>
    </Dialog>
  )
}
