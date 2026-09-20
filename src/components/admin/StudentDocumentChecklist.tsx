"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Clock, ShieldCheck, FileText, AlertCircle } from "lucide-react";

type DocItem = {
  id: string;
  name: string;
  status: "PENDING" | "RECEIVED" | "VERIFIED";
};

const DEFAULT_DOCUMENTS: DocItem[] = [
  { id: "marksheet", name: "10th & 12th Academic Marksheets", status: "PENDING" },
  { id: "passport", name: "Valid Passport Copy (Front & Back)", status: "PENDING" },
  { id: "neet_degree", name: "NEET Scorecard / Graduation Degree", status: "PENDING" },
  { id: "english_test", name: "IELTS / PTE / English Test Score", status: "PENDING" },
  { id: "offer_letter", name: "University Offer / Admission Letter", status: "PENDING" },
  { id: "visa_stamped", name: "Student Visa Stamping & Flight Ticket", status: "PENDING" },
];

export function StudentDocumentChecklist({
  leadId,
  initialDocuments = [],
}: {
  leadId: string;
  initialDocuments?: any;
}) {
  const parsedDocs: DocItem[] = Array.isArray(initialDocuments) && initialDocuments.length > 0
    ? DEFAULT_DOCUMENTS.map((def) => {
        const found = initialDocuments.find((d: any) => d.id === def.id);
        return found ? found : def;
      })
    : DEFAULT_DOCUMENTS;

  const [docs, setDocs] = useState<DocItem[]>(parsedDocs);
  const [isUpdating, setIsUpdating] = useState(false);

  async function toggleStatus(docId: string) {
    const updated = docs.map((d) => {
      if (d.id === docId) {
        const nextStatus: "PENDING" | "RECEIVED" | "VERIFIED" =
          d.status === "PENDING" ? "RECEIVED" : d.status === "RECEIVED" ? "VERIFIED" : "PENDING";
        return { ...d, status: nextStatus };
      }
      return d;
    });

    setDocs(updated);
    setIsUpdating(true);

    try {
      const res = await fetch(`/api/admin/leads/${leadId}/documents`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documents: updated }),
      });

      if (!res.ok) throw new Error("Failed to update checklist");
      toast.success("Document status updated!");
    } catch (err) {
      toast.error("Error saving document checklist");
    } finally {
      setIsUpdating(false);
    }
  }

  const verifiedCount = docs.filter((d) => d.status === "VERIFIED").length;
  const receivedCount = docs.filter((d) => d.status === "RECEIVED").length;
  const progressPercent = Math.round(((verifiedCount + receivedCount * 0.5) / docs.length) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Application Document Readiness
          </span>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Click status pill to toggle: <strong>Pending ➔ Received ➔ Verified</strong>
          </p>
        </div>
        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
          {progressPercent}% Ready
        </span>
      </div>

      {/* Progress Line */}
      <div className="bg-slate-100 h-1.5 w-full rounded-full overflow-hidden">
        <div
          className="bg-indigo-600 h-1.5 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="divide-y divide-slate-100 text-xs">
        {docs.map((doc) => (
          <div key={doc.id} className="py-2.5 flex items-center justify-between gap-2">
            <span className="font-medium text-slate-800 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {doc.name}
            </span>

            <button
              type="button"
              disabled={isUpdating}
              onClick={() => toggleStatus(doc.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all shrink-0 flex items-center gap-1 ${
                doc.status === "VERIFIED"
                  ? "bg-green-100 text-green-800 hover:bg-green-200 border border-green-300"
                  : doc.status === "RECEIVED"
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-300"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              {doc.status === "VERIFIED" && <ShieldCheck className="w-3 h-3 text-green-700" />}
              {doc.status === "RECEIVED" && <CheckCircle2 className="w-3 h-3 text-blue-700" />}
              {doc.status === "PENDING" && <Clock className="w-3 h-3 text-slate-400" />}
              {doc.status}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
