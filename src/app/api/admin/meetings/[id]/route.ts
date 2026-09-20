import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireTeamMember } from "@/lib/rbac";

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
    const { status, assignedToId } = body;

    const data: any = {};
    if (status) data.status = status;
    if (assignedToId !== undefined) data.assignedToId = assignedToId || null;

    const updated = await prisma.consultationBooking.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, booking: updated });
  } catch (error: any) {
    console.error("[Booking Update Error]:", error);
    return NextResponse.json(
      { error: "Failed to update booking", details: error.message },
      { status: 400 }
    );
  }
}
