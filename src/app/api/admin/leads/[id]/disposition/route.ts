import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireTeamMember } from "@/lib/rbac";
import { LeadStatus } from "@prisma/client";

const DISPOSITION_STATUS_MAP: Record<string, LeadStatus> = {
  INTERESTED: LeadStatus.CONTACTED,
  CONSULTATION_BOOKED: LeadStatus.CONSULTATION_BOOKED,
  CALLBACK: LeadStatus.CONTACTED,
  NO_ANSWER: LeadStatus.CONTACTED,
  NOT_INTERESTED: LeadStatus.LOST,
  ENROLLED: LeadStatus.CONVERTED,
};

const DISPOSITION_LABELS: Record<string, string> = {
  INTERESTED: "🟢 Interested — Follow-up required",
  CONSULTATION_BOOKED: "📅 Consultation Scheduled / Confirmed",
  CALLBACK: "🟡 Callback Requested by student",
  NO_ANSWER: "🟠 Ringing / No Answer / Switched Off",
  NOT_INTERESTED: "🔴 Not Interested / Unqualified",
  ENROLLED: "🟣 Successfully Enrolled / Converted",
};

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
    const body = await req.json();
    const { disposition, noteText, callbackDate } = body;

    if (!disposition) {
      return NextResponse.json({ error: "Disposition is required" }, { status: 400 });
    }

    const newStatus = DISPOSITION_STATUS_MAP[disposition] || LeadStatus.CONTACTED;
    const dispositionLabel = DISPOSITION_LABELS[disposition] || disposition;

    let autoNoteContent = `[Call Outcome: ${dispositionLabel}]`;
    if (callbackDate) {
      autoNoteContent += `\n⏰ Requested Callback on: ${new Date(callbackDate).toLocaleString("en-IN")}`;
    }
    if (noteText) {
      autoNoteContent += `\n💬 Note: ${noteText}`;
    }

    // 1. Update Lead disposition and status
    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: {
        disposition,
        status: newStatus,
        lastActivityAt: new Date(),
      },
    });

    // 2. Append internal Call Note
    const note = await prisma.leadNote.create({
      data: {
        leadId,
        authorId: auth.user.id,
        content: autoNoteContent,
      },
      include: {
        author: {
          select: { name: true, role: true },
        },
      },
    });

    return NextResponse.json({ success: true, lead: updatedLead, note });
  } catch (error: any) {
    console.error("[Disposition API Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update disposition" },
      { status: 400 }
    );
  }
}
