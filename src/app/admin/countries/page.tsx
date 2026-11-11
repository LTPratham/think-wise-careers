import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountriesTable, CountryListItem } from "@/components/admin/CountriesTable";

export default async function AdminCountriesPage() {
  const countries = await prisma.country.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { universities: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-outfit text-slate-900">Study Abroad Destinations</h2>
          <p className="text-slate-500 mt-1">
            Manage public destination pages, banner graphics, cost breakdown tables, and linked universities.
          </p>
        </div>
        <Button asChild size="lg" className="shadow-xs">
          <Link href="/admin/countries/new">
            <Plus className="w-4 h-4 mr-2" /> Add Country
          </Link>
        </Button>
      </div>

      <CountriesTable initialCountries={countries as unknown as CountryListItem[]} />
    </div>
  );
}
