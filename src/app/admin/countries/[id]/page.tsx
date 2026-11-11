import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CountryForm } from "@/components/admin/CountryForm";

export default async function AdminCountryEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  
  let country = null;
  let linkedUniversityIds: string[] = [];

  if (!isNew) {
    country = await prisma.country.findUnique({
      where: { id },
      include: {
        universities: {
          select: { universityId: true },
        },
      },
    });
    if (!country) notFound();
    linkedUniversityIds = country.universities.map((cu) => cu.universityId);
  }

  const allUniversities = await prisma.university.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/admin/countries" className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold font-outfit text-slate-900">
            {isNew ? "Add New Country" : `Edit ${country?.name}`}
          </h2>
          <p className="text-sm text-slate-500 mt-1">Study Abroad Destination</p>
        </div>
      </div>

      <CountryForm
        initialData={country}
        universities={allUniversities}
        linkedUniversityIds={linkedUniversityIds}
      />
    </div>
  );
}
