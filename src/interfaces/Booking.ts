import { BookingStatus } from "@prisma/client";
import { Employee, Service, Store } from "./Store";
import { Customer } from "./User";

export interface Booking {
  id: string;

  customerName: string;
  customerPhone: string;

  startTime: string; // ใช้ string เพราะจาก API มักส่ง ISO Date เช่น "2025-10-14T10:00:00Z"
  endTime: string;

  status: BookingStatus;
  isWalkIn: boolean;

  storeId: string;
  store?: Store;

  serviceId: string;
  service?: Service;

  employeeId: string;
  employee?: Employee;

  customerId: string;
  customer?: Customer;

  notifications?: Notification[];

  createdAt: string;
  updatedAt: string;
}

export const initialBooking: Booking = {
  id: '',
  customerName: '',
  customerPhone: '',
  // กำหนดค่าเริ่มต้นเป็นเวลาปัจจุบัน (หรือเวลาที่คุณต้องการให้ฟอร์มเริ่มต้น)
  startTime: new Date().toISOString(),
  // endTime สามารถคำนวณจาก startTime + duration ของ service
  endTime: new Date(new Date().getTime() + 30 * 60000).toISOString(), // ตัวอย่าง: +30 นาที
  status: 'PENDING' as BookingStatus, // กำหนดสถานะเริ่มต้น
  isWalkIn: false,
  storeId: '',
  store: undefined,
  serviceId: '',
  service: undefined,
  employeeId: '',
  employee: undefined,
  customerId: '',
  customer: undefined,
  notifications: undefined,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};