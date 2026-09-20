import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ConsultationBookingSchema } from "@/lib/validators";
import { sendConsultationBookingNotificationEmail } from "@/lib/resend";
import { BookingMode, BookingStatus, LeadStatus, QualificationFlag, TouchpointChannel } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = ConsultationBookingSchema.parse(body);

    // 1. Find or create corresponding Lead record to unify CRM data
    let lead = await prisma.lead.findFirst({
      where: {
        OR: [
          { phone: validated.phone },
          { email: validated.email },
        ],
      },
    });

    if (lead) {
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          status: LeadStatus.CONSULTATION_BOOKED,
          lastActivityAt: new Date(),
          touchpoints: {
            create: {
              sourcePage: "Schedule Consultation Page",
              channel: TouchpointChannel.FORM,
            },
          },
        },
      });
    } else {
      lead = await prisma.lead.create({
        data: {
          name: validated.name,
          email: validated.email,
          phone: validated.phone,
          serviceInterest: validated.serviceInterest,
          sourcePage: "Schedule Consultation Page",
          message: validated.notes || null,
          status: LeadStatus.CONSULTATION_BOOKED,
          qualificationFlag: QualificationFlag.QUALIFIED,
          touchpoints: {
            create: {
              sourcePage: "Schedule Consultation Page",
              channel: TouchpointChannel.FORM,
            },
          },
        },
      });
    }

    // 2. Create Consultation Booking record
    const booking = await prisma.consultationBooking.create({
      data: {
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        date: new Date(validated.date),
        timeSlot: validated.timeSlot,
        mode: validated.mode as BookingMode,
        serviceInterest: validated.serviceInterest,
        targetCountry: validated.targetCountry || null,
        targetDegree: validated.targetDegree || null,
        notes: validated.notes || null,
        status: BookingStatus.CONFIRMED,
        leadId: lead.id,
      },
    });

    // 3. Trigger Email notifications
    await sendConsultationBookingNotificationEmail({
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      date: validated.date,
      timeSlot: validated.timeSlot,
      mode: validated.mode,
      serviceInterest: validated.serviceInterest,
      targetCountry: validated.targetCountry,
      targetDegree: validated.targetDegree,
      notes: validated.notes,
      bookingId: booking.id,
    });

    return NextResponse.json({ success: true, bookingId: booking.id });
  } catch (error: any) {
    console.error("[Schedule API Error]:", error);
    return NextResponse.json(
      { error: "Failed to book consultation", details: error.message },
      { status: 400 }
    );
  }
}
