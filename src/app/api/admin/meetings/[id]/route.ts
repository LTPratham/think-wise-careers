import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireTeamMember } from "@/lib/rbac";
import { BookingStatus, LeadStatus } from "@prisma/client";

const DISPOSITION_STATUS_MAP: Record<string, { booking: BookingStatus; lead: LeadStatus }> = {
  INTERESTED: { booking: BookingStatus.COMPLETED, lead: LeadStatus.CONTACTED },
  CONSULTATION_BOOKED: { booking: BookingStatus.CONFIRMED, lead: LeadStatus.CONSULTATION_BOOKED },
  CALLBACK: { booking: BookingStatus.COMPLETED, lead: LeadStatus.CONTACTED },
  NO_ANSWER: { booking: BookingStatus.COMPLETED, lead: LeadStatus.CONTACTED },
  NOT_INTERESTED: { booking: BookingStatus.COMPLETED, lead: LeadStatus.LOST },
  ENROLLED: { booking: BookingStatus.COMPLETED, lead: LeadStatus.CONVERTED },
};

const DISPOSITION_LABELS: Record<string, string> = {
  INTERESTED: "🟢 Interested — Follow-up required",
  CONSULTATION_BOOKED: "📅 Consultation Scheduled / Confirmed",
  CALLBACK: "🟡 Callback Requested by student",
  NO_ANSWER: "🟠 Ringing / No Answer / Switched Off",
  NOT_INTERESTED: "🔴 Not Interested / Unqualified",
  ENROLLED: "🟣 Successfully Enrolled / Converted",
};

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireTeamMember();
  if (auth instanceof NextResponse) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await req.json();
    const { status, assignedToId, disposition, noteText } = body;

    const data: any = {};
    if (status) data.status = status;
    if (assignedToId !== undefined) data.assignedToId = assignedToId || null;

    if (disposition && DISPOSITION_STATUS_MAP[disposition]) {
      data.status = DISPOSITION_STATUS_MAP[disposition].booking;
    }

    const updated = await prisma.consultationBooking.update({
      where: { id },
      data,
    });

    // If this meeting is linked to a Lead and disposition was selected, sync with Lead & Note
    if (disposition && updated.leadId) {
      const mapping = DISPOSITION_STATUS_MAP[disposition];
      const dispLabel = DISPOSITION_LABELS[disposition] || disposition;

      await prisma.lead.update({
        where: { id: updated.leadId },
        data: {
          disposition,
          status: mapping.lead,
          lastActivityAt: new Date(),
        },
      });

      await prisma.leadNote.create({
        data: {
          leadId: updated.leadId,
          authorId: auth.user.id,
          content: `[Meeting Call Outcome: ${dispLabel}]${noteText ? `\n💬 Note: ${noteText}` : ""}`,
        },
      });
    }

    return NextResponse.json({ success: true, booking: updated });
  } catch (error: any) {
    console.error("[Booking Update Error]:", error);
    return NextResponse.json(
      { error: "Failed to update booking", details: error.message },
      { status: 400 }
    );
  }
}
