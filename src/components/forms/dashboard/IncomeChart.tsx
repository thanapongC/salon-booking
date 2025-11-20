import { useTheme } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';

interface Props {
  data?:  null;
  recall?: boolean;
}


const IncomeChart: React.FC<Props> = ({ recall }) => {
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


export default IncomeChart