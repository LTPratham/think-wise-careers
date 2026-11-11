import { prisma } from "@/lib/prisma";
import { requireTeamMember } from "@/lib/rbac";
import { redirect } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { 
  Search, 
  Eye, 
  Download, 
  UserCheck, 
  MessageSquare, 
  AlertCircle, 
  CreditCard, 
  Home, 
  GraduationCap, 
  Globe, 
  ShieldCheck,
  Stethoscope
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function getServiceBadge(serviceInterest: string | null) {
  const service = (serviceInterest || "").toLowerCase();

  if (service.includes("loan") || service.includes("finance")) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">
        <CreditCard className="w-3.5 h-3.5 text-amber-600" />
        <span>Education Loan</span>
      </span>
    );
  }

  if (service.includes("accommodation") || service.includes("housing")) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
        <Home className="w-3.5 h-3.5 text-emerald-600" />
        <span>Accommodation</span>
      </span>
    );
  }

  if (service.includes("toefl") || service.includes("voucher") || service.includes("ets")) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs">
        <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
        <span>TOEFL Voucher</span>
      </span>
    );
  }

  if (service.includes("mbbs") || service.includes("medical")) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
        <Stethoscope className="w-3.5 h-3.5 text-rose-600" />
        <span>MBBS Abroad</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
      <Globe className="w-3.5 h-3.5 text-blue-600" />
      <span>{serviceInterest || "Study Abroad"}</span>
    </span>
  );
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; assigned?: string; service?: string }>;
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
  const serviceFilter = params.service || "";

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

  if (serviceFilter) {
    whereClause.serviceInterest = { contains: serviceFilter, mode: "insensitive" };
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

  // Base filter url helper
  const getFilterUrl = (newParams: Record<string, string | undefined>) => {
    const current = new URLSearchParams();
    if (query) current.set("q", query);
    if (statusFilter) current.set("status", statusFilter);
    if (assignedFilter) current.set("assigned", assignedFilter);
    if (serviceFilter) current.set("service", serviceFilter);

    Object.entries(newParams).forEach(([k, v]) => {
      if (v === undefined || v === "") {
        current.delete(k);
      } else {
        current.set(k, v);
      }
    });

    const str = current.toString();
    return str ? `/admin/leads?${str}` : "/admin/leads";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-outfit text-slate-900">
            {user.role === "COUNSELLOR" ? "My Assigned Leads" : "Lead Management CRM"}
          </h2>
          <p className="text-slate-500 mt-1">
            {user.role === "COUNSELLOR" 
              ? `Welcome ${user.name}. Here are the student leads assigned to you by the administrator.` 
              : "Unified CRM for all student enquiries across Study Abroad, Education Loans, Accommodation, and TOEFL Vouchers."}
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

      {/* Service Filter Tabs (Single CRM indicator & segmentation) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2">
          Service:
        </span>
        <Button 
          variant={serviceFilter === "" ? "default" : "outline"} 
          size="sm" 
          className="rounded-full text-xs h-8"
          asChild
        >
          <Link href={getFilterUrl({ service: undefined })}>All Leads</Link>
        </Button>
        <Button 
          variant={serviceFilter.toLowerCase().includes("loan") ? "default" : "outline"} 
          size="sm" 
          className={`rounded-full text-xs h-8 ${serviceFilter.toLowerCase().includes("loan") ? "bg-amber-600 hover:bg-amber-700 text-white" : ""}`}
          asChild
        >
          <Link href={getFilterUrl({ service: "Loan" })}>
            <CreditCard className="w-3.5 h-3.5 mr-1 text-amber-500" />
            Education Loans
          </Link>
        </Button>
        <Button 
          variant={serviceFilter.toLowerCase().includes("accommodation") ? "default" : "outline"} 
          size="sm" 
          className={`rounded-full text-xs h-8 ${serviceFilter.toLowerCase().includes("accommodation") ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}`}
          asChild
        >
          <Link href={getFilterUrl({ service: "Accommodation" })}>
            <Home className="w-3.5 h-3.5 mr-1 text-emerald-500" />
            Accommodation
          </Link>
        </Button>
        <Button 
          variant={serviceFilter.toLowerCase().includes("toefl") ? "default" : "outline"} 
          size="sm" 
          className={`rounded-full text-xs h-8 ${serviceFilter.toLowerCase().includes("toefl") ? "bg-purple-600 hover:bg-purple-700 text-white" : ""}`}
          asChild
        >
          <Link href={getFilterUrl({ service: "TOEFL" })}>
            <GraduationCap className="w-3.5 h-3.5 mr-1 text-purple-500" />
            TOEFL Vouchers
          </Link>
        </Button>
        <Button 
          variant={serviceFilter.toLowerCase().includes("study abroad") ? "default" : "outline"} 
          size="sm" 
          className={`rounded-full text-xs h-8 ${serviceFilter.toLowerCase().includes("study abroad") ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
          asChild
        >
          <Link href={getFilterUrl({ service: "Study Abroad" })}>
            <Globe className="w-3.5 h-3.5 mr-1 text-blue-500" />
            Study Abroad
          </Link>
        </Button>
      </div>

      {/* Search and Status Filters */}
      <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 flex flex-wrap gap-4 items-center">
        <form className="flex-1 min-w-[200px] flex gap-2" action="/admin/leads" method="GET">
          {serviceFilter && <input type="hidden" name="service" value={serviceFilter} />}
          {statusFilter && <input type="hidden" name="status" value={statusFilter} />}
          {assignedFilter && <input type="hidden" name="assigned" value={assignedFilter} />}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input name="q" defaultValue={query} placeholder="Search by name, email, or phone..." className="pl-9" />
          </div>
          <Button type="submit" variant="secondary">Search</Button>
        </form>
        <div className="flex flex-wrap gap-2">
          <Button variant={statusFilter === "" ? "default" : "outline"} size="sm" asChild>
            <Link href={getFilterUrl({ status: undefined })}>All Statuses</Link>
          </Button>
          <Button variant={statusFilter === "NEW" ? "default" : "outline"} size="sm" asChild>
            <Link href={getFilterUrl({ status: "NEW" })}>New</Link>
          </Button>
          <Button variant={statusFilter === "CONTACTED" ? "default" : "outline"} size="sm" asChild>
            <Link href={getFilterUrl({ status: "CONTACTED" })}>Contacted</Link>
          </Button>
          <Button variant={statusFilter === "CONSULTATION_BOOKED" ? "default" : "outline"} size="sm" asChild>
            <Link href={getFilterUrl({ status: "CONSULTATION_BOOKED" })}>Booked</Link>
          </Button>
        </div>
      </div>

      {/* Main Unified Leads Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Name / Contact</th>
                <th className="px-6 py-4">Service Category</th>
                {isAdmin && <th className="px-6 py-4">Assigned Counsellor</th>}
                <th className="px-6 py-4">Lead Status</th>
                <th className="px-6 py-4">Source Page</th>
                <th className="px-6 py-4">Notes</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{lead.name}</span>
                      {lead.phoneVerified && (
                        <span title="OTP Verified Phone" className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified
                        </span>
                      )}
                    </div>
                    <div className="text-slate-500 text-xs mt-0.5">{lead.email}</div>
                    <div className="text-slate-500 text-xs font-mono">{lead.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    {getServiceBadge(lead.serviceInterest)}
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
                  <td className="px-6 py-4 text-xs text-slate-500">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium text-slate-600">
                      {lead.sourcePage || "Website Form"}
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
                  <td colSpan={isAdmin ? 8 : 7} className="px-6 py-12 text-center text-slate-500">
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
