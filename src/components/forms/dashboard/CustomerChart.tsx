"use client"

import type React from "react"
import { BarChart } from "@mui/x-charts/BarChart"
import { useTheme } from "@mui/material/styles"

interface Props {
  data?: null
  recall?: boolean
}

const CustomerChart: React.FC<Props> = ({ recall }) => {
  const theme = useTheme()

  return (
    <BarChart
      xAxis={[{ data: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] }]}
      series={[
        {
          data: [40, 30, 50, 80, 200, 355, 586, 56],
          color: theme.palette.primary.main,
        },
      ]}
      height={300}
    />
  )
}

export default CustomerChart
