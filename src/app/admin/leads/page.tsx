import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { Search, Filter, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string };
}) {
  const query = searchParams.q || "";
  const statusFilter = searchParams.status || "";

  const whereClause: any = {};
  if (query) {
    whereClause.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { email: { contains: query, mode: "insensitive" } },
      { phone: { contains: query, mode: "insensitive" } },
    ];
  }
  if (statusFilter) {
    whereClause.status = statusFilter;
  }

  const leads = await prisma.lead.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { touchpoints: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-outfit text-slate-900">Lead Management</h2>
          <p className="text-slate-500 mt-1">View and manage all student enquiries.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap gap-4 items-center">
        <form className="flex-1 min-w-[200px] flex gap-2" action="/admin/leads" method="GET">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input name="q" defaultValue={query} placeholder="Search by name, email, or phone..." className="pl-9" />
          </div>
          <Button type="submit" variant="secondary">Search</Button>
        </form>
        <div className="flex gap-2">
          <Button variant={statusFilter === "" ? "default" : "outline"} asChild>
            <Link href="/admin/leads">All</Link>
          </Button>
          <Button variant={statusFilter === "NEW" ? "default" : "outline"} asChild>
            <Link href="/admin/leads?status=NEW">New</Link>
          </Button>
          <Button variant={statusFilter === "CONTACTED" ? "default" : "outline"} asChild>
            <Link href="/admin/leads?status=CONTACTED">Contacted</Link>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Name / Contact</th>
                <th className="px-6 py-4">Service Interest</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Qualification</th>
                <th className="px-6 py-4">Touchpoints</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{lead.name}</div>
                    <div className="text-slate-500 mt-0.5">{lead.email}</div>
                    <div className="text-slate-500">{lead.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                      {lead.serviceInterest || "General"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
                      ${lead.status === 'NEW' ? 'bg-blue-100 text-blue-700' : ''}
                      ${lead.status === 'CONTACTED' ? 'bg-amber-100 text-amber-700' : ''}
                      ${lead.status === 'CONSULTATION_BOOKED' ? 'bg-indigo-100 text-indigo-700' : ''}
                      ${lead.status === 'CONVERTED' ? 'bg-green-100 text-green-700' : ''}
                      ${lead.status === 'LOST' ? 'bg-red-100 text-red-700' : ''}
                    `}>
                      {lead.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                      ${lead.qualificationFlag === 'QUALIFIED' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}
                    `}>
                      {lead.qualificationFlag}
                    </span>
                    {lead.isDuplicate && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        Returning
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {lead._count.touchpoints}
                  </td>
                  <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                    {format(new Date(lead.createdAt), "MMM d, yyyy")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/leads/${lead.id}`}>
                        <Eye className="w-4 h-4 mr-2" /> View
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    No leads found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
