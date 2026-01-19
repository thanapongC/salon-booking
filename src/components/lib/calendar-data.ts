import { Appointment } from "./calendar"


// Mock appointments data
export const mockAppointments: Appointment[] = [
  {
    id: "1",
    customerName: "Jane Smith",
    customerPhone: "081-234-5678",
    customerEmail: "jane@email.com",
    serviceName: "Haircut",
    serviceColor: "#D6B99B",
    staffId: "1",
    staffName: "Sarah Johnson",
    date: new Date().toISOString().split('T')[0],
    startTime: "10:00",
    endTime: "10:45",
    duration: 45,
    status: "confirmed",
  },
  {
    id: "2",
    customerName: "John Doe",
    customerPhone: "082-345-6789",
    customerEmail: "john@email.com",
    serviceName: "Hair Coloring",
    serviceColor: "#58769C",
    staffId: "2",
    staffName: "Michael Chen",
    date: new Date().toISOString().split('T')[0],
    startTime: "11:00",
    endTime: "13:00",
    duration: 120,
    status: "confirmed",
  },
  {
    id: "3",
    customerName: "Alice Brown",
    customerPhone: "083-456-7890",
    customerEmail: "alice@email.com",
    serviceName: "Manicure",
    serviceColor: "#C97064",
    staffId: "3",
    staffName: "Emma Williams",
    date: new Date().toISOString().split('T')[0],
    startTime: "14:00",
    endTime: "14:30",
    duration: 30,
    status: "pending",
  },
  {
    id: "4",
    customerName: "Bob Wilson",
    customerPhone: "084-567-8901",
    customerEmail: "bob@email.com",
    serviceName: "Massage",
    serviceColor: "#7B92B3",
    staffId: "4",
    staffName: "David Martinez",
    date: new Date().toISOString().split('T')[0],
    startTime: "15:00",
    endTime: "16:30",
    duration: 90,
    status: "confirmed",
  },
  {
    id: "5",
    customerName: "Carol Davis",
    customerPhone: "085-678-9012",
    customerEmail: "carol@email.com",
    serviceName: "Facial Treatment",
    serviceColor: "#D6B99B",
    staffId: "5",
    staffName: "Lisa Anderson",
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    startTime: "10:30",
    endTime: "11:30",
    duration: 60,
    status: "confirmed",
  },
  {
    id: "6",
    customerName: "David Lee",
    customerPhone: "086-789-0123",
    customerEmail: "david@email.com",
    serviceName: "Pedicure",
    serviceColor: "#58769C",
    staffId: "3",
    staffName: "Emma Williams",
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    startTime: "13:00",
    endTime: "13:45",
    duration: 45,
    status: "pending",
  },
]

export const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
]

export const getStatusColor = (status: Appointment['status']) => {
  switch (status) {
    case 'confirmed':
      return '#58769C'
    case 'pending':
      return '#D6B99B'
    case 'cancelled':
      return '#C97064'
    case 'completed':
      return '#7B92B3'
    default:
      return '#D3C3B3'
  }
}

export const getStatusLabel = (status: Appointment['status']) => {
  switch (status) {
    case 'confirmed':
      return 'ยืนยันแล้ว'
    case 'pending':
      return 'รอยืนยัน'
    case 'cancelled':
      return 'ยกเลิก'
    case 'completed':
      return 'เสร็จสิ้น'
    default:
      return status
  }
}
