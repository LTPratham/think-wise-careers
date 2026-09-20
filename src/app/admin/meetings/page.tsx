import { prisma } from "@/lib/prisma";
import { requireTeamMember } from "@/lib/rbac";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Phone, Video, MapPin, Search, Filter, MessageSquare, CheckCircle2, UserCheck, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { MeetingActions } from "@/components/admin/MeetingActions";

export default async function AdminMeetingsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; view?: string }>;
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
  const viewFilter = params.view || "all";

  const whereClause: any = {};

  // Strict role isolation: Counsellors ONLY see their assigned meetings
  if (user.role === "COUNSELLOR") {
    whereClause.assignedToId = user.id;
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

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  if (viewFilter === "today") {
    whereClause.date = { gte: todayStart, lte: todayEnd };
  } else if (viewFilter === "upcoming") {
    whereClause.date = { gte: todayStart };
    whereClause.status = { notIn: ["COMPLETED", "CANCELLED"] };
  }

  // Base query for counts
  const baseCountWhere: any = {};
  if (user.role === "COUNSELLOR") {
    baseCountWhere.assignedToId = user.id;
  }

  const [bookings, teamMembers, todayCount, upcomingCount] = await Promise.all([
    prisma.consultationBooking.findMany({
      where: whereClause,
      orderBy: [{ date: "asc" }, { createdAt: "desc" }],
      include: {
        assignedTo: {
          select: { id: true, name: true, role: true },
        },
      },
    }),
    isAdmin
      ? prisma.user.findMany({
          where: { status: "ACTIVE" },
          select: { id: true, name: true, role: true },
          orderBy: { name: "asc" },
        })
      : Promise.resolve([]),
    prisma.consultationBooking.count({
      where: {
        ...baseCountWhere,
        date: { gte: todayStart, lte: todayEnd },
      },
    }),
    prisma.consultationBooking.count({
      where: {
        ...baseCountWhere,
        date: { gte: todayStart },
        status: { notIn: ["COMPLETED", "CANCELLED"] },
      },
    }),
  ]);

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-outfit text-slate-900">
            {isAdmin ? "Consultation Calendar & Meetings" : "My Scheduled Calls & Consultations"}
          </h2>
          <p className="text-slate-500 mt-1">
            {isAdmin 
              ? "Oversee and assign all student calls, video meets, and office visits across the team."
              : `Welcome ${user.name}. Here are the consultation calls and meetings assigned to you.`}
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {isAdmin ? "Team Calls Today" : "My Calls Today"}
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{todayCount} Calls / Meets</h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <CalendarIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Upcoming Pending</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{upcomingCount} Upcoming</h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Scheduled</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{bookings.length} Filtered</h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap gap-4 items-center justify-between">
        <form className="flex-1 min-w-[220px] flex gap-2" action="/admin/meetings" method="GET">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input name="q" defaultValue={query} placeholder="Search student name, phone, email, country..." className="pl-9" />
          </div>
          <Button type="submit" variant="secondary">Search</Button>
        </form>

        <div className="flex flex-wrap gap-2">
          <Button variant={viewFilter === "all" ? "default" : "outline"} size="sm" asChild>
            <Link href="/admin/meetings?view=all">All</Link>
          </Button>
          <Button variant={viewFilter === "today" ? "default" : "outline"} size="sm" asChild>
            <Link href="/admin/meetings?view=today">Today Only</Link>
          </Button>
          <Button variant={viewFilter === "upcoming" ? "default" : "outline"} size="sm" asChild>
            <Link href="/admin/meetings?view=upcoming">Upcoming</Link>
          </Button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.map((b) => {
          const formattedDate = format(new Date(b.date), "EEEE, MMM d, yyyy");
          const whatsappUrl = `https://wa.me/${b.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(b.name)},%20I%20am%20calling%20from%20Think%20Wise%20Careers%20regarding%20your%20consultation.`;

          return (
            <div key={b.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:border-slate-300 transition-all">
              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 pb-4 border-b border-slate-100">
                
                {/* Student Info */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-base shrink-0 mt-0.5">
                    {b.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-slate-900 text-base">{b.name}</h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                        b.status === "CONFIRMED" ? "bg-blue-100 text-blue-700" :
                        b.status === "COMPLETED" ? "bg-green-100 text-green-700" :
                        b.status === "CANCELLED" ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"
                      }`}>
                        {b.status}
                      </span>
                      {isAdmin && b.assignedTo && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                          <UserCheck className="w-3 h-3" /> Assigned: {b.assignedTo.name}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                      <span>📞 <a href={`tel:${b.phone}`} className="text-slate-700 hover:text-primary font-medium">{b.phone}</a></span>
                      <span>✉️ <a href={`mailto:${b.email}`} className="text-slate-700 hover:text-primary">{b.email}</a></span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm" asChild className="bg-[#25D366] hover:bg-[#1ebd5a] text-white text-xs h-8">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      💬 WhatsApp
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild className="text-xs h-8">
                    <a href={`tel:${b.phone}`}>
                      📞 Start Call
                    </a>
                  </Button>
                </div>
              </div>

              {/* Appointment Slot Details & Brief */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs text-slate-600">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-700 block mb-1">📅 Scheduled Slot:</span>
                  <div className="font-medium text-slate-900 text-sm">{formattedDate}</div>
                  <div className="text-slate-500 mt-0.5">{b.timeSlot}</div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-700 block mb-1">🎯 Focus & Mode:</span>
                  <div className="font-medium text-slate-900">{b.serviceInterest || "General Guidance"}</div>
                  <div className="text-slate-500 mt-0.5">
                    Mode: {b.mode === "PHONE_CALL" ? "📞 Phone Call" : b.mode === "GOOGLE_MEET" ? "💻 Google Meet Video" : "🏢 Jaipur Office"}
                  </div>
                  {(b.targetCountry || b.targetDegree) && (
                    <div className="text-slate-500 mt-0.5">Target: {b.targetCountry} {b.targetDegree ? `(${b.targetDegree})` : ""}</div>
                  )}
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col justify-between">
                  <div>
                    <span className="font-semibold text-slate-700 block mb-1">📝 Student's Submitted Notes:</span>
                    <p className="text-slate-700 italic">{b.notes || "No extra note entered by student."}</p>
                  </div>
                  <div className="pt-2">
                    <MeetingActions 
                      bookingId={b.id} 
                      currentStatus={b.status} 
                      assignedToId={b.assignedToId} 
                      teamMembers={teamMembers} 
                      isAdmin={isAdmin}
                      phone={b.phone}
                      mode={b.mode}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {bookings.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            <AlertCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="font-medium text-slate-700">
              {user.role === "COUNSELLOR" ? "No meetings currently assigned to you" : "No consultation bookings found"}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {user.role === "COUNSELLOR" ? "When the admin assigns a meeting or call to you, it will appear here." : "Bookings made by students will appear in this calendar view."}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
