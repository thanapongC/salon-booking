"use client"

import { Box, Card, CardContent, Typography, useTheme } from "@mui/material"
import PeopleIcon from "@mui/icons-material/People"
import { CustomerData } from "@/components/lib/dashboard"

interface CustomerChartProps {
  data: CustomerData[]
}

export default function CustomerChart({ data }: CustomerChartProps) {
  const theme = useTheme()

  const maxCustomers = Math.max(...data.map(d => d.customers))
  const totalCustomers = data.reduce((sum, d) => sum + d.customers, 0)

  // Create line chart points
  const chartWidth = 100
  const chartHeight = 120
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * chartWidth
    const y = chartHeight - (item.customers / maxCustomers) * chartHeight
    return `${x},${y}`
  }).join(' ')

  const areaPoints = `0,${chartHeight} ${points} ${chartWidth},${chartHeight}`

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
              กราฟจำนวนลูกค้า
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              ลูกค้า 7 วันย้อนหลัง
            </Typography>
          </Box>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "12px",
              backgroundColor: "#EDF5F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PeopleIcon sx={{ color: theme.palette.secondary.main }} />
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
              {totalCustomers} คน
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
              สูงสุด
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
              {maxCustomers} คน
            </Typography>
          </Box>
        </Box>

        {/* Line Chart */}
        <Box sx={{ position: "relative", height: 180 }}>
          <svg
            width="100%"
            height="140"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="none"
            style={{ overflow: "visible" }}
          >
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((percent) => (
              <line
                key={percent}
                x1="0"
                y1={chartHeight - (percent / 100) * chartHeight}
                x2={chartWidth}
                y2={chartHeight - (percent / 100) * chartHeight}
                stroke={theme.palette.divider}
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
            ))}

            {/* Area fill */}
            <polygon
              points={areaPoints}
              fill={`${theme.palette.secondary.main}20`}
            />

            {/* Line */}
            <polyline
              points={points}
              fill="none"
              stroke={theme.palette.secondary.main}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {data.map((item, index) => {
              const x = (index / (data.length - 1)) * chartWidth
              const y = chartHeight - (item.customers / maxCustomers) * chartHeight
              const isHighest = item.customers === maxCustomers

              return (
                <g key={index}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isHighest ? 5 : 4}
                    fill={isHighest ? theme.palette.primary.main : theme.palette.secondary.main}
                    stroke="#fff"
                    strokeWidth="2"
                  />
                </g>
              )
            })}
          </svg>

          {/* X-axis labels */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            {data.map((item, index) => (
              <Typography
                key={index}
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: item.customers === maxCustomers ? 600 : 400,
                }}
              >
                {item.date}
              </Typography>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
