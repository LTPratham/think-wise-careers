import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireTeamMember } from "@/lib/rbac";
import { sendConsultationBookingNotificationEmail } from "@/lib/resend";
import { BookingMode, BookingStatus, LeadStatus } from "@prisma/client";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireTeamMember();
  if (auth instanceof NextResponse) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: leadId } = await params;

  try {
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const body = await req.json();
    const { date, timeSlot, mode, meetingLink, notes } = body;

    if (!date || !timeSlot || !mode) {
      return NextResponse.json({ error: "Date, time slot, and mode are required" }, { status: 400 });
    }

    // Generate Google Meet URL if mode is GOOGLE_MEET and none provided
    const finalMeetingLink = meetingLink || (mode === "GOOGLE_MEET" ? "https://meet.google.com/new" : null);

    // 1. Create ConsultationBooking
    const booking = await prisma.consultationBooking.create({
      data: {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        date: new Date(date),
        timeSlot,
        mode: mode as BookingMode,
        meetingLink: finalMeetingLink,
        serviceInterest: lead.serviceInterest,
        notes: notes || `Scheduled by counsellor ${auth.user.name}`,
        status: BookingStatus.CONFIRMED,
        leadId: lead.id,
        assignedToId: auth.user.id, // Assigned to the counsellor who scheduled it
      },
    });

    // 2. Update Lead Status
    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        status: LeadStatus.CONSULTATION_BOOKED,
        disposition: "CONSULTATION_BOOKED",
        lastActivityAt: new Date(),
      },
    });

    // 3. Append Note
    await prisma.leadNote.create({
      data: {
        leadId: lead.id,
        authorId: auth.user.id,
        content: `[1-Click Scheduled Consultation]\n📅 Date: ${new Date(date).toLocaleDateString("en-IN")}\n⏰ Time: ${timeSlot}\n🎯 Mode: ${mode}${finalMeetingLink ? `\n🔗 Link: ${finalMeetingLink}` : ""}`,
      },
    });

    // 4. Send Confirmation Email via Resend to Admin & Student
    await sendConsultationBookingNotificationEmail({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      date,
      timeSlot,
      mode,
      serviceInterest: lead.serviceInterest || undefined,
      notes: notes || undefined,
      bookingId: booking.id,
      counsellorName: auth.user.name,
    });

    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    console.error("[Counsellor Schedule Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to schedule consultation" },
      { status: 400 }
    );
  }
}
