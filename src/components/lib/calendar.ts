export interface Appointment {
  id: string
  customerName: string
  customerPhone: string
  customerEmail: string
  serviceName: string
  serviceColor: string
  staffId: string
  staffName: string
  date: string
  startTime: string
  endTime: string
  duration: number
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed'
  notes?: string
}

export interface CalendarViewMode {
  mode: 'day' | 'week'
}

export interface TimeSlot {
  time: string
  hour: number
  minute: number
}
