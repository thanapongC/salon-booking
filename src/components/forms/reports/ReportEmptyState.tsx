"use client"

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material'
import AssessmentIcon from '@mui/icons-material/Assessment'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'

interface ReportEmptyStateProps {
  onSelectPreset: (presetId: string) => void
}

export default function ReportEmptyState({ onSelectPreset }: ReportEmptyStateProps) {
  const theme = useTheme()

  const tips = [
    'เลือกประเภทรายงานที่ต้องการดูจากตัวกรองด้านบน',
    'กำหนดช่วงเวลาที่ต้องการดูข้อมูล',
    'ใช้ Shortcut รายงาน เพื่อเรียกดูรายงานที่ใช้บ่อยได้รวดเร็ว',
    'สามารถบันทึก Preset เพื่อใช้งานซ้ำได้',
  ]

  const quickActions = [
    { id: 'monthly', label: 'ดูรายงานเดือนนี้' },
    { id: 'staff-performance', label: 'ดูรายงานพนักงาน' },
    { id: 'new-customers', label: 'ดูรายงานลูกค้าใหม่' },
  ]

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 6,
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: theme.palette.grey[100],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <AssessmentIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 1 }}>
            ยังไม่มีข้อมูลรายงาน
          </Typography>

          <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4, textAlign: 'center', maxWidth: 400 }}>
            เลือกตัวกรองหรือใช้ Shortcut รายงานเพื่อเริ่มดูข้อมูล
          </Typography>

          {/* Quick Actions */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4, justifyContent: 'center' }}>
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="contained"
                onClick={() => onSelectPreset(action.id)}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  '&:hover': { bgcolor: theme.palette.primary.dark },
                }}
              >
                {action.label}
              </Button>
            ))}
          </Box>

          {/* Tips Section */}
          <Box
            sx={{
              width: '100%',
              maxWidth: 500,
              bgcolor: theme.palette.grey[100],
              borderRadius: 2,
              p: 3,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <TipsAndUpdatesIcon sx={{ color: theme.palette.warning.dark }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                คำแนะนำการใช้งาน
              </Typography>
            </Box>

            <List dense disablePadding>
              {tips.map((tip, index) => (
                <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleOutlineIcon sx={{ fontSize: 18, color: theme.palette.secondary.main }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={tip}
                    primaryTypographyProps={{
                      variant: 'body2',
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
