"use client"

import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Typography,
  useTheme
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import LanguageIcon from '@mui/icons-material/Language'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import PhoneIcon from '@mui/icons-material/Phone'
import ChatIcon from '@mui/icons-material/Chat'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonIcon from '@mui/icons-material/Person'
import { BookingRecord } from '@/components/lib/bookings'
import { bookingChannelConfig, bookingStatusConfig } from '@/components/lib/bookings-data'

interface BookingCardMobileProps {
  booking: BookingRecord
  onView: (booking: BookingRecord) => void
  onEdit: (booking: BookingRecord) => void
}

const ChannelIcon = ({ channel }: { channel: string }) => {
  switch (channel) {
    case 'online': return <LanguageIcon fontSize="small" />
    case 'walk-in': return <DirectionsWalkIcon fontSize="small" />
    case 'phone': return <PhoneIcon fontSize="small" />
    case 'line': return <ChatIcon fontSize="small" />
    default: return <LanguageIcon fontSize="small" />
  }
}

export default function BookingCardMobile({ booking, onView, onEdit }: BookingCardMobileProps) {
  const theme = useTheme()
  const statusConfig = bookingStatusConfig[booking.status]
  const channelConfig = bookingChannelConfig[booking.channel]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('th-TH', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    })
  }

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleString('th-TH', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0px 2px 8px rgba(23, 46, 78, 0.08)',
        borderLeft: `4px solid ${booking.serviceColor}`
      }}
    >
      <CardContent sx={{ p: 2 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Box>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              {booking.id}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
              {booking.customerName}
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              {booking.customerPhone}
            </Typography>
          </Box>
          <Chip
            size="small"
            label={statusConfig.label}
            sx={{
              bgcolor: statusConfig.bgColor,
              color: statusConfig.color,
              fontWeight: 500,
              fontSize: '0.7rem'
            }}
          />
        </Box>

        {/* Service */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          mb: 1.5,
          p: 1.5,
          bgcolor: theme.palette.grey[100],
          borderRadius: 2
        }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: booking.serviceColor
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {booking.service}
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              {booking.serviceType === 'with-staff' ? 'มีพนักงาน' : 'ไม่ระบุพนักงาน'}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            {booking.price.toLocaleString()} บาท
          </Typography>
        </Box>

        {/* Date, Time, Staff */}
        <Box sx={{ display: 'flex', gap: 2, mb: 1.5, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
            <Typography variant="caption">
              {formatDate(booking.date)} | {booking.time} - {booking.endTime}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PersonIcon sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
            <Typography variant="caption">{booking.staffName}</Typography>
          </Box>
        </Box>

        {/* Notes */}
        {booking.notes && (
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'block',
              color: theme.palette.text.secondary,
              fontStyle: 'italic',
              mb: 1.5
            }}
          >
            หมายเหตุ: {booking.notes}
          </Typography>
        )}

        <Divider sx={{ my: 1.5 }} />

        {/* Footer */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ChannelIcon channel={booking.channel} />
              <Typography variant="caption">{channelConfig.label}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                แก้ไข: {formatDateTime(booking.updatedAt)}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={() => onView(booking)}
              sx={{ color: theme.palette.text.secondary }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onEdit(booking)}
              sx={{ color: theme.palette.primary.main }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
