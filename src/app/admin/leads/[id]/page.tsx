import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { ChevronLeft, Mail, Phone, MapPin, Calendar, Clock, AlertTriangle } from "lucide-react";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const lead = await prisma.lead.findUnique({
    where: { id: (await params).id },
    include: {
      touchpoints: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!lead) notFound();

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/admin/leads" className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <h2 className="text-2xl font-bold font-outfit text-slate-900">Lead Details</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Left Column: Contact Info */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Full Name</p>
                <p className="font-semibold text-slate-900">{lead.name}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-slate-400" />
                <a href={`mailto:${lead.email}`} className="text-primary hover:underline">{lead.email}</a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-slate-400" />
                <a href={`tel:${lead.phone}`} className="text-slate-700 hover:underline">{lead.phone}</a>
              </div>
              
              <hr className="my-4 border-slate-100" />
              
              <div>
                <p className="text-sm font-medium text-slate-500 mb-2">Update Status</p>
                <LeadStatusSelect leadId={lead.id} currentStatus={lead.status} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg">Lead Attributes</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Qualification</span>
                <span className={`px-2 py-0.5 rounded font-medium ${lead.qualificationFlag === 'QUALIFIED' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                  {lead.qualificationFlag}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Service Interest</span>
                <span className="font-medium text-slate-900">{lead.serviceInterest || "General"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">First Seen</span>
                <span className="text-slate-700">{format(new Date(lead.createdAt), "MMM d, yyyy")}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Message & Touchpoints */}
        <div className="md:col-span-2 space-y-6">
          
          <Card>
            <CardHeader>
              <CardTitle>Initial Enquiry Message</CardTitle>
            </CardHeader>
            <CardContent>
              {lead.message ? (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-slate-700 whitespace-pre-wrap">
                  {lead.message}
                </div>
              ) : (
                <p className="text-slate-500 italic">No message provided during initial enquiry.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Activity & Touchpoints</CardTitle>
              {lead.isDuplicate && (
                <div className="flex items-center text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-xs font-semibold border border-amber-200">
                  <AlertTriangle className="w-3 h-3 mr-1" /> Repeated Enquiries Detected
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="relative border-l-2 border-slate-200 ml-3 space-y-8 pb-4">
                {lead.touchpoints.map((tp, idx) => (
                  <div key={tp.id} className="relative pl-6">
                    <div className="absolute w-4 h-4 bg-white border-2 border-primary rounded-full -left-[9px] top-1" />
                    <div className="flex items-center space-x-2 text-sm text-slate-500 mb-1">
                      <Calendar className="w-3 h-3" />
                      <span>{format(new Date(tp.createdAt), "MMM d, yyyy 'at' h:mm a")}</span>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                      <p className="font-semibold text-slate-900 mb-1">Via {tp.channel.replace("_", " ")}</p>
                      <p className="text-sm text-slate-600">
                        Source Page: <span className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">{tp.sourcePage}</span>
                      </p>
                      {tp.campaignData && (
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          <p className="text-xs text-slate-500 font-mono break-all">
                            {JSON.stringify(tp.campaignData)}
                          </p>
                        </div>
                      )}
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
