import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireEditor } from "@/lib/rbac";
import { writeAuditLog } from "@/lib/auditLog";

export async function POST(req: Request) {
  try {
    const auth = await requireEditor();
    if (auth instanceof NextResponse) return auth;

    const body = await req.json();

    const country = await prisma.country.create({
      data: {
        name: body.name,
        slug: body.slug,
        overview: body.overview,
        eligibility: body.eligibility,
        publishStatus: body.publishStatus,
        visaOverview: "",
        careerOutcomes: "",
        scholarships: "",
      },
    });

    await writeAuditLog(auth.user.id, "CREATE", "Country", country.id, `Created country ${country.name}`);

    return NextResponse.json(country);
  } catch (error) {
    console.error("Error creating country:", error);
    return NextResponse.json({ error: "Failed to create country" }, { status: 500 });
  }
}
