import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, RoleName, UserStatus } from "@prisma/client";
import crypto from "crypto";
import { User } from "@/interfaces/User";
// import { TokenService } from '@/utils/services/TokenService';
// import { sendEmail } from '@/utils/services/EmailServices';
import { PasswordService } from "@/utils/services/PasswordServices";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

import bcrypt from "bcryptjs";
import { StoreRegister } from "@/interfaces/Store";
import { sendVerificationEmail } from "@/utils/services/EmailServices";

// กำหนดค่า SALT_ROUNDS สำหรับการเข้ารหัส
const SALT_ROUNDS = 10;

/**
 * POST /api/shop/register
 * สำหรับจัดการการสมัครสมาชิกร้านค้า
 */
export async function POST(request: Request) {
  try {
    const data: StoreRegister = await request.json();
    const {
      storeName,
      storeUsername,
      email,
      password,
      confirmPassword,
      termsAccepted,
    } = data;

    // --- 1. การตรวจสอบความถูกต้องของข้อมูล (Validation) ---

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Password และ Confirm Password ไม่ตรงกัน" },
        { status: 400 }
      );
    }

    if (!termsAccepted) {
      return NextResponse.json(
        { message: "คุณต้องยอมรับข้อตกลงและเงื่อนไข" },
        { status: 400 }
      );
    }

    // ตรวจสอบความซ้ำซ้อนของ Email - Store Username

    const [existingUser, existingStore] = await Promise.all([
      prisma.user.findUnique({ where: { email } }),
      prisma.store.findUnique({ where: { storeUsername } }),
    ]);

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({
          message: "Email นี้ถูกใช้ในการลงทะเบียนแล้ว",
        }),
        { status: 409 }
      );
    }

    if (existingStore) {
      return new NextResponse(
        JSON.stringify({
          message: "ชื่อผู้ใช้งานร้านค้านี้ (Store Username) ถูกใช้แล้ว",
        }),
        { status: 409 }
      );
    }

    // --- 2. เตรียมข้อมูล ---

    // 2.1 ค้นหาหรือสร้าง Role สำหรับผู้ดูแลร้านค้า (STOREADMIN)
    let storeAdminRole = await prisma.role.findUnique({
      where: { name: "STOREADMIN" },
    });

    if (!storeAdminRole) {
      storeAdminRole = await prisma.role.create({
        data: {
          name: "STOREADMIN",
          description: "Role สำหรับผู้ดูแลร้านค้า",
        },
      });
    }

    // 2.2 เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // 2.3 สร้าง Verification Token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    // กำหนดเวลาหมดอายุ (เช่น 24 ชั่วโมง)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // 2.3 กำหนด Line OA Link (ใช้ storeUsername เป็นพื้นฐานในการสร้าง link ชั่วคราว)
    const lineOALink = `https://line.me/R/ti/p/@${storeUsername.toLowerCase()}`;

    // --- 3. การสร้าง User และ Store ด้วย Transaction ---
    // ใช้ Transaction เพื่อให้แน่ใจว่าทั้ง 2 Model ถูกสร้างพร้อมกัน
    const result = await prisma.$transaction(async (tx) => {
      // 3.1 สร้าง User
      const newUser = await tx.user.create({
        data: {
          email: email,
          password: hashedPassword,
          userStatus: "ACTIVE",
          isEmailVerified: false, // <--- ตั้งค่าเริ่มต้นเป็น FALSE
          roleId: storeAdminRole?.roleId,
        },
      });

      // 3.2 สร้าง Store และผูกกับ User
      const newStore = await tx.store.create({
        data: {
          storeName: storeName,
          storeUsername: storeUsername,
          lineOALink: lineOALink,
          userId: newUser.userId,
          // สามารถกำหนดค่า default อื่นๆ ได้ตามต้องการ
        },
      });

      // 3.3 สร้าง Verification Token สำหรับผู้ใช้ใหม่
      const newVerificationToken = await tx.verificationToken.create({
        data: {
          userId: newUser.userId,
          token: verificationToken,
          purpose: "EMAIL_VERIFICATION", // <--- กำหนดวัตถุประสงค์
          expiresAt: expiresAt,
        },
      });

      return { newUser, newStore, newVerificationToken };
    });

    // --- 4. ส่งอีเมลยืนยัน (เรียกใช้ Service) ---
    try {
      await sendVerificationEmail(email, result.newVerificationToken.token);
    } catch (emailError) {
      // หากส่งอีเมลล้มเหลว ควรพิจารณา:
      // 1. ตอบกลับสำเร็จ แต่เตือนให้ผู้ใช้ขอลิงก์ใหม่
      // 2. หรือโยน Error 500
      console.error(
        "CRITICAL: Failed to send email after successful registration. Token:",
        result.newVerificationToken.token
      );
      // ในกรณีนี้ เลือกที่จะให้ผู้ใช้สมัครสำเร็จ แต่แจ้งเตือนการส่งอีเมล
      return NextResponse.json(
        {
          message:
            "สมัครสมาชิกสำเร็จ แต่การส่งอีเมลยืนยันล้มเหลว! กรุณาเข้าสู่ระบบและขอลิงก์ยืนยันใหม่ภายหลัง",
          userId: result.newUser.userId,
          storeId: result.newStore.id,
        },
        { status: 201 }
      );
    }

    // --- 4. ตอบกลับสำเร็จ ---
    return new NextResponse(
      JSON.stringify({
        message: "สมัครสมาชิกสำเร็จ! กรุณาตรวจสอบอีเมลของคุณเพื่อยืนยันบัญชี",
        userId: result.newUser.userId,
        storeId: result.newStore.id,
      }),
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error during registration:", error);

    // 5. ตอบกลับเมื่อเกิดข้อผิดพลาด
    return new NextResponse(JSON.stringify({ error }), { status: 500 });
  }
}

// export async function GET(req: NextRequest) {
//     try {
//         // ดึง query parameters เช่น userId
//         const { searchParams } = new URL(req.url);
//         const userId = searchParams.get('userId');

//         let users;

//         if (userId) {
//             // ค้นหา user ตาม ID
//             users = await prisma.user.findUnique({
//                 where: {
//                     userId,
//                 },
//                 select: {
//                     userId: true,
//                     email: true,
//                     name: true,
//                     department: true,
//                     position: true,
//                     image: true,
//                     manDay: true,
//                     phone: true,
//                     userStatus: true,
//                     address: true,
//                     role: true
//                 },
//             });

//             if (!users) {
//                 return new NextResponse(JSON.stringify('User not found'), { status: 404 });
//             }

//             return new NextResponse(JSON.stringify(users), { status: 200 });

//         } else {

//             const page = parseInt(searchParams.get('page') || '1', 10); // หน้าเริ่มต้นที่ 1
//             const pageSize = parseInt(searchParams.get('pageSize') || '10', 10); // จำนวนข้อมูลต่อหน้าเริ่มต้นที่ 10

//             // คำนวณ skip และ take
//             const skip = (page - 1) * pageSize;
//             const take = pageSize;

//             // ดึงข้อมูลจากฐานข้อมูล
//             const [users, totalItems] = await Promise.all([
//                 prisma.user.findMany({

//                     skip,
//                     take,
//                     orderBy: { createdAt: 'desc' }, // เรียงลำดับตามวันที่สร้าง
//                     select: {
//                         userId: true,
//                         email: true,
//                         name: true,
//                         department: true,
//                         position: true,
//                         image: true,
//                         manDay: true,
//                         phone: true,
//                         userStatus: true,
//                         address: true,
//                         role: true
//                     },

//                 }),
//                 prisma.user.count(), // นับจำนวนทั้งหมดของรายการ
//             ]);

//             // คำนวณค่าที่เกี่ยวข้องกับ pagination
//             const totalPages = Math.ceil(totalItems / pageSize);

//             // เพิ่ม rowIndex ในข้อมูลแต่ละแถว
//             const usersWithIndex = users.map((user, index) => ({
//                 ...user,
//                 rowIndex: skip + index + 1, // ลำดับแถวเริ่มต้นจาก 1 และเพิ่มตาม pagination
//             }));

//             return new NextResponse(
//                 JSON.stringify({
//                     data: usersWithIndex,
//                     pagination: {
//                         page,
//                         pageSize,
//                         totalItems,
//                         totalPages,
//                     },
//                 }),
//                 { status: 200 }
//             );
//         }

//     } catch (error) {
//         console.error('Error fetching users:', error);
//         return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
//     }
// }

// export async function POST(req: NextRequest) {

//     try {

//         const { email, password, name, department, position, phone, image, manDay, roleId, address, roleName } = await req.json() as User;
//         const _roleName = roleName as RoleName;

//         const _passwordService = new PasswordService();
//         let hash = null;

//         if (roleName !== RoleName.Employee) {

//             if (password) {
//                 hash = await _passwordService.hashPassword(password);
//             } else {
//                 return new NextResponse(JSON.stringify('Password is Not Defind'), { status: 400 });
//             }
//         }

//         // Validation
//         if (!email) {
//             return new NextResponse(JSON.stringify('Email is required'), { status: 400 });
//         } else {
//             //check name is exist
//             const emailIsAlready = await prisma.user.findFirst({ where: { email: { equals: email }, userStatus: UserStatus.Active } })

//             if (emailIsAlready) {
//                 return new NextResponse(JSON.stringify('Email is Already'), { status: 400 });
//             }
//         }

//         // let JWT_SECRET = process.env.JWT_SECRET || "OBjHLjEPKZAqSmnqNUZNkm9hTjmv4LJI"

//         // const tokenService = new TokenService(JWT_SECRET, "24h");

//         // Validation
//         if (!name) {
//             return new NextResponse(JSON.stringify('Email, Name is required'), { status: 400 });
//         }

//         const nameIsAlready = await prisma.user.findFirst({ where: { email: { equals: email }, userStatus: UserStatus.Active } })

//         if (nameIsAlready) {
//             return new NextResponse(JSON.stringify('Person is Already'), { status: 400 });
//         }

//         const _roleData = await prisma.role.findFirst({ where: { name: { equals: _roleName } } })

//         // Create a new User
//         const newUser = await prisma.user.create({
//             data: {
//                 email,
//                 name,
//                 password: hash,
//                 department,
//                 position,
//                 phone: phone ? phone : null,
//                 image,
//                 manDay: Number(manDay),
//                 userStatus: UserStatus.Active,
//                 address,
//                 roleId: _roleData?.roleId
//             },
//         });

//         // Make Reset Token
//         // console.log(roleId)

//         // const _role = await prisma.role.findFirst({ where: { name: { equals: RoleName.Employee } } })

//         // console.log(_role?.name)

//         // if (roleId !== _role?.name) {

//         //     console.log()
//         //     // Generate Token
//         //     let newToken = tokenService.generateToken({ id: newUser.userId, email: newUser.email });
//         //     //Create Token For Reset Password
//         //     const resetToken = await prisma.resetToken.create({
//         //         data: {
//         //             token: newToken,
//         //             userIds: newUser.userId
//         //         },
//         //     });

//         //     try {
//         //         await sendEmail(newUser.email, "Welcome to Our Platform!", "reset-password", { ConfirmationURL: resetToken.token });
//         //         return new NextResponse(JSON.stringify("Email sent successfull"), { status: 200 });
//         //     } catch (error: any) {
//         //         console.error("Error sending email:", error);
//         //         await prisma.user.delete({ where: { userId: newUser.userId } })
//         //         return new NextResponse(JSON.stringify("Failed to send email"), { status: 535 });
//         //     }
//         // } else {
//         //     return new NextResponse(JSON.stringify(newUser), { status: 201 });
//         // }

//         return new NextResponse(JSON.stringify(newUser), { status: 201 });

//     } catch (error) {

//         console.error("Error Connect Local Server:", error);
//         return new NextResponse(JSON.stringify({ error }), { status: 500 });

//     }

// };

// export async function DELETE(req: NextRequest) {

//     try {
//         // รับ userId จาก query parameter
//         const { searchParams } = new URL(req.url);
//         const userId = searchParams.get('userId');

//         // ตรวจสอบว่ามี userId หรือไม่
//         if (!userId) {
//             return new NextResponse(JSON.stringify('User ID is required'), { status: 400 });
//         }

//         // ลบ user โดยใช้ userId
//         const deletedUser = await prisma.user.update({
//             where: {
//                 userId,
//             },
//             data: {
//                 userStatus: UserStatus.InActice
//             }
//         });

//         // ส่งข้อมูล user ที่ถูกลบกลับ
//         return new NextResponse(JSON.stringify({ userName: deletedUser.name }), { status: 200 });
//     } catch (error: any) {
//         console.error('Error deleting user:', error);

//         if (error.code === 'P2025') {
//             // Prisma error code สำหรับการไม่พบ record ที่ต้องการลบ
//             return new NextResponse(JSON.stringify('User not found'), { status: 404 });
//         }

//         return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
//     }
// }

// export async function PATCH(req: NextRequest) {

//     try {

//         const { userId, email, password, name, department, position, phone, image, manDay, roleId, address, roleName } = await req.json() as User;
//         const _roleName = roleName as RoleName;

//         // ตรวจสอบว่ามี userId หรือไม่
//         if (!userId) {
//             return new NextResponse(JSON.stringify('User ID is required'), { status: 400 });
//         }

//         const _passwordService = new PasswordService();
//         let hash = null;

//         if (password && roleName !== RoleName.Employee) {
//             hash = await _passwordService.hashPassword(password);
//         }

//         if (roleName !== RoleName.Employee) {
//             // Validation
//             if (!email) {
//                 return new NextResponse(JSON.stringify('Email is required'), { status: 400 });
//             } else {

//                 //check name is exist
//                 const emailIsAlready = await prisma.user.findFirst({ where: { email: { equals: email }, userStatus: UserStatus.Active } })

//                 if (emailIsAlready && emailIsAlready.email !== email) {
//                     return new NextResponse(JSON.stringify('Email is Already'), { status: 400 });
//                 }
//             }
//         }

//         // let JWT_SECRET = process.env.JWT_SECRET || "OBjHLjEPKZAqSmnqNUZNkm9hTjmv4LJI"

//         // const tokenService = new TokenService(JWT_SECRET, "24h");

//         // Validation
//         if (!name) {
//             return new NextResponse(JSON.stringify('Name is required'), { status: 400 });
//         }

//         // const nameIsAlready = await prisma.user.findFirst({ where: { email: { equals: email }, userStatus: UserStatus.Active } })

//         //check name is exist
//         const nameIsAlready = await prisma.user.findFirst({ where: { name: { equals: name }, userStatus: UserStatus.Active } })

//         if (nameIsAlready && nameIsAlready.userId !== userId) {
//             return new NextResponse(JSON.stringify('Person is Already'), { status: 400 });
//         }

//         const _roleData = await prisma.role.findFirst({ where: { name: { equals: _roleName } } })

//         // Create a new User
//         const updatedUser = await prisma.user.update({
//             data: {
//                 email,
//                 name,
//                 password: hash,
//                 department,
//                 position,
//                 phone: phone ? phone : null,
//                 image,
//                 manDay: Number(manDay),
//                 userStatus: UserStatus.Active,
//                 address,
//                 roleId: _roleData?.roleId
//             },
//             where: {
//                 userId
//             }
//         });

//         // const updatedUser = await prisma.user.update({
//         //     where: { userId: userId },
//         //     data: {
//         //         userName, userDesc, userRemark
//         //     },
//         //     // Update fields based on the request body
//         // });

//         return new NextResponse(JSON.stringify(updatedUser), { status: 200 });

//     } catch (error: any) {

//         console.error('Error updating user:', error);

//         if (error.code === 'P2025') {
//             // Prisma error code สำหรับการไม่พบ record ที่ต้องการลบ
//             return new NextResponse(JSON.stringify('User not found'), { status: 404 });
//         }

//         return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
//     }
// }
