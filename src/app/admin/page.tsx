import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Globe, BookOpen, Calendar, Clock, Phone, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import { QuickAccessQR } from "@/components/admin/QuickAccessQR";
import { Button } from "@/components/ui/button";

export default async function AdminDashboardPage() {
  const [leadCount, bookingCount, upcomingMeetingsCount, teamCount] = await Promise.all([
    prisma.lead.count(),
    prisma.consultationBooking.count(),
    prisma.consultationBooking.count({
      where: {
        date: { gte: new Date() },
        status: { notIn: ["COMPLETED", "CANCELLED"] },
      },
    }),
    prisma.user.count({ where: { status: "ACTIVE" } }),
  ]);

  const [recentLeads, recentBookings] = await Promise.all([
    prisma.lead.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        assignedTo: { select: { name: true } },
      },
    }),
    prisma.consultationBooking.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
      include: {
        assignedTo: { select: { name: true } },
      },
    }),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thinkwisecareers.com";

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-outfit tracking-tight text-slate-900">Executive CRM Dashboard</h2>
          <p className="text-slate-500 mt-1">Overview of student leads, scheduled consultations, and counsellor activity.</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" asChild variant="outline">
            <Link href="/admin/meetings">
              <Calendar className="w-4 h-4 mr-2 text-primary" /> View Calendar
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/admin/leads">
              <Users className="w-4 h-4 mr-2" /> View All Leads
            </Link>
          </Button>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Inbound Leads</CardTitle>
            <Users className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{leadCount}</div>
            <p className="text-xs text-slate-500 mt-1">All time enquiries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
            <Calendar className="w-4 h-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">{upcomingMeetingsCount}</div>
            <p className="text-xs text-slate-500 mt-1">Pending calls & meets</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Consultations</CardTitle>
            <Clock className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{bookingCount}</div>
            <p className="text-xs text-slate-500 mt-1">Booked via /schedule</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Team Staff</CardTitle>
            <Shield className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{teamCount}</div>
            <p className="text-xs text-slate-500 mt-1">Advisors & Counsellors</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Recent Meetings, Recent Leads & QR Connect Widget */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Recent Scheduled Consultations */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-outfit flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" /> Latest Scheduled Consultations
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/meetings">View Calendar →</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBookings.map((b) => (
                <div key={b.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{b.name}</span>
                      <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                        b.status === "CONFIRMED" ? "bg-blue-100 text-blue-700" :
                        b.status === "COMPLETED" ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-700"
                      }`}>
                        {b.status}
                      </span>
                    </div>
                    <p className="text-slate-500 mt-0.5">
                      📅 {new Date(b.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })} at {b.timeSlot} · {b.serviceInterest || "General"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button size="sm" variant="outline" asChild className="h-7 text-[11px]">
                      <a href={`tel:${b.phone}`}>📞 {b.phone}</a>
                    </Button>
                    <Button size="sm" asChild className="h-7 text-[11px] bg-[#25D366] hover:bg-[#1ebd5a] text-white">
                      <a href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer">
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              ))}

              {recentBookings.length === 0 && (
                <p className="text-sm text-slate-400 py-6 text-center italic">No consultation bookings received yet.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Access QR Code Widget */}
        <div className="lg:col-span-1">
          <QuickAccessQR siteUrl={siteUrl} />
        </div>

      </div>

      {/* Recent Leads Row */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-outfit flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" /> Latest Inbound Leads
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/leads">View All Leads →</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-slate-100">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{lead.name}</p>
                  <p className="text-slate-500 mt-0.5">{lead.email} • {lead.phone} • {lead.serviceInterest || "General"}</p>
                </div>
                <div className="flex items-center gap-3">
                  {lead.assignedTo ? (
                    <span className="text-[11px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-medium border border-purple-200">
                      {lead.assignedTo.name}
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400 italic">Unassigned</span>
                  )}
                  <span className={`px-2.5 py-0.5 rounded-full font-semibold text-[11px] ${
                    lead.status === 'NEW' ? 'bg-blue-100 text-blue-800' :
                    lead.status === 'CONTACTED' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {lead.status}
                  </span>
                  <Button variant="ghost" size="sm" asChild className="h-7 text-xs">
                    <Link href={`/admin/leads/${lead.id}`}>View</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
