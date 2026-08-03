import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireEditor } from "@/lib/rbac";
import { writeAuditLog } from "@/lib/auditLog";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireEditor();
    if (auth instanceof NextResponse) return auth;

    const body = await req.json();

    const country = await prisma.country.update({
      where: { id: params.id },
      data: {
        name: body.name,
        slug: body.slug,
        overview: body.overview,
        eligibility: body.eligibility,
        publishStatus: body.publishStatus,
      },
    });

    await writeAuditLog(auth.user.id, "UPDATE", "Country", country.id, `Updated country ${country.name}`);

    return NextResponse.json(country);
  } catch (error) {
    console.error("Error updating country:", error);
    return NextResponse.json({ error: "Failed to update country" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireEditor();
    if (auth instanceof NextResponse) return auth;

    const country = await prisma.country.delete({
      where: { id: params.id },
    });

    await writeAuditLog(auth.user.id, "DELETE", "Country", country.id, `Deleted country ${country.name}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting country:", error);
    return NextResponse.json({ error: "Failed to delete country" }, { status: 500 });
  }
}
