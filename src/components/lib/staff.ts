export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type StaffRole = 'admin' | 'manager' | 'staff' | 'receptionist';

export interface WorkingHours {
  start: string;
  end: string;
}



export interface StaffFormData {
  id?: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  phone: string;
  password: string;
  email?: string;
  avatar?: string;
  role: StaffRole;
  workingDays: DayOfWeek[];
  workingHours: WorkingHours;
  serviceIds: string[];
  // blockedTimes: BlockedTime[];
  isActive: boolean;
  notes?: string;
  hireDate?: Date | null;
}

export interface StaffListItem {
  id: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  phone: string;
  email?: string;
  avatar?: string;
  role: StaffRole;
  workingDays: DayOfWeek[];
  workingHours: WorkingHours;
  serviceIds: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const DAYS_OF_WEEK: { value: DayOfWeek; label: string; shortLabel: string }[] = [
  { value: 'monday', label: 'วันจันทร์', shortLabel: 'จ.' },
  { value: 'tuesday', label: 'วันอังคาร', shortLabel: 'อ.' },
  { value: 'wednesday', label: 'วันพุธ', shortLabel: 'พ.' },
  { value: 'thursday', label: 'วันพฤหัสบดี', shortLabel: 'พฤ.' },
  { value: 'friday', label: 'วันศุกร์', shortLabel: 'ศ.' },
  { value: 'saturday', label: 'วันเสาร์', shortLabel: 'ส.' },
  { value: 'sunday', label: 'วันอาทิตย์', shortLabel: 'อา.' },
];

export const STAFF_ROLES: { value: StaffRole; label: string; description: string }[] = [
  { value: 'admin', label: 'ผู้ดูแลระบบ', description: 'เข้าถึงทุกฟังก์ชัน รวมถึงการตั้งค่าระบบ' },
  { value: 'manager', label: 'ผู้จัดการ', description: 'จัดการพนักงาน, ดูรายงาน, จัดการการจอง' },
  { value: 'staff', label: 'พนักงานบริการ', description: 'รับการจอง, ดูตารางงานของตัวเอง' },
  { value: 'receptionist', label: 'พนักงานต้อนรับ', description: 'จัดการการจอง, รับลูกค้า' },
];
