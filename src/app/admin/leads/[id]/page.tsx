import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { ChevronLeft, Mail, Phone, Calendar, AlertTriangle, UserCheck, MessageSquare, FileCheck } from "lucide-react";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";
import { LeadCounsellorSelect } from "@/components/admin/LeadCounsellorSelect";
import { LeadNotesSection } from "@/components/admin/LeadNotesSection";
import { CallDispositionBar } from "@/components/admin/CallDispositionBar";
import { QuickScheduleModal } from "@/components/admin/QuickScheduleModal";
import { StudentDocumentChecklist } from "@/components/admin/StudentDocumentChecklist";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireTeamMember } from "@/lib/rbac";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const auth = await requireTeamMember();
  if (auth instanceof Response) {
    redirect("/login");
  }

  const { user } = auth;
  const isAdmin = user.role === "ADMIN";
  const { id } = await params;

  const [lead, teamMembers] = await Promise.all([
    prisma.lead.findUnique({
      where: { id },
      include: {
        touchpoints: {
          orderBy: { timestamp: "desc" },
        },
        notes: {
          include: {
            author: {
              select: { name: true, role: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
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
  ]);

  if (!lead) notFound();

  // Strict Security Check: If logged in as Counsellor, must be assigned to this lead!
  if (user.role === "COUNSELLOR" && lead.assignedToId !== user.id) {
    redirect("/admin/leads");
  }

  const whatsappUrl = `https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(lead.name)},%20I%20am%20calling%20from%20Think%20Wise%20Careers%20regarding%20your%20enquiry.`;

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Top Bar with 1-Click Schedule, Call & WhatsApp */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link href="/admin/leads" className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold font-outfit text-slate-900">{lead.name}</h2>
            <p className="text-xs text-slate-500">Lead ID: {lead.id}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* 1-Click Schedule Meeting Modal */}
          <QuickScheduleModal
            leadId={lead.id}
            leadName={lead.name}
            leadPhone={lead.phone}
            leadEmail={lead.email}
          />

          <Button size="sm" asChild className="bg-[#25D366] hover:bg-[#1ebd5a] text-white text-xs h-8">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              💬 WhatsApp
            </a>
          </Button>

          <Button size="sm" variant="outline" asChild className="text-xs h-8">
            <a href={`tel:${lead.phone}`}>
              📞 Call Student
            </a>
          </Button>
        </div>
      </div>

      {/* 1-Click Call Outcome Dispositions */}
      <CallDispositionBar leadId={lead.id} currentDisposition={lead.disposition} />

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Left Column: Contact & Assignment Info */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-outfit">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Full Name</p>
                <p className="font-semibold text-slate-900">{lead.name}</p>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-slate-400" />
                <a href={`mailto:${lead.email}`} className="text-primary hover:underline">{lead.email}</a>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-slate-400" />
                <a href={`tel:${lead.phone}`} className="text-slate-700 hover:underline">{lead.phone}</a>
              </div>
              
              <hr className="my-4 border-slate-100" />
              
              {/* Super Admin ONLY: Assign Counsellor */}
              {isAdmin && (
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Assign Counsellor</p>
                  <LeadCounsellorSelect leadId={lead.id} currentAssignedId={lead.assignedToId} teamMembers={teamMembers} />
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Update Lead Status</p>
                <LeadStatusSelect leadId={lead.id} currentStatus={lead.status} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-outfit">Lead Attributes</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Qualification</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${lead.qualificationFlag === 'QUALIFIED' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-slate-100 text-slate-600'}`}>
                  {lead.qualificationFlag}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Service Interest</span>
                <span className="font-semibold text-slate-900">{lead.serviceInterest || "General"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Source Page</span>
                <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">{lead.sourcePage || "Direct"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">First Enquired</span>
                <span className="text-slate-700">{format(new Date(lead.createdAt), "MMM d, yyyy")}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Call Notes, Document Readiness & Timeline */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Call Notes Logger */}
          <Card className="border-indigo-100 shadow-sm">
            <CardHeader className="bg-indigo-50/50 border-b border-indigo-100">
              <CardTitle className="text-base flex items-center gap-2 text-indigo-950 font-outfit">
                <MessageSquare className="w-4 h-4 text-indigo-600" /> Counsellor Call Notes & Follow-Up History
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <LeadNotesSection leadId={lead.id} initialNotes={lead.notes} />
            </CardContent>
          </Card>

          {/* Student Document Checklist */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-100">
              <CardTitle className="text-base flex items-center gap-2 text-slate-900 font-outfit">
                <FileCheck className="w-4 h-4 text-indigo-600" /> Student Application Documents Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <StudentDocumentChecklist leadId={lead.id} initialDocuments={lead.documents} />
            </CardContent>
          </Card>

          {/* Student's Initial Message (Read Only) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-outfit">Student's Initial Enquiry Message</CardTitle>
            </CardHeader>
            <CardContent>
              {lead.message ? (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-slate-700 whitespace-pre-wrap text-sm">
                  {lead.message}
                </div>
              ) : (
                <p className="text-slate-400 text-xs italic">No message provided during initial enquiry.</p>
              )}
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-outfit">Activity & Touchpoints</CardTitle>
              {lead.duplicateFlag && (
                <div className="flex items-center text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-xs font-semibold border border-amber-200">
                  <AlertTriangle className="w-3 h-3 mr-1" /> Returning Lead
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="relative border-l-2 border-slate-200 ml-3 space-y-6 pb-2">
                {lead.touchpoints.map((tp) => (
                  <div key={tp.id} className="relative pl-6">
                    <div className="absolute w-3.5 h-3.5 bg-white border-2 border-primary rounded-full -left-[8px] top-1" />
                    <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
                      <Calendar className="w-3 h-3" />
                      <span>{format(new Date(tp.timestamp), "MMM d, yyyy 'at' h:mm a")}</span>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs shadow-sm">
                      <p className="font-semibold text-slate-900 mb-0.5">Via {tp.channel.replace("_", " ")}</p>
                      <p className="text-slate-600">
                        Source: <span className="font-mono text-[11px] bg-slate-100 px-1 py-0.5 rounded">{tp.sourcePage}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
