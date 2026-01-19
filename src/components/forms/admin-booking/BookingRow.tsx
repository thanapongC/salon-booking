"use client"

import {
  Box,
  Chip,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import LanguageIcon from '@mui/icons-material/Language'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import PhoneIcon from '@mui/icons-material/Phone'
import ChatIcon from '@mui/icons-material/Chat'
import { BookingRecord } from '@/components/lib/bookings'
import { bookingChannelConfig, bookingStatusConfig } from '@/components/lib/bookings-data'

interface BookingRowProps {
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

export default function BookingRow({ booking, onView, onEdit }: BookingRowProps) {
  const theme = useTheme()
  const statusConfig = bookingStatusConfig[booking.status]
  const channelConfig = bookingChannelConfig[booking.channel]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
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

  return (
    <TableRow
      hover
      sx={{
        '&:hover': {
          bgcolor: theme.palette.action.hover
        }
      }}
    >
      {/* ID & Customer */}
      <TableCell>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            {booking.id}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {booking.customerName}
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            {booking.customerPhone}
          </Typography>
        </Box>
      </TableCell>

      {/* Service */}
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: booking.serviceColor
            }}
          />
          <Box>
            <Typography variant="body2">{booking.service}</Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              {booking.serviceType === 'with-staff' ? 'มีพนักงาน' : 'ไม่ระบุพนักงาน'}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      {/* Date & Time */}
      <TableCell>
        <Typography variant="body2">{formatDate(booking.date)}</Typography>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
          {booking.time} - {booking.endTime}
        </Typography>
      </TableCell>

      {/* Staff */}
      <TableCell>
        <Typography variant="body2">{booking.staffName}</Typography>
      </TableCell>

      {/* Price */}
      <TableCell>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {booking.price.toLocaleString()} บาท
        </Typography>
      </TableCell>

      {/* Status */}
      <TableCell>
        <Chip
          size="small"
          label={statusConfig.label}
          sx={{
            bgcolor: statusConfig.bgColor,
            color: statusConfig.color,
            fontWeight: 500,
            fontSize: '0.75rem'
          }}
        />
      </TableCell>

      {/* Channel */}
      <TableCell>
        <Tooltip title={channelConfig.label}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ChannelIcon channel={booking.channel} />
            <Typography variant="caption">{channelConfig.label}</Typography>
          </Box>
        </Tooltip>
      </TableCell>

      {/* Updated */}
      <TableCell>
        <Box>
          <Typography variant="caption" sx={{ display: 'block' }}>
            {formatDateTime(booking.updatedAt)}
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            โดย: {booking.updatedBy}
          </Typography>
        </Box>
      </TableCell>

      {/* Actions */}
      <TableCell align="right">
        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
          <Tooltip title="ดูรายละเอียด">
            <IconButton
              size="small"
              onClick={() => onView(booking)}
              sx={{ color: theme.palette.text.secondary }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="แก้ไข">
            <IconButton
              size="small"
              onClick={() => onEdit(booking)}
              sx={{ color: theme.palette.primary.main }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </TableCell>
    </TableRow>
  )
}
