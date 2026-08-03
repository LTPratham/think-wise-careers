import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireEditor } from "@/lib/rbac";
import { writeAuditLog } from "@/lib/auditLog";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireEditor();
    if (auth instanceof NextResponse) return auth;

    const body = await req.json();

    const service = await prisma.service.update({
      where: { id: params.id },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        process: body.process,
        ctaLabel: body.ctaLabel,
      },
    });

    await writeAuditLog(auth.user.id, "UPDATE", "Service", service.id, `Updated service ${service.name}`);

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireEditor();
    if (auth instanceof NextResponse) return auth;

    const service = await prisma.service.delete({
      where: { id: params.id },
    });

    await writeAuditLog(auth.user.id, "DELETE", "Service", service.id, `Deleted service ${service.name}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
