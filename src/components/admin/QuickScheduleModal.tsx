"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Phone, Video, MapPin, X, CheckCircle, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const TIME_SLOTS = [
  "10:00 AM - 10:30 AM",
  "11:30 AM - 12:00 PM",
  "02:00 PM - 02:30 PM",
  "03:30 PM - 04:00 PM",
  "05:00 PM - 05:30 PM",
  "06:30 PM - 07:00 PM",
];

const MODES = [
  { id: "PHONE_CALL", label: "Phone Call", icon: Phone },
  { id: "GOOGLE_MEET", label: "Google Meet / Video", icon: Video },
  { id: "IN_PERSON_JAIPUR", label: "Jaipur Head Office", icon: MapPin },
];

export function QuickScheduleModal({
  leadId,
  leadName,
  leadPhone,
  leadEmail,
}: {
  leadId: string;
  leadName: string;
  leadPhone: string;
  leadEmail: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Next 7 available days (excluding Sundays)
  const availableDates: { value: string; label: string; day: string }[] = [];
  const today = new Date();
  for (let i = 1; i <= 14 && availableDates.length < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) {
      availableDates.push({
        value: d.toISOString().slice(0, 10),
        label: d.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
        day: d.toLocaleDateString("en-IN", { weekday: "short" }),
      });
    }
  }

  const [date, setDate] = useState(availableDates[0]?.value || "");
  const [slot, setSlot] = useState(TIME_SLOTS[0]);
  const [mode, setMode] = useState("GOOGLE_MEET");
  const [meetingLink, setMeetingLink] = useState("");
  const [notes, setNotes] = useState("");

  async function handleSchedule(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/schedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          timeSlot: slot,
          mode,
          meetingLink: meetingLink || undefined,
          notes: notes || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to schedule consultation");

      toast.success(`Consultation confirmed with ${leadName}! Email sent.`);
      setIsOpen(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Button
        size="sm"
        className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm text-xs h-8"
        onClick={() => setIsOpen(true)}
      >
        <Calendar className="w-3.5 h-3.5 mr-1.5" /> 1-Click Schedule Meeting
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-outfit flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" /> Book Consultation with {leadName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select a slot to automatically lock in calendar & dispatch email invites.
                </p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSchedule} className="space-y-4">
              
              {/* Date Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Date
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                  {availableDates.map((d) => (
                    <button
                      type="button"
                      key={d.value}
                      onClick={() => setDate(d.value)}
                      className={`p-2 rounded-lg border text-center text-xs transition-all ${
                        date === d.value
                          ? "bg-primary text-white font-bold border-primary shadow-sm"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                      }`}
                    >
                      <div className="text-[10px] opacity-80 uppercase">{d.day}</div>
                      <div>{d.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Time Slot (IST)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TIME_SLOTS.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSlot(s)}
                      className={`p-2 rounded-lg border text-xs font-medium text-center transition-all ${
                        slot === s
                          ? "bg-primary/10 text-primary border-primary ring-1 ring-primary font-semibold"
                          : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Consultation Mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {MODES.map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setMode(m.id)}
                        className={`p-2.5 rounded-lg border text-center text-xs font-medium transition-all ${
                          mode === m.id
                            ? "bg-primary/10 text-primary border-primary ring-1 ring-primary font-semibold"
                            : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
                        }`}
                      >
                        <Icon className="w-4 h-4 mx-auto mb-1" />
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Google Meet Link (if video) */}
              {mode === "GOOGLE_MEET" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Google Meet Video Room Link (Optional)
                  </label>
                  <Input
                    placeholder="https://meet.google.com/xxx-xxxx-xxx (or leave empty to auto-generate)"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                    className="text-xs"
                  />
                </div>
              )}

              {/* Counsellor Internal Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Agenda / Notes for Student
                </label>
                <Textarea
                  placeholder="e.g. Discuss Georgia MBBS universities, fees, and NEET eligibility."
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={isSubmitting}>
                  {isSubmitting ? "Locking Slot & Dispatching..." : "Confirm & Send Invites"}
                </Button>
              </div>

            </form>

          </div>
        </div>
      )}
    </>
  );
}
