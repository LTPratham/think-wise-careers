import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UniversitiesTable, UniversityListItem } from "@/components/admin/UniversitiesTable";

export default async function AdminUniversitiesPage() {
  const universities = await prisma.university.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          countries: true,
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-outfit text-slate-900">Universities Database</h2>
          <p className="text-slate-500 mt-1">
            Manage global partner institutions, logos, descriptions, and linked study abroad destinations.
          </p>
        </div>
        <Button asChild size="lg" className="shadow-xs">
          <Link href="/admin/universities/new">
            <Plus className="w-4 h-4 mr-2" /> Add University
          </Link>
        </Button>
      </div>

      <UniversitiesTable initialUniversities={universities as unknown as UniversityListItem[]} />
    </div>
  );
}
