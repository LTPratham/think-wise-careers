import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CountryForm } from "@/components/admin/CountryForm";

export default async function AdminCountryEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const isNew = (await params).id === "new";
  
  let country = null;
  if (!isNew) {
    country = await prisma.country.findUnique({
      where: { id: (await params).id },
      include: { universities: { select: { id: true } } },
    });
    if (!country) notFound();
  }

  const allUniversities = await prisma.university.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6 max-w-4xl">
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

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <CountryForm initialData={country} universities={allUniversities} />
      </div>
    </div>
  );
}
