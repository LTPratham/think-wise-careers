import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireEditor } from "@/lib/rbac";
import { writeAuditLog } from "@/lib/auditLog";

export async function POST(req: Request) {
  try {
    const auth = await requireEditor();
    if (auth instanceof NextResponse) return auth;

    const body = await req.json();

    const uni = await prisma.university.create({
      data: {
        name: body.name,
        countryName: body.countryName,
        logoUrl: body.logoUrl || null,
        description: body.description,
      },
    });

    await writeAuditLog(auth.user.id, "CREATE", "University", uni.id, `Created university ${uni.name}`);

    return NextResponse.json(uni);
  } catch (error) {
    console.error("Error creating university:", error);
    return NextResponse.json({ error: "Failed to create university" }, { status: 500 });
  }
}
