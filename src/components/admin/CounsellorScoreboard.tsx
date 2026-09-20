import { Users, Award, Calendar, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type CounsellorMetric = {
  id: string;
  name: string;
  email: string;
  role: string;
  assignedLeadsCount: number;
  assignedBookingsCount: number;
  completedBookingsCount: number;
};

export function CounsellorScoreboard({ counsellors }: { counsellors: CounsellorMetric[] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-base font-outfit text-slate-900">
            Counsellor Team Performance Scoreboard
          </h3>
        </div>
        <Button variant="ghost" size="sm" asChild className="text-xs">
          <Link href="/admin/team">Manage Team →</Link>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-y border-slate-100 uppercase tracking-wider">
            <tr>
              <th className="py-2.5 px-3">Counsellor</th>
              <th className="py-2.5 px-3">Active Leads</th>
              <th className="py-2.5 px-3">Meetings Scheduled</th>
              <th className="py-2.5 px-3">Completed</th>
              <th className="py-2.5 px-3 text-right">Quick Filter</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {counsellors.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="py-3 px-3">
                  <span className="font-semibold text-slate-900 block">{c.name}</span>
                  <span className="text-slate-400 text-[11px]">{c.email}</span>
                </td>
                <td className="py-3 px-3 font-semibold text-slate-800">
                  {c.assignedLeadsCount} leads
                </td>
                <td className="py-3 px-3 font-semibold text-indigo-700">
                  {c.assignedBookingsCount} calls/meets
                </td>
                <td className="py-3 px-3 font-semibold text-green-700">
                  {c.completedBookingsCount} done
                </td>
                <td className="py-3 px-3 text-right">
                  <Button variant="outline" size="sm" asChild className="h-6 text-[11px]">
                    <Link href={`/admin/leads?assigned=${c.id}`}>View Leads</Link>
                  </Button>
                </td>
              </tr>
            ))}

            {counsellors.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-slate-400 italic">
                  No counsellor accounts created yet. Add counsellors in Team & Staff tab.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
