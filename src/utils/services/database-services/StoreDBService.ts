import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// ฟังก์ชัน Helper เพื่อค้นหา Store ID และป้องกันการเข้าถึงที่ไม่ได้รับอนุญาต
export async function getStoreByCurrentUserId(userId: string, storeId: string, timeOnly: boolean = false) {

    if (!storeId || storeId.trim() === '') {
        // API นี้ต้องรู้ว่าบริการนี้เป็นของร้านไหน
        return new NextResponse(
            JSON.stringify({
                message: 'ไม่พบ Store ID ที่จำเป็นในการสร้างบริการ',
            }),
            { status: 400 })
    }

    let store;

    if (!timeOnly) {
        store = await prisma.store.findUnique({
            where: { id: storeId },
            select: {
                id: true,
                storeName: true,
                storeUsername: true,
                lineOALink: true,
                lineNotifyToken: true,
                lineChannelId: true,
                lineChannelSecret: true,
                newBooking: true,
                successBooking: true,
                cancelBooking: true,
                before24H: true,
                reSchedule: true,
            }
        });
    } else {
        store = await prisma.store.findUnique({
            where: { id: storeId },
            select: {
                id: true,
                operatingHours: true
            }
        });
    }


    if (!store) {
        throw new Error('Store Not Found or Unauthorized');
    }
    return store;
}
