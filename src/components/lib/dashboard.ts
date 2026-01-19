export interface DashboardStats {
  todayAppointments: number
  todayCustomers: number
  todayRevenue: number
  pendingConfirmations: number
}

export interface StaffAvailability {
  id: string
  name: string
  avatar?: string
  status: 'available' | 'busy' | 'break' | 'off'
  currentService?: string
  nextAvailable?: string
}

export interface ChartData {
  label: string
  value: number
}

export interface RevenueData {
  date: string
  revenue: number
}

export interface CustomerData {
  date: string
  customers: number
}
