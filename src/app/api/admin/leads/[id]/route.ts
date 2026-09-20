import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireEditor } from "@/lib/rbac";
import { writeAuditLog } from "@/lib/auditLog";

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireEditor();
    if (auth instanceof NextResponse) return auth;

    const { id } = await context.params;
    const body = await req.json();
    const { status, assignedToId } = body;

    const data: any = {};
    if (status) data.status = status;
    if (assignedToId !== undefined) data.assignedToId = assignedToId || null;

    const lead = await prisma.lead.update({
      where: { id },
      data,
    });

    await writeAuditLog(
      auth.user.id,
      "UPDATE_LEAD",
      "Lead",
      lead.id,
      `Updated lead: ${JSON.stringify(data)}`
    );

    return NextResponse.json(lead);
  } catch (error: any) {
    console.error("Error updating lead:", error);
    return NextResponse.json({ error: error.message || "Failed to update lead" }, { status: 500 });
  }
}
