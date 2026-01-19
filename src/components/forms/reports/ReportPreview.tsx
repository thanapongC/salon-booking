"use client"

import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useTheme,
  useMediaQuery,
  Paper,
} from '@mui/material'
import PreviewIcon from '@mui/icons-material/Preview'
import { ReportDataRow } from '@/components/lib/reports'

interface ReportPreviewProps {
  data: ReportDataRow[]
}

export default function ReportPreview({ data }: ReportPreviewProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return { bg: '#E8F5E9', text: '#2E7D32', label: 'สำเร็จ' }
      case 'cancelled':
        return { bg: '#FFEBEE', text: '#C62828', label: 'ยกเลิก' }
      case 'no-show':
        return { bg: '#FFF3E0', text: '#E65100', label: 'ไม่มา' }
      default:
        return { bg: theme.palette.grey[100], text: theme.palette.text.primary, label: status }
    }
  }

  const getCustomerTypeColor = (type: 'new' | 'returning') => {
    return type === 'new'
      ? { bg: '#E3F2FD', text: '#1565C0', label: 'ใหม่' }
      : { bg: theme.palette.grey[100], text: theme.palette.text.secondary, label: 'เก่า' }
  }

  // Show only first 10 rows for preview
  const previewData = data.slice(0, 10)

  if (isMobile) {
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <PreviewIcon sx={{ color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
              Preview รายงาน
            </Typography>
            <Chip
              label={`${data.length} รายการ`}
              size="small"
              sx={{ bgcolor: theme.palette.grey[100], ml: 'auto' }}
            />
          </Box>

          {previewData.map((row) => {
            const statusInfo = getStatusColor(row.status)
            const customerInfo = getCustomerTypeColor(row.customerType)
            return (
              <Box
                key={row.id}
                sx={{
                  p: 2,
                  mb: 1,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  '&:last-child': { mb: 0 },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {row.customerName}
                  </Typography>
                  <Chip
                    label={statusInfo.label}
                    size="small"
                    sx={{ bgcolor: statusInfo.bg, color: statusInfo.text, fontSize: 11 }}
                  />
                </Box>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
                  {row.service} - {row.staffName}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {new Date(row.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                    {row.revenue.toLocaleString()} บาท
                  </Typography>
                </Box>
              </Box>
            )
          })}

          {data.length > 10 && (
            <Typography variant="body2" sx={{ textAlign: 'center', mt: 2, color: theme.palette.text.secondary }}>
              แสดง 10 จาก {data.length} รายการ
            </Typography>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <PreviewIcon sx={{ color: theme.palette.primary.main }} />
          <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
            Preview รายงาน
          </Typography>
          <Chip
            label={`${data.length} รายการ`}
            size="small"
            sx={{ bgcolor: theme.palette.grey[100], ml: 'auto' }}
          />
        </Box>

        <TableContainer component={Paper} elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: theme.palette.grey[100] }}>
                <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main }}>วันที่</TableCell>
                <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main }}>ลูกค้า</TableCell>
                <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main }}>บริการ</TableCell>
                <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main }}>พนักงาน</TableCell>
                <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main }} align="right">รายได้</TableCell>
                <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main }} align="center">สถานะ</TableCell>
                <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main }} align="center">ประเภทลูกค้า</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {previewData.map((row) => {
                const statusInfo = getStatusColor(row.status)
                const customerInfo = getCustomerTypeColor(row.customerType)
                return (
                  <TableRow key={row.id} sx={{ '&:hover': { bgcolor: theme.palette.action.hover } }}>
                    <TableCell>
                      {new Date(row.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}
                    </TableCell>
                    <TableCell>{row.customerName}</TableCell>
                    <TableCell>{row.service}</TableCell>
                    <TableCell>{row.staffName}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                      {row.revenue.toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={statusInfo.label}
                        size="small"
                        sx={{ bgcolor: statusInfo.bg, color: statusInfo.text, fontSize: 11, minWidth: 60 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={customerInfo.label}
                        size="small"
                        sx={{ bgcolor: customerInfo.bg, color: customerInfo.text, fontSize: 11, minWidth: 40 }}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {data.length > 10 && (
          <Typography variant="body2" sx={{ textAlign: 'center', mt: 2, color: theme.palette.text.secondary }}>
            แสดง 10 จาก {data.length} รายการ (Preview)
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
