export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show'
export type BookingChannel = 'online' | 'walk-in' | 'phone' | 'line'
export type ServiceType = 'with-staff' | 'without-staff'

export interface BookingRecord {
  id: string
  customerName: string
  customerPhone: string
  customerEmail: string
  service: string
  serviceType: ServiceType
  serviceColor: string
  staffId: string
  staffName: string
  date: string
  time: string
  endTime: string
  duration: number
  price: number
  status: BookingStatus
  notes?: string
  channel: BookingChannel
  createdAt: string
  updatedAt: string
  updatedBy: string
}

export interface BookingFilters {
  search: string
  status: BookingStatus | 'all'
  channel: BookingChannel | 'all'
  dateFrom: string
  dateTo: string
  staffId: string
}
