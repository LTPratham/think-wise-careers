import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminMBBSPage() {
  const countries = await prisma.mBBSCountry.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { universities: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold font-outfit text-slate-900">MBBS Destinations</h2>
          <p className="text-slate-500 mt-1">Manage MBBS countries and medical universities.</p>
        </div>
        <Button asChild>
          <Link href="/admin/mbbs/new">
            <Plus className="w-4 h-4 mr-2" /> Add MBBS Country
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Country Name</th>
              <th className="px-6 py-4">Medical Universities</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Updated</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {countries.map((country) => (
              <tr key={country.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-900">{country.name}</div>
                  <div className="text-slate-500 mt-0.5 text-xs">/{country.slug}</div>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {country._count.universities} linked
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
                    ${country.publishStatus === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}
                  `}>
                    {country.publishStatus === 'PUBLISHED' ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {format(new Date(country.updatedAt), "MMM d, yyyy")}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/mbbs/${country.id}`}>
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
            {countries.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  No MBBS countries found. Click 'Add MBBS Country' to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
