import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Globe, BookOpen, ShieldAlert } from "lucide-react";

export default async function AdminDashboardPage() {
  // Fetch some quick stats from the database
  const [leadCount, countryCount, mbbsCount, uniCount] = await Promise.all([
    prisma.lead.count(),
    prisma.country.count(),
    prisma.mBBSCountry.count(),
    prisma.university.count(),
  ]);

  const recentLeads = await prisma.lead.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { touchpoints: true },
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold font-outfit tracking-tight text-slate-900">Dashboard</h2>
        <p className="text-slate-500 mt-1">Overview of your platform's performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{leadCount}</div>
            <p className="text-xs text-slate-500 mt-1">All time enquiries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Study Abroad Dest.</CardTitle>
            <Globe className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{countryCount}</div>
            <p className="text-xs text-slate-500 mt-1">Published or Draft pages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">MBBS Destinations</CardTitle>
            <ShieldAlert className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{mbbsCount}</div>
            <p className="text-xs text-slate-500 mt-1">Published or Draft pages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Universities DB</CardTitle>
            <BookOpen className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{uniCount}</div>
            <p className="text-xs text-slate-500 mt-1">Total partner universities</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-slate-900">{lead.name}</p>
                    <p className="text-sm text-slate-500">{lead.email} • {lead.phone}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {lead.status}
                    </span>
                    <p className="text-xs text-slate-400 mt-1">{new Date(lead.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
              {recentLeads.length === 0 && (
                <p className="text-sm text-slate-500 py-4">No leads received yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
