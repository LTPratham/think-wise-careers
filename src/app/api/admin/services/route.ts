import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireEditor } from "@/lib/rbac";
import { writeAuditLog } from "@/lib/auditLog";

export async function POST(req: Request) {
  try {
    const auth = await requireEditor();
    if (auth instanceof NextResponse) return auth;

    const body = await req.json();

    const service = await prisma.service.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        process: body.process,
        ctaLabel: body.ctaLabel,
      },
    });

    await writeAuditLog(auth.user.id, "CREATE", "Service", service.id, `Created service ${service.name}`);

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
