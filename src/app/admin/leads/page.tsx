import { prisma } from "@/lib/prisma";
import { requireTeamMember } from "@/lib/rbac";
import { redirect } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { Search, Filter, Eye, Download, UserCheck, MessageSquare, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; assigned?: string }>;
}) {
  const auth = await requireTeamMember();
  if (auth instanceof Response) {
    redirect("/login");
  }

  const { user } = auth;
  const isAdmin = user.role === "ADMIN";
  const params = await searchParams;
  const query = params.q || "";
  const statusFilter = params.status || "";
  const assignedFilter = params.assigned || "";

  const whereClause: any = {};

  // Strict role isolation: Counsellor ONLY sees leads assigned to them!
  if (user.role === "COUNSELLOR") {
    whereClause.assignedToId = user.id;
  } else if (assignedFilter === "unassigned") {
    whereClause.assignedToId = null;
  } else if (assignedFilter) {
    whereClause.assignedToId = assignedFilter;
  }

  if (query) {
    whereClause.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { email: { contains: query, mode: "insensitive" } },
      { phone: { contains: query, mode: "insensitive" } },
      { serviceInterest: { contains: query, mode: "insensitive" } },
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
        select: { touchpoints: true, notes: true },
      },
      assignedTo: {
        select: { id: true, name: true, role: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-outfit text-slate-900">
            {user.role === "COUNSELLOR" ? "My Assigned Leads" : "Lead Management"}
          </h2>
          <p className="text-slate-500 mt-1">
            {user.role === "COUNSELLOR" 
              ? `Welcome ${user.name}. Here are the student leads assigned to you by the administrator.` 
              : "View, assign, and manage all student enquiries across the consultancy."}
          </p>
        </div>

        {/* Super Admin ONLY: Excel Export */}
        {isAdmin && (
          <div className="flex gap-2 flex-shrink-0">
            <Button variant="outline" size="sm" asChild>
              <a href="/api/admin/leads/export?scope=today" download>
                <Download className="w-4 h-4 mr-2" />
                Export Today
              </a>
            </Button>
            <Button variant="default" size="sm" asChild>
              <a href="/api/admin/leads/export?scope=all" download>
                <Download className="w-4 h-4 mr-2" />
                Export All Time
              </a>
            </Button>
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap gap-4 items-center">
        <form className="flex-1 min-w-[200px] flex gap-2" action="/admin/leads" method="GET">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input name="q" defaultValue={query} placeholder="Search by name, email, or phone..." className="pl-9" />
          </div>
          <Button type="submit" variant="secondary">Search</Button>
        </form>
        <div className="flex flex-wrap gap-2">
          <Button variant={statusFilter === "" ? "default" : "outline"} size="sm" asChild>
            <Link href="/admin/leads">All</Link>
          </Button>
          <Button variant={statusFilter === "NEW" ? "default" : "outline"} size="sm" asChild>
            <Link href="/admin/leads?status=NEW">New</Link>
          </Button>
          <Button variant={statusFilter === "CONTACTED" ? "default" : "outline"} size="sm" asChild>
            <Link href="/admin/leads?status=CONTACTED">Contacted</Link>
          </Button>
          <Button variant={statusFilter === "CONSULTATION_BOOKED" ? "default" : "outline"} size="sm" asChild>
            <Link href="/admin/leads?status=CONSULTATION_BOOKED">Booked</Link>
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
                {isAdmin && <th className="px-6 py-4">Assigned Counsellor</th>}
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Call Notes</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{lead.name}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{lead.email}</div>
                    <div className="text-slate-500 text-xs">{lead.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                      {lead.serviceInterest || "General"}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-4">
                      {lead.assignedTo ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                          <UserCheck className="w-3 h-3" /> {lead.assignedTo.name}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Unassigned</span>
                      )}
                    </td>
                  )}
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
                  <td className="px-6 py-4 text-slate-600">
                    {lead._count.notes > 0 ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        <MessageSquare className="w-3 h-3 text-slate-400" /> {lead._count.notes}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-500 whitespace-nowrap text-xs">
                    {format(new Date(lead.createdAt), "MMM d, yyyy")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/leads/${lead.id}`}>
                        <Eye className="w-4 h-4 mr-1.5" /> View
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={isAdmin ? 7 : 6} className="px-6 py-12 text-center text-slate-500">
                    <AlertCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-medium text-slate-700">
                      {user.role === "COUNSELLOR" ? "No leads currently assigned to you" : "No leads found matching your criteria"}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {user.role === "COUNSELLOR" ? "When the admin assigns leads to you, they will appear here." : "Inbound student enquiries will appear in this table."}
                    </p>
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
