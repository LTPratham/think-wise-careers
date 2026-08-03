import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireEditor } from "@/lib/rbac";
import { writeAuditLog } from "@/lib/auditLog";

export async function POST(req: Request) {
  try {
    const auth = await requireEditor();
    if (auth instanceof NextResponse) return auth;

    const body = await req.json();

    const country = await prisma.mBBSCountry.create({
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

    await writeAuditLog(auth.user.id, "CREATE", "MBBSCountry", country.id, `Created MBBS destination ${country.name}`);

    return NextResponse.json(country);
  } catch (error) {
    console.error("Error creating MBBS destination:", error);
    return NextResponse.json({ error: "Failed to create destination" }, { status: 500 });
  }
}
