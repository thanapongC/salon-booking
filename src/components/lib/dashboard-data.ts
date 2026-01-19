import { CustomerData, DashboardStats, RevenueData, StaffAvailability } from "./dashboard"


export const mockDashboardStats: DashboardStats = {
  todayAppointments: 12,
  todayCustomers: 10,
  todayRevenue: 15800,
  pendingConfirmations: 3,
}

export const mockStaffAvailability: StaffAvailability[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    status: "busy",
    currentService: "Haircut",
    nextAvailable: "10:45",
  },
  {
    id: "2",
    name: "Michael Chen",
    status: "busy",
    currentService: "Hair Coloring",
    nextAvailable: "13:00",
  },
  {
    id: "3",
    name: "Emma Williams",
    status: "available",
  },
  {
    id: "4",
    name: "David Martinez",
    status: "break",
    nextAvailable: "14:00",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    status: "available",
  },
]

export const mockRevenueData: RevenueData[] = [
  { date: "จ.", revenue: 12500 },
  { date: "อ.", revenue: 18200 },
  { date: "พ.", revenue: 15800 },
  { date: "พฤ.", revenue: 21300 },
  { date: "ศ.", revenue: 25600 },
  { date: "ส.", revenue: 32100 },
  { date: "อา.", revenue: 28400 },
]

export const mockCustomerData: CustomerData[] = [
  { date: "จ.", customers: 8 },
  { date: "อ.", customers: 12 },
  { date: "พ.", customers: 10 },
  { date: "พฤ.", customers: 15 },
  { date: "ศ.", customers: 18 },
  { date: "ส.", customers: 22 },
  { date: "อา.", customers: 19 },
]

export const getStaffStatusColor = (status: StaffAvailability['status']) => {
  switch (status) {
    case 'available':
      return '#4CAF50'
    case 'busy':
      return '#C97064'
    case 'break':
      return '#D6B99B'
    case 'off':
      return '#D3C3B3'
    default:
      return '#D3C3B3'
  }
}

export const getStaffStatusLabel = (status: StaffAvailability['status']) => {
  switch (status) {
    case 'available':
      return 'ว่าง'
    case 'busy':
      return 'ไม่ว่าง'
    case 'break':
      return 'พักเบรก'
    case 'off':
      return 'หยุด'
    default:
      return status
  }
}
