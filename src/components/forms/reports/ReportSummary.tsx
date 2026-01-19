"use client"

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid2,
  useTheme,
} from '@mui/material'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PeopleIcon from '@mui/icons-material/People'
import EventIcon from '@mui/icons-material/Event'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import StarIcon from '@mui/icons-material/Star'
import PersonIcon from '@mui/icons-material/Person'
import { ReportSummary } from '@/components/lib/reports'

interface ReportSummaryProps {
  summary: ReportSummary
}

export default function ReportSummaryComponent({ summary }: ReportSummaryProps) {
  const theme = useTheme()

  const summaryItems = [
    {
      label: 'จำนวนรายการ',
      value: summary.totalRecords.toLocaleString(),
      icon: <ReceiptLongIcon />,
      color: theme.palette.primary.main,
    },
    {
      label: 'ยอดรวม',
      value: `${summary.totalRevenue.toLocaleString()} บาท`,
      icon: <AttachMoneyIcon />,
      color: '#2E7D32',
    },
    {
      label: 'จำนวนลูกค้า',
      value: summary.totalCustomers.toLocaleString(),
      icon: <PeopleIcon />,
      color: theme.palette.secondary.main,
    },
    {
      label: 'การจองสำเร็จ',
      value: summary.totalBookings.toLocaleString(),
      icon: <EventIcon />,
      color: '#1976D2',
    },
    {
      label: 'ค่าเฉลี่ย/รายการ',
      value: `${summary.averageRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })} บาท`,
      icon: <TrendingUpIcon />,
      color: theme.palette.warning.dark,
    },
    {
      label: 'บริการยอดนิยม',
      value: summary.topService,
      icon: <StarIcon />,
      color: '#ED6C02',
    },
    {
      label: 'พนักงานยอดเยี่ยม',
      value: summary.topStaff,
      icon: <PersonIcon />,
      color: theme.palette.primary.main,
    },
  ]

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 600, mb: 2 }}>
          สรุปข้อมูลก่อนดาวน์โหลด
        </Typography>
        
        <Grid2 container spacing={2}>
          {summaryItems.map((item, index) => (
            <Grid2 key={index} size={{ xs: 6, sm: 4, md: 3, lg: 12 / 7 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 2,
                  bgcolor: theme.palette.grey[100],
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: theme.palette.grey[200],
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: `${item.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
                    '& svg': {
                      color: item.color,
                      fontSize: 20,
                    },
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary, textAlign: 'center', mb: 0.5 }}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    textAlign: 'center',
                    wordBreak: 'break-word',
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </CardContent>
    </Card>
  )
}
