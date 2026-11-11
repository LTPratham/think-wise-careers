import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireEditor } from "@/lib/rbac";
import { writeAuditLog } from "@/lib/auditLog";

export async function POST(req: Request) {
  try {
    const auth = await requireEditor();
    if (auth instanceof NextResponse) return auth;

    const body = await req.json();

    // Create country with all fields
    const country = await prisma.country.create({
      data: {
        name: body.name,
        slug: body.slug,
        imageUrl: body.imageUrl || null,
        overview: body.overview || "",
        popularCourses: body.popularCourses || [],
        eligibility: body.eligibility || "",
        costBreakdown: body.costBreakdown || {},
        scholarships: body.scholarships || "",
        visaOverview: body.visaOverview || "",
        careerOutcomes: body.careerOutcomes || "",
        publishStatus: body.publishStatus || "DRAFT",
      },
    });

    // Link universities if provided
    if (body.universityIds && Array.isArray(body.universityIds) && body.universityIds.length > 0) {
      await prisma.countryUniversity.createMany({
        data: body.universityIds.map((uid: string) => ({
          countryId: country.id,
          universityId: uid,
        })),
        skipDuplicates: true,
      });
    }

    await writeAuditLog(auth.user.id, "CREATE", "Country", country.id, `Created country ${country.name}`);

    return NextResponse.json(country);
  } catch (error) {
    console.error("Error creating country:", error);
    return NextResponse.json({ error: "Failed to create country" }, { status: 500 });
  }
}
