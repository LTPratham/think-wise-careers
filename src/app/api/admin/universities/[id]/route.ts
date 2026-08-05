import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireEditor } from "@/lib/rbac";
import { writeAuditLog } from "@/lib/auditLog";

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireEditor();
    if (auth instanceof NextResponse) return auth;

    const body = await req.json();

    const uni = await prisma.university.update({
      where: { id: params.id },
      data: {
        name: body.name,
        countryName: body.countryName,
        logoUrl: body.logoUrl || null,
        description: body.description,
      },
    });

    await writeAuditLog(auth.user.id, "UPDATE", "University", uni.id, `Updated university ${uni.name}`);

    return NextResponse.json(uni);
  } catch (error) {
    console.error("Error updating university:", error);
    return NextResponse.json({ error: "Failed to update university" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireEditor();
    if (auth instanceof NextResponse) return auth;

    const uni = await prisma.university.delete({
      where: { id: params.id },
    });

    await writeAuditLog(auth.user.id, "DELETE", "University", uni.id, `Deleted university ${uni.name}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting university:", error);
    return NextResponse.json({ error: "Failed to delete university" }, { status: 500 });
  }
}
