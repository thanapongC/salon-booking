export interface ServiceHistory {
  id: string;
  date: Date;
  serviceName: string;
  staffName: string;
  price: number;
  duration: number;
  status: "completed" | "cancelled" | "no-show";
  notes?: string;
}

export interface CustomerData {
  id: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  phone: string;
  lineId?: string;
  email?: string;
  avatar?: string;
  createdAt: Date;
  lastVisit?: Date;
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  noShowCount: number;
  totalSpent: number;
  isRegular: boolean;
  isBlacklisted: boolean;
  blacklistReason?: string;
  notes?: string;
  serviceHistory: ServiceHistory[];
}

export type CustomerType = "all" | "regular" | "new" | "blacklisted";

export const CUSTOMER_TYPES: { value: CustomerType; label: string }[] = [
  { value: "all", label: "ทั้งหมด" },
  { value: "regular", label: "ลูกค้าประจำ" },
  { value: "new", label: "ลูกค้าใหม่" },
  { value: "blacklisted", label: "Blacklist" },
];

// Mock data for demonstration
export const mockCustomers: CustomerData[] = [
  {
    id: "1",
    firstName: "สมศรี",
    lastName: "ใจดี",
    nickname: "ศรี",
    phone: "081-234-5678",
    lineId: "somsri_j",
    email: "somsri@email.com",
    createdAt: new Date("2023-01-15"),
    lastVisit: new Date("2024-01-10"),
    totalBookings: 45,
    completedBookings: 42,
    cancelledBookings: 2,
    noShowCount: 1,
    totalSpent: 67500,
    isRegular: true,
    isBlacklisted: false,
    notes: "ชอบนวดน้ำมัน แพ้น้ำมันลาเวนเดอร์",
    serviceHistory: [
      {
        id: "h1",
        date: new Date("2024-01-10"),
        serviceName: "นวดน้ำมันอโรมา",
        staffName: "คุณมะลิ",
        price: 1500,
        duration: 90,
        status: "completed",
      },
      {
        id: "h2",
        date: new Date("2023-12-28"),
        serviceName: "สปาหน้า",
        staffName: "คุณจันทร์",
        price: 1200,
        duration: 60,
        status: "completed",
      },
      {
        id: "h3",
        date: new Date("2023-12-15"),
        serviceName: "นวดน้ำมันอโรมา",
        staffName: "คุณมะลิ",
        price: 1500,
        duration: 90,
        status: "cancelled",
        notes: "ติดธุระด่วน",
      },
    ],
  },
  {
    id: "2",
    firstName: "วิชัย",
    lastName: "มั่งมี",
    phone: "089-876-5432",
    lineId: "wichai_m",
    createdAt: new Date("2024-01-05"),
    lastVisit: new Date("2024-01-08"),
    totalBookings: 2,
    completedBookings: 2,
    cancelledBookings: 0,
    noShowCount: 0,
    totalSpent: 2400,
    isRegular: false,
    isBlacklisted: false,
    serviceHistory: [
      {
        id: "h4",
        date: new Date("2024-01-08"),
        serviceName: "นวดแผนไทย",
        staffName: "คุณสมชาย",
        price: 1200,
        duration: 60,
        status: "completed",
      },
      {
        id: "h5",
        date: new Date("2024-01-05"),
        serviceName: "นวดแผนไทย",
        staffName: "คุณสมชาย",
        price: 1200,
        duration: 60,
        status: "completed",
      },
    ],
  },
  {
    id: "3",
    firstName: "นภา",
    lastName: "สวยงาม",
    nickname: "นา",
    phone: "062-111-2222",
    createdAt: new Date("2023-06-20"),
    lastVisit: new Date("2023-11-15"),
    totalBookings: 8,
    completedBookings: 3,
    cancelledBookings: 2,
    noShowCount: 3,
    totalSpent: 4500,
    isRegular: false,
    isBlacklisted: true,
    blacklistReason: "No-show หลายครั้ง ไม่สามารถติดต่อได้",
    serviceHistory: [
      {
        id: "h6",
        date: new Date("2023-11-15"),
        serviceName: "นวดน้ำมันอโรมา",
        staffName: "คุณมะลิ",
        price: 1500,
        duration: 90,
        status: "no-show",
      },
      {
        id: "h7",
        date: new Date("2023-10-20"),
        serviceName: "สปาหน้า",
        staffName: "คุณจันทร์",
        price: 1200,
        duration: 60,
        status: "no-show",
      },
    ],
  },
  {
    id: "4",
    firstName: "ประภา",
    lastName: "รุ่งเรือง",
    nickname: "ปุ้ย",
    phone: "095-333-4444",
    lineId: "prapa_pui",
    email: "prapa@company.com",
    createdAt: new Date("2022-08-10"),
    lastVisit: new Date("2024-01-12"),
    totalBookings: 78,
    completedBookings: 75,
    cancelledBookings: 3,
    noShowCount: 0,
    totalSpent: 156000,
    isRegular: true,
    isBlacklisted: false,
    notes: "VIP ลูกค้าประจำ ชอบห้อง VIP",
    serviceHistory: [
      {
        id: "h8",
        date: new Date("2024-01-12"),
        serviceName: "แพ็คเกจ VIP Full Body",
        staffName: "คุณมะลิ",
        price: 3500,
        duration: 180,
        status: "completed",
      },
    ],
  },
  {
    id: "5",
    firstName: "ธนา",
    lastName: "พัฒนา",
    phone: "088-555-6666",
    createdAt: new Date("2024-01-14"),
    totalBookings: 1,
    completedBookings: 0,
    cancelledBookings: 0,
    noShowCount: 0,
    totalSpent: 0,
    isRegular: false,
    isBlacklisted: false,
    serviceHistory: [],
  },
];
