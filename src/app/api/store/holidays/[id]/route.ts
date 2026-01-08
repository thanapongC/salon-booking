import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client"; // นำเข้า Prisma Client
import { Store } from '@/interfaces/Store';
import { getCurrentUserAndStoreIdsByToken } from '@/utils/lib/auth';

const prisma = new PrismaClient();

// [GET] ดึงข้อมูลรายรายการ
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { storeId } = await getCurrentUserAndStoreIdsByToken(request);

    const holiday = await prisma.holiday.findFirst({
      where: {
        id: params.id,
        storeId: storeId, // ตรวจสอบสิทธิ์ร้านค้า
      },
    });

    if (!holiday) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(holiday);
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

// [PATCH] อัปเดตข้อมูล
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { storeId } = await getCurrentUserAndStoreIdsByToken(request);
    const body = await request.json();

    // ตรวจสอบว่าเป็นเจ้าของข้อมูลก่อนอัปเดต
    const existing = await prisma.holiday.findFirst({
      where: { id: params.id, storeId }
    });

    if (!existing) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

    const updated = await prisma.holiday.update({
      where: { id: params.id },
      data: {
        date: body.date ? new Date(body.date) : undefined,
        holidayName: body.holidayName,
        holidayType: body.holidayType,
        fullDay: body.fullDay,
        startTime: body.startTime ? new Date(body.startTime) : (body.fullDay ? null : undefined),
        endTime: body.endTime ? new Date(body.endTime) : (body.fullDay ? null : undefined),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}

// [DELETE] ลบข้อมูล
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { storeId } = await getCurrentUserAndStoreIdsByToken(request);

    // ตรวจสอบสิทธิ์
    const existing = await prisma.holiday.findFirst({
      where: { id: params.id, storeId }
    });

    if (!existing) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

    await prisma.holiday.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}