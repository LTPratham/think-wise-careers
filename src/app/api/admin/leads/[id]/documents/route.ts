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

  const { id: leadId } = await params;

  try {
    const body = await req.json();
    const { documents } = body;

    const updated = await prisma.lead.update({
      where: { id: leadId },
      data: {
        documents: documents || [],
        lastActivityAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, documents: updated.documents });
  } catch (error: any) {
    console.error("[Documents API Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update documents" },
      { status: 400 }
    );
  }
}
