"use client"

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid2,
  useTheme,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts'
import BarChartIcon from '@mui/icons-material/BarChart'
import PieChartIcon from '@mui/icons-material/PieChart'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import { ChartData } from '@/components/lib/dashboard'

interface ReportChartsProps {
  revenueData: ChartData[]
  serviceData: ChartData[]
  staffData: ChartData[]
}

export default function ReportCharts({ revenueData, serviceData, staffData }: ReportChartsProps) {
  const theme = useTheme()
  const [revenueChartType, setRevenueChartType] = useState<'bar' | 'line'>('bar')

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: 'white',
            p: 1.5,
            borderRadius: 1,
            boxShadow: 2,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            {label}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            {`${payload[0].value.toLocaleString()} บาท`}
          </Typography>
        </Box>
      )
    }
    return null
  }

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: 'white',
            p: 1.5,
            borderRadius: 1,
            boxShadow: 2,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            {payload[0].name}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            {`${payload[0].value.toLocaleString()} บาท`}
          </Typography>
        </Box>
      )
    }
    return null
  }

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 600, mb: 3 }}>
          กราฟสรุปผล
        </Typography>

        <Grid2 container spacing={3}>
          {/* Revenue Chart */}
          <Grid2 size={{ xs: 12, lg: 6 }}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.background.paper,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                  รายได้ตามช่วงเวลา
                </Typography>
                <ToggleButtonGroup
                  size="small"
                  value={revenueChartType}
                  exclusive
                  onChange={(e, value) => value && setRevenueChartType(value)}
                >
                  <ToggleButton value="bar" sx={{ px: 1 }}>
                    <BarChartIcon fontSize="small" />
                  </ToggleButton>
                  <ToggleButton value="line" sx={{ px: 1 }}>
                    <ShowChartIcon fontSize="small" />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <ResponsiveContainer width="100%" height={250}>
                {revenueChartType === 'bar' ? (
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis dataKey="label" tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} />
                    <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
                  </BarChart>
                ) : (
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis dataKey="label" tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} />
                    <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={theme.palette.primary.main}
                      strokeWidth={2}
                      dot={{ fill: theme.palette.primary.main, strokeWidth: 2 }}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </Box>
          </Grid2>

          {/* Service Distribution Chart */}
          <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.background.paper,
                height: '100%',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 2 }}>
                รายได้ตามบริการ
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="label"
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} 
                    //   fill={entry.color} 
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ fontSize: 11 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Grid2>

          {/* Staff Performance Chart */}
          <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.background.paper,
                height: '100%',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 2 }}>
                รายได้ตามพนักงาน
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={staffData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="label"
                  >
                    {staffData.map((entry, index) => (
                      <Cell key={`cell-${index}`} 
                    //   fill={entry.color} 
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ fontSize: 11 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  )
}
