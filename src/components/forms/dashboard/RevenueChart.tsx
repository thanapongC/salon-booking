"use client"

import { Box, Card, CardContent, Typography, useTheme } from "@mui/material"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import { RevenueData } from "@/components/lib/dashboard"

interface RevenueChartProps {
  data: RevenueData[]
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const theme = useTheme()

  const maxRevenue = Math.max(...data.map(d => d.revenue))
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0)
  const avgRevenue = Math.round(totalRevenue / data.length)

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 0.5 }}>
              กราฟรายได้
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              รายได้ 7 วันย้อนหลัง
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <TrendingUpIcon sx={{ color: "#4CAF50", fontSize: 20 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#4CAF50" }}>
                +12.5%
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              เทียบสัปดาห์ที่แล้ว
            </Typography>
          </Box>
        </Box>

        {/* Summary */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            mb: 3,
            p: 2,
            backgroundColor: theme.palette.grey[100],
            borderRadius: 2,
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
              รวมทั้งสัปดาห์
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
              {totalRevenue.toLocaleString()} บาท
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
              เฉลี่ยต่อวัน
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
              {avgRevenue.toLocaleString()} บาท
            </Typography>
          </Box>
        </Box>

        {/* Bar Chart */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            height: 180,
            gap: 1,
          }}
        >
          {data.map((item, index) => {
            const height = (item.revenue / maxRevenue) * 140
            const isHighest = item.revenue === maxRevenue

            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 1,
                    fontSize: "0.65rem",
                  }}
                >
                  {(item.revenue / 1000).toFixed(1)}k
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 40,
                    height: height,
                    backgroundColor: isHighest ? theme.palette.primary.main : theme.palette.secondary.main,
                    borderRadius: "6px 6px 0 0",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      transform: "scaleY(1.05)",
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    mt: 1,
                    fontWeight: isHighest ? 600 : 400,
                  }}
                >
                  {item.date}
                </Typography>
              </Box>
            )
          })}
        </Box>
      </CardContent>
    </Card>
  )
}
