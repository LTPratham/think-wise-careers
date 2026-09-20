import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/rbac";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { Users, Shield, UserCheck, Calendar as CalendarIcon, Mail, CheckCircle2 } from "lucide-react";
import { CreateTeamMemberModal } from "@/components/admin/CreateTeamMemberModal";

export default async function AdminTeamPage() {
  const auth = await requireAdmin();
  if (auth instanceof Response) {
    redirect("/login");
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      lastLoginAt: true,
      createdAt: true,
      _count: {
        select: {
          assignedLeads: true,
          assignedBookings: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-outfit text-slate-900">Team & Counsellor Management</h2>
          <p className="text-slate-500 mt-1">Manage staff accounts, counsellor roles, and workload delegation.</p>
        </div>
        <CreateTeamMemberModal />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Name & Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Assigned Leads</th>
                <th className="px-6 py-4">Assigned Meetings</th>
                <th className="px-6 py-4">Last Login</th>
                <th className="px-6 py-4">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{u.name}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{u.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
                      u.role === "ADMIN" ? "bg-purple-100 text-purple-700" :
                      u.role === "COUNSELLOR" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-700"
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      u.status === "ACTIVE" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-900">{u._count.assignedLeads}</span>
                    <span className="text-slate-400 text-xs ml-1">leads</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-900">{u._count.assignedBookings}</span>
                    <span className="text-slate-400 text-xs ml-1">meetings</span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs whitespace-nowrap">
                    {u.lastLoginAt ? format(new Date(u.lastLoginAt), "MMM d, yyyy HH:mm") : "Never"}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs whitespace-nowrap">
                    {format(new Date(u.createdAt), "MMM d, yyyy")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
