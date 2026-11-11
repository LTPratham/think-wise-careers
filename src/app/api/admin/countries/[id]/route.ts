import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireEditor } from "@/lib/rbac";
import { writeAuditLog } from "@/lib/auditLog";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireEditor();
    if (auth instanceof NextResponse) return auth;

    const { id } = await params;
    const body = await req.json();

    // Update country with all fields
    const country = await prisma.country.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        imageUrl: body.imageUrl,
        overview: body.overview,
        popularCourses: body.popularCourses,
        eligibility: body.eligibility,
        costBreakdown: body.costBreakdown,
        scholarships: body.scholarships,
        visaOverview: body.visaOverview,
        careerOutcomes: body.careerOutcomes,
        publishStatus: body.publishStatus,
      },
    });

    // Re-sync university links: delete existing, re-create from payload
    if (body.universityIds && Array.isArray(body.universityIds)) {
      await prisma.countryUniversity.deleteMany({
        where: { countryId: id },
      });

      if (body.universityIds.length > 0) {
        await prisma.countryUniversity.createMany({
          data: body.universityIds.map((uid: string) => ({
            countryId: id,
            universityId: uid,
          })),
          skipDuplicates: true,
        });
      }
    }

    await writeAuditLog(auth.user.id, "UPDATE", "Country", country.id, `Updated country ${country.name}`);

    return NextResponse.json(country);
  } catch (error) {
    console.error("Error updating country:", error);
    return NextResponse.json({ error: "Failed to update country" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireEditor();
    if (auth instanceof NextResponse) return auth;

    const { id } = await params;

    const country = await prisma.country.delete({
      where: { id },
    });

    await writeAuditLog(auth.user.id, "DELETE", "Country", country.id, `Deleted country ${country.name}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting country:", error);
    return NextResponse.json({ error: "Failed to delete country" }, { status: 500 });
  }
}
