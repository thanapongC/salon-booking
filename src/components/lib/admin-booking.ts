"use client";

export interface Service {
  id: string;
  name: string;
  duration: number; // minutes
  price: number;
  category: string;
}

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  avatar?: string;
  serviceIds: string[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export type BookingChannel = "walk-in" | "phone" | "line" | "facebook" | "website" | "other";

export interface BookingFormData {
  channel: BookingChannel;
  serviceId: string;
  date: Date | null;
  time: string;
  staffId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
}

export const BOOKING_CHANNELS: { value: BookingChannel; label: string; icon: string }[] = [
  { value: "walk-in", label: "Walk-in", icon: "DirectionsWalk" },
  { value: "phone", label: "โทรศัพท์", icon: "Phone" },
  { value: "line", label: "LINE", icon: "Chat" },
  { value: "facebook", label: "Facebook", icon: "Facebook" },
  { value: "website", label: "เว็บไซต์", icon: "Language" },
  { value: "other", label: "อื่นๆ", icon: "MoreHoriz" },
];

// Mock services data
export const mockServices: Service[] = [
  { id: "s1", name: "นวดแผนไทย", duration: 60, price: 500, category: "นวด" },
  { id: "s2", name: "นวดน้ำมันอโรมา", duration: 90, price: 800, category: "นวด" },
  { id: "s3", name: "นวดฝ่าเท้า", duration: 45, price: 350, category: "นวด" },
  { id: "s4", name: "สปาหน้า", duration: 60, price: 700, category: "สปา" },
  { id: "s5", name: "ขัดผิว + อบสมุนไพร", duration: 90, price: 900, category: "สปา" },
  { id: "s6", name: "แพ็คเกจ VIP Full Body", duration: 180, price: 2500, category: "แพ็คเกจ" },
  { id: "s7", name: "ทำเล็บเจล", duration: 60, price: 450, category: "เล็บ" },
  { id: "s8", name: "ทำเล็บธรรมดา", duration: 30, price: 200, category: "เล็บ" },
];

// Mock staff data
export const mockStaff: Staff[] = [
  { id: "st1", firstName: "มะลิ", lastName: "หอมกลิ่น", nickname: "ลิ", serviceIds: ["s1", "s2", "s3", "s4", "s5", "s6"] },
  { id: "st2", firstName: "สมชาย", lastName: "แข็งแรง", nickname: "ชาย", serviceIds: ["s1", "s2", "s3"] },
  { id: "st3", firstName: "จันทร์", lastName: "สว่าง", nickname: "จัน", serviceIds: ["s4", "s5", "s6"] },
  { id: "st4", firstName: "ดาว", lastName: "ประกาย", nickname: "ดาว", serviceIds: ["s7", "s8"] },
  { id: "st5", firstName: "เดือน", lastName: "เพ็ญ", serviceIds: ["s1", "s2", "s7", "s8"] },
];

// Generate time slots
export const generateTimeSlots = (startHour: number = 9, endHour: number = 20): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push({ time: `${hour.toString().padStart(2, "0")}:00`, available: Math.random() > 0.3 });
    slots.push({ time: `${hour.toString().padStart(2, "0")}:30`, available: Math.random() > 0.3 });
  }
  return slots;
};

export const defaultBookingFormData: BookingFormData = {
  channel: "walk-in",
  serviceId: "",
  date: null,
  time: "",
  staffId: "",
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  notes: "",
};
