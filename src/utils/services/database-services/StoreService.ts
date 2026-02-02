import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

export const StoreRuleService = {
  // 1. ตรวจสอบวันหยุด (Holiday Model)
  async checkIsHoliday(storeId: string, date: Date) {
    const targetDate = dayjs(date).startOf('day').toDate();
    const holiday = await prisma.holiday.findFirst({
      where: {
        storeId,
        date: targetDate,
        // isDelete: false // ถ้ามี field นี้ในอนาคต
      }
    });
    return !!holiday;
  },

  // 2. ตรวจสอบเวลาเปิด-ปิด (DefaultOperatingHour Model)
  // ใช้ dynamic access สำหรับ field เช่น MON_isOpen, MON_openTime
  async getStoreTiming(storeId: string, day: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN") {
    const hours = await prisma.defaultOperatingHour.findUnique({
      where: { storeId }
    });
    if (!hours) return null;

    return {
      isOpen: hours[`${day}_isOpen` as keyof typeof hours],
      openTime: hours[`${day}_openTime` as keyof typeof hours],
      closeTime: hours[`${day}_closeTime` as keyof typeof hours],
    };
  },

  // 3. ตรวจสอบเงื่อนไขการจองและการยกเลิก (แปลงเป็นนาที)
  async getBookingRules(storeId: string) {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
      select: { bookingRule: true, cancelRule: true, employeeSetting: true }
    });
    if (!store) return null;

    return {
      // การจอง
      minAdvanceMinutes: store.bookingRule.minAdvanceBookingHours * 60,
      maxAdvanceMinutes: store.bookingRule.maxAdvanceBookingDays * 24 * 60,
      maxQueuePerPhone: store.bookingRule.maxQueuePerPhone,
      
      // การยกเลิก
      allowCancel: store.cancelRule.allowCustomerCancel,
      minCancelMinutes: store.cancelRule.minCancelBeforeHours * 60,

      // พนักงาน
      staffSelection: store.employeeSetting, // { allowCustomerSelectEmployee, autoAssignEmployee, maxQueuePerEmployeePerDay }
    };
  }
};