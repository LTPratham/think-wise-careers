"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PhoneCall, Calendar, Clock, XCircle, CheckCircle, HelpCircle, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const DISPOSITIONS = [
  { id: "INTERESTED", label: "Interested / Hot Lead", icon: Sparkles, color: "hover:bg-emerald-50 text-emerald-700 border-emerald-200" },
  { id: "CALLBACK", label: "Callback Requested", icon: Clock, color: "hover:bg-amber-50 text-amber-700 border-amber-200" },
  { id: "NO_ANSWER", label: "Ringing / No Answer", icon: PhoneCall, color: "hover:bg-orange-50 text-orange-700 border-orange-200" },
  { id: "NOT_INTERESTED", label: "Not Interested / Junk", icon: XCircle, color: "hover:bg-red-50 text-red-700 border-red-200" },
  { id: "ENROLLED", label: "Enrolled / Converted", icon: CheckCircle, color: "hover:bg-purple-50 text-purple-700 border-purple-200" },
];

export function CallDispositionBar({
  leadId,
  currentDisposition,
}: {
  leadId: string;
  currentDisposition?: string | null;
}) {
  const [activeDisposition, setActiveDisposition] = useState(currentDisposition || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDisp, setSelectedDisp] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [callbackDate, setCallbackDate] = useState("");
  const router = useRouter();

  async function submitDisposition(dispositionId: string, customNote = "", cbDate = "") {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/disposition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          disposition: dispositionId,
          noteText: customNote || undefined,
          callbackDate: cbDate || undefined,
        }),
      });

      if (!res.ok) throw new Error("Failed to log disposition");
      setActiveDisposition(dispositionId);
      setSelectedDisp(null);
      setNoteText("");
      setCallbackDate("");
      toast.success("Call outcome logged and status updated!");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Error logging call outcome");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleQuickClick(dId: string) {
    if (dId === "CALLBACK" || dId === "INTERESTED") {
      setSelectedDisp(dId);
    } else {
      submitDisposition(dId);
    }
  }

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <PhoneCall className="w-3.5 h-3.5 text-primary" /> 1-Click Call Outcome Dispositions
        </span>
        {activeDisposition && (
          <span className="text-xs font-medium text-slate-500">
            Last logged: <strong className="text-slate-800">{activeDisposition}</strong>
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {DISPOSITIONS.map((d) => {
          const Icon = d.icon;
          const isSelected = activeDisposition === d.id;
          return (
            <button
              key={d.id}
              type="button"
              disabled={isSubmitting}
              onClick={() => handleQuickClick(d.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${d.color} ${
                isSelected ? "ring-2 ring-primary/40 bg-slate-100 shadow-sm" : "bg-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {d.label}
            </button>
          );
        })}
      </div>

      {/* Popover / Form if callback or extra note needed */}
      {selectedDisp && (
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <p className="text-xs font-medium text-slate-700">
            Add notes for outcome: <strong>{DISPOSITIONS.find((d) => d.id === selectedDisp)?.label}</strong>
          </p>
          
          {selectedDisp === "CALLBACK" && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
                Requested Callback Date & Time
              </label>
              <Input
                type="datetime-local"
                value={callbackDate}
                onChange={(e) => setCallbackDate(e.target.value)}
                className="max-w-xs text-xs"
              />
            </div>
          )}

          <div>
            <Textarea
              placeholder="Add brief details about the phone call discussion..."
              rows={2}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button size="sm" variant="ghost" className="text-xs h-7" onClick={() => setSelectedDisp(null)}>
              Cancel
            </Button>
            <Button
              size="sm"
              className="text-xs h-7"
              disabled={isSubmitting}
              onClick={() => submitDisposition(selectedDisp, noteText, callbackDate)}
            >
              Save Outcome & Notes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
