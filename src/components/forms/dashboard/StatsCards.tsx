"use client"

import { Box, Card, CardContent, Typography, Grid, useTheme } from "@mui/material"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import PeopleIcon from "@mui/icons-material/People"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import PendingActionsIcon from "@mui/icons-material/PendingActions"
import { DashboardStats } from "@/components/lib/dashboard"

interface StatsCardsProps {
  stats: DashboardStats
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const theme = useTheme()

  const statItems = [
    {
      label: "วันนี้มี",
      value: stats.todayAppointments,
      unit: "คิว",
      icon: CalendarTodayIcon,
      color: theme.palette.primary.main,
      bgColor: "#EBF2F9",
    },
    {
      label: "ลูกค้า",
      value: stats.todayCustomers,
      unit: "คน",
      icon: PeopleIcon,
      color: theme.palette.secondary.main,
      bgColor: "#EDF5F0",
    },
    {
      label: "รายได้วันนี้",
      value: stats.todayRevenue.toLocaleString(),
      unit: "บาท",
      icon: AttachMoneyIcon,
      color: "#4CAF50",
      bgColor: "#E8F5E9",
    },
    {
      label: "คิวรอคอนเฟิร์ม",
      value: stats.pendingConfirmations,
      unit: "รายการ",
      icon: PendingActionsIcon,
      color: theme.palette.warning.dark,
      bgColor: theme.palette.warning.light,
    },
  ]

  return (
    <Grid container spacing={2}>
      {statItems.map((item, index) => (
        <Grid item xs={6} md={3} key={index}>
          <Card
            sx={{
              height: "100%",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0px 8px 24px rgba(23, 46, 78, 0.12)",
              },
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    width: { xs: 40, md: 48 },
                    height: { xs: 40, md: 48 },
                    borderRadius: "12px",
                    backgroundColor: item.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <item.icon sx={{ color: item.color, fontSize: { xs: 20, md: 24 } }} />
                </Box>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 0.5,
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                }}
              >
                {item.label}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    fontSize: { xs: "1.5rem", md: "1.75rem" },
                  }}
                >
                  {item.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: { xs: "0.75rem", md: "0.875rem" },
                  }}
                >
                  {item.unit}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
