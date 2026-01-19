export type ReportType = 'booking' | 'revenue' | 'staff' | 'service' | 'customer' | 'no-show'
export type GroupBy = 'day' | 'week' | 'month' | 'staff' | 'service'
export type ExportFormat = 'csv' | 'xlsx' | 'pdf'
export type CustomerType = 'all' | 'new' | 'returning'

export interface ReportFilters {
  reportType: ReportType
  staffId: string
  groupBy: GroupBy
  dateFrom: string
  dateTo: string
  exportFormat: ExportFormat
  customerType: CustomerType
  popularServiceOnly: boolean
}

export interface ReportPreset {
  id: string
  name: string
  filters: ReportFilters
  createdAt: string
}

export interface ReportSummary {
  totalRecords: number
  totalRevenue: number
  totalCustomers: number
  totalBookings: number
  averageRevenue: number
  topService: string
  topStaff: string
}

export interface ReportDataRow {
  id: string
  date: string
  customerName: string
  service: string
  staffName: string
  revenue: number
  status: string
  customerType: 'new' | 'returning'
}

export interface ChartData {
  label: string
  value: number
  color?: string
}
