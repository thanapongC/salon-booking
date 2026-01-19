import type { ReportDataRow, ReportSummary, ChartData, ReportPreset } from './reports'

export const mockReportData: ReportDataRow[] = [
  { id: '1', date: '2024-01-15', customerName: 'คุณสมหญิง ใจดี', service: 'ตัดผม', staffName: 'Sarah Johnson', revenue: 800, status: 'completed', customerType: 'returning' },
  { id: '2', date: '2024-01-15', customerName: 'คุณวิชัย มั่งมี', service: 'ทำสีผม', staffName: 'Michael Chen', revenue: 2500, status: 'completed', customerType: 'new' },
  { id: '3', date: '2024-01-15', customerName: 'คุณนภา สดใส', service: 'ทำเล็บมือ', staffName: 'Emma Williams', revenue: 500, status: 'completed', customerType: 'returning' },
  { id: '4', date: '2024-01-16', customerName: 'คุณพิมพ์ใจ รักสวย', service: 'นวดตัว', staffName: 'David Martinez', revenue: 1500, status: 'completed', customerType: 'new' },
  { id: '5', date: '2024-01-16', customerName: 'คุณอรทัย งามพริ้ง', service: 'ดูแลผิวหน้า', staffName: 'Lisa Anderson', revenue: 1200, status: 'completed', customerType: 'returning' },
  { id: '6', date: '2024-01-17', customerName: 'คุณสมศักดิ์ เจริญดี', service: 'ตัดผม', staffName: 'Sarah Johnson', revenue: 800, status: 'completed', customerType: 'new' },
  { id: '7', date: '2024-01-17', customerName: 'คุณมาลี สวยงาม', service: 'ทำเล็บเท้า', staffName: 'Emma Williams', revenue: 650, status: 'no-show', customerType: 'returning' },
  { id: '8', date: '2024-01-18', customerName: 'คุณณัฐพล เก่งกาจ', service: 'ทำสีผม', staffName: 'Michael Chen', revenue: 2500, status: 'completed', customerType: 'returning' },
  { id: '9', date: '2024-01-18', customerName: 'คุณปราณี ใจงาม', service: 'นวดตัว', staffName: 'David Martinez', revenue: 1500, status: 'completed', customerType: 'new' },
  { id: '10', date: '2024-01-19', customerName: 'คุณสุชาติ มีสุข', service: 'ตัดผม', staffName: 'Sarah Johnson', revenue: 800, status: 'completed', customerType: 'returning' },
  { id: '11', date: '2024-01-19', customerName: 'คุณวันดี สวัสดี', service: 'ดูแลผิวหน้า', staffName: 'Lisa Anderson', revenue: 1200, status: 'cancelled', customerType: 'new' },
  { id: '12', date: '2024-01-20', customerName: 'คุณพรชัย รุ่งเรือง', service: 'ทำเล็บมือ', staffName: 'Emma Williams', revenue: 500, status: 'completed', customerType: 'returning' },
]

export const generateReportSummary = (data: ReportDataRow[]): ReportSummary => {
  const completedData = data.filter(d => d.status === 'completed')
  const totalRevenue = completedData.reduce((sum, d) => sum + d.revenue, 0)
  const uniqueCustomers = new Set(data.map(d => d.customerName)).size
  
  const serviceCounts: Record<string, number> = {}
  const staffCounts: Record<string, number> = {}
  
  completedData.forEach(d => {
    serviceCounts[d.service] = (serviceCounts[d.service] || 0) + 1
    staffCounts[d.staffName] = (staffCounts[d.staffName] || 0) + 1
  })
  
  const topService = Object.entries(serviceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-'
  const topStaff = Object.entries(staffCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-'
  
  return {
    totalRecords: data.length,
    totalRevenue,
    totalCustomers: uniqueCustomers,
    totalBookings: completedData.length,
    averageRevenue: completedData.length > 0 ? totalRevenue / completedData.length : 0,
    topService,
    topStaff,
  }
}

export const generateRevenueChartData = (data: ReportDataRow[]): ChartData[] => {
  const revenueByDate: Record<string, number> = {}
  
  data.filter(d => d.status === 'completed').forEach(d => {
    revenueByDate[d.date] = (revenueByDate[d.date] || 0) + d.revenue
  })
  
  return Object.entries(revenueByDate).map(([date, value]) => ({
    label: new Date(date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
    value,
    color: '#172E4E',
  }))
}

export const generateServiceChartData = (data: ReportDataRow[]): ChartData[] => {
  const serviceRevenue: Record<string, number> = {}
  const colors = ['#172E4E', '#58769C', '#D6B99B', '#C97064', '#7B92B3', '#D3C3B3']
  
  data.filter(d => d.status === 'completed').forEach(d => {
    serviceRevenue[d.service] = (serviceRevenue[d.service] || 0) + d.revenue
  })
  
  return Object.entries(serviceRevenue).map(([service, value], index) => ({
    label: service,
    value,
    color: colors[index % colors.length],
  }))
}

export const generateStaffChartData = (data: ReportDataRow[]): ChartData[] => {
  const staffRevenue: Record<string, number> = {}
  const colors = ['#172E4E', '#58769C', '#D6B99B', '#C97064', '#7B92B3']
  
  data.filter(d => d.status === 'completed').forEach(d => {
    staffRevenue[d.staffName] = (staffRevenue[d.staffName] || 0) + d.revenue
  })
  
  return Object.entries(staffRevenue).map(([staff, value], index) => ({
    label: staff,
    value,
    color: colors[index % colors.length],
  }))
}

export const defaultPresets: ReportPreset[] = [
  {
    id: 'monthly',
    name: 'รายงานเดือนนี้',
    filters: {
      reportType: 'revenue',
      staffId: 'all',
      groupBy: 'day',
      dateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
      dateTo: new Date().toISOString().split('T')[0],
      exportFormat: 'xlsx',
      customerType: 'all',
      popularServiceOnly: false,
    },
    createdAt: '2024-01-01',
  },
  {
    id: 'staff-performance',
    name: 'รายงานพนักงาน',
    filters: {
      reportType: 'staff',
      staffId: 'all',
      groupBy: 'staff',
      dateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
      dateTo: new Date().toISOString().split('T')[0],
      exportFormat: 'xlsx',
      customerType: 'all',
      popularServiceOnly: false,
    },
    createdAt: '2024-01-01',
  },
  {
    id: 'no-show',
    name: 'รายงานไม่มาตามนัด',
    filters: {
      reportType: 'no-show',
      staffId: 'all',
      groupBy: 'day',
      dateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
      dateTo: new Date().toISOString().split('T')[0],
      exportFormat: 'xlsx',
      customerType: 'all',
      popularServiceOnly: false,
    },
    createdAt: '2024-01-01',
  },
  {
    id: 'new-customers',
    name: 'รายงานลูกค้าใหม่',
    filters: {
      reportType: 'customer',
      staffId: 'all',
      groupBy: 'day',
      dateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
      dateTo: new Date().toISOString().split('T')[0],
      exportFormat: 'xlsx',
      customerType: 'new',
      popularServiceOnly: false,
    },
    createdAt: '2024-01-01',
  },
]

export const reportTypeLabels: Record<string, string> = {
  booking: 'รายงานการจอง',
  revenue: 'รายงานรายได้',
  staff: 'รายงานพนักงาน',
  service: 'รายงานบริการ',
  customer: 'รายงานลูกค้า',
  'no-show': 'รายงานไม่มาตามนัด',
}

export const groupByLabels: Record<string, string> = {
  day: 'รายวัน',
  week: 'รายสัปดาห์',
  month: 'รายเดือน',
  staff: 'ตามพนักงาน',
  service: 'ตามบริการ',
}
