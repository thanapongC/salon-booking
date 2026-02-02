import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import * as line from '@line/bot-sdk';

const prisma = new PrismaClient();

new line.messagingApi.MessagingApiClient({
  channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN',
});
line.middleware({
  channelSecret: 'YOUR_CHANNEL_SECRET'
});

// const lineClient = new Client({ channelAccessToken: process.env.LINE_ACCESS_TOKEN! });


export const LineMessagingService = {
  async sendNotify(bookingId: string, type: 'NEW' | 'SUCCESS' | 'CANCEL' | 'REMIND' | 'RESCHEDULE') {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { store: true, customer: true, service: true }
    });
    if (!booking || !booking.customer.lineUserId) return;

    // เลือก Template จาก Store Model ตาม Type
    let template = "";
    switch (type) {
      case 'NEW': template = booking.store.newBooking || "มีการจองใหม่"; break;
      case 'SUCCESS': template = booking.store.successBooking || "จองสำเร็จ"; break;
      case 'CANCEL': template = booking.store.cancelBooking || "การจองถูกยกเลิก"; break;
      case 'REMIND': template = booking.store.before24H || "เตือนนัดหมาย"; break;
      case 'RESCHEDULE': template = booking.store.reSchedule || "การจองถูกเลื่อน"; break;
    }

    // Logic การ Replace คำสำคัญ (ตัวอย่าง)
    const message = template
      .replace("{{name}}", booking.customerName)
      .replace("{{service}}", booking.service.name)
      .replace("{{date}}", dayjs(booking.bookingDate).format("DD/MM/YYYY HH:mm"));

    // ส่งผ่าน Messaging API
    // await line.pushMessage(booking.customer.lineUserId, { type: 'text', text: message });
  },

  // Reminder 24H - ออกแบบมาให้ Run ผ่าน Cron Job ทุก 5-15 นาที
  async checkAndSend24HReminders() {
    const targetTime = dayjs().add(24, 'hour');
    const bookings = await prisma.booking.findMany({
      where: {
        bookingDate: {
          gte: targetTime.startOf('minute').toDate(),
          lte: targetTime.add(10, 'minute').toDate()
        },
        status: 'CONFIRMED'
      },
      select: { id: true }
    });

    for (const b of bookings) {
      await this.sendNotify(b.id, 'REMIND');
    }
  }
};