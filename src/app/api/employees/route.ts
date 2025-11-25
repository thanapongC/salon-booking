import { NextResponse } from 'next/server';
import { Employee } from '@/interfaces/Store';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


/**
 * POST /api/employees
 * สำหรับเพิ่มข้อมูลพนักงานใหม่ โดยดึง storeId จาก Session
 */
export async function POST(request: Request) {
  try {
    // 1. ตรวจสอบสิทธิ์และดึง User ID
    // const currentUserId = await getCurrentUserId(request);
    
    // 2. ดึงข้อมูลจาก Body
    const data: Employee = await request.json();
    const { 
      name, 
      role, 
      isActive = true, // กำหนด default เป็น true
      userId, 
      serviceIds = []
    } = data;

    console.log(userId)


    // 3. ค้นหา Store ID ที่ผูกกับ User ID นี้
    const store = await prisma.store.findUnique({
        where: { 
            userId: userId 
        },
        select: { id: true }
    });

    if (!store) {
        // หากไม่พบ Store ที่ผูกกับ User
        return new NextResponse(
            JSON.stringify({
                message: 'ไม่พบร้านค้าที่ผูกกับบัญชีผู้ใช้งานนี้ หรือผู้ใช้ไม่มีสิทธิ์',
            }),
            { status: 403 }
        );
    }
    
    const storeId = store.id;
    
    // --- 4. การตรวจสอบความถูกต้องของข้อมูล (Validation) ---

    if (!name || name.trim() === '') {
        return new NextResponse(
            JSON.stringify({
                message: 'กรุณาระบุชื่อพนักงาน',
            }),
            { status: 400 }
        );
    }
    
    if (!role || role.trim() === '') {
        return new NextResponse(
            JSON.stringify({
                message: 'กรุณาระบุบทบาท/ตำแหน่งของพนักงาน',
            }),
            { status: 400 }
        );
    }


    // --- 5. การสร้าง Employee ในฐานข้อมูล ---
    
    // เตรียมข้อมูลการเชื่อมโยง Service
    const serviceConnects = serviceIds.map(id => ({ id }));
    
    const newEmployee = await prisma.employee.create({
      data: {
        name: name,
        role: role,
        isActive: isActive,
        storeId: storeId, // ใช้ Store ID ที่ดึงมาจาก DB/Session
        userId: userId, // ผูกกับ User ID หากมีการส่งมา
        
        // เชื่อมโยง Service ที่พนักงานคนนี้ทำได้ทันที
        // services: {
        //     connect: serviceConnects,
        // },
      },
    //   include: {
    //       services: {
    //           select: { id: true, name: true } // ดึงชื่อบริการที่ทำได้มาด้วย
    //       },
    //   }
    });

    // --- 6. ตอบกลับสำเร็จ (201 Created) ---
    return new NextResponse(
        JSON.stringify({ 
            message: 'เพิ่มข้อมูลพนักงานใหม่สำเร็จแล้ว',
            employee: newEmployee
        }),
        { 
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        }
    );

  } catch (error) {
    console.error('Error creating new employee:', error);
    
    // จัดการ Unauthorized Error 
    if (error instanceof Error && error.message === 'Unauthorized') {
         return new NextResponse(
             JSON.stringify({ message: 'ไม่ได้รับอนุญาต กรุณาเข้าสู่ระบบ' }),
             { status: 401 }
         );
    }
    
    // 7. ตอบกลับเมื่อเกิดข้อผิดพลาดอื่น (500 Internal Server Error)
    return new NextResponse(
        JSON.stringify({ 
            message: 'เกิดข้อผิดพลาดของเซิร์ฟเวอร์ในการเพิ่มพนักงาน' 
        }),
        { status: 500 }
    );
  }
}