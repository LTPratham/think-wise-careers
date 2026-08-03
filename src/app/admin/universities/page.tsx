import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, Edit, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminUniversitiesPage() {
  const universities = await prisma.university.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold font-outfit text-slate-900">Universities Database</h2>
          <p className="text-slate-500 mt-1">Manage global partner institutions.</p>
        </div>
        <Button asChild>
          <Link href="/admin/universities/new">
            <Plus className="w-4 h-4 mr-2" /> Add University
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 w-12"></th>
              <th className="px-6 py-4">University Name</th>
              <th className="px-6 py-4">Country</th>
              <th className="px-6 py-4">Added On</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {universities.map((uni) => (
              <tr key={uni.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  {uni.logoUrl ? (
                    <img src={uni.logoUrl} alt="logo" className="w-8 h-8 rounded object-cover border" />
                  ) : (
                    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-400">
                      <Building2 className="w-4 h-4" />
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 font-semibold text-slate-900">
                  {uni.name}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {uni.countryName}
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {format(new Date(uni.createdAt), "MMM d, yyyy")}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/universities/${uni.id}`}>
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
            {universities.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  No universities found. Click 'Add University' to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
