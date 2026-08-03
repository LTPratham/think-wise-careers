import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireEditor } from "@/lib/rbac";
import { writeAuditLog } from "@/lib/auditLog";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireEditor();
    if (auth instanceof NextResponse) return auth;

    const body = await req.json();

    const country = await prisma.mBBSCountry.update({
      where: { id: params.id },
      data: {
        name: body.name,
        slug: body.slug,
        recognitionStatus: body.recognitionStatus,
        eligibilityNeet: body.eligibilityNeet,
        admissionProcess: body.admissionProcess,
        hostelInfo: body.hostelInfo,
        careerScope: body.careerScope,
        publishStatus: body.publishStatus,
      },
    });

    await writeAuditLog(auth.user.id, "UPDATE", "MBBSCountry", country.id, `Updated MBBS destination ${country.name}`);

    return NextResponse.json(country);
  } catch (error) {
    console.error("Error updating MBBS destination:", error);
    return NextResponse.json({ error: "Failed to update destination" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireEditor();
    if (auth instanceof NextResponse) return auth;

    const country = await prisma.mBBSCountry.delete({
      where: { id: params.id },
    });

    await writeAuditLog(auth.user.id, "DELETE", "MBBSCountry", country.id, `Deleted MBBS destination ${country.name}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting MBBS destination:", error);
    return NextResponse.json({ error: "Failed to delete destination" }, { status: 500 });
  }
}
