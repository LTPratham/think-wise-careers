"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Check, X, UserCheck, Phone, Video, Sparkles, Clock, PhoneCall, XCircle, CheckCircle, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const DISPOSITIONS = [
  { id: "INTERESTED", label: "Interested", icon: Sparkles, color: "text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200" },
  { id: "CALLBACK", label: "Callback", icon: Clock, color: "text-amber-700 bg-amber-50 hover:bg-amber-100 border-amber-200" },
  { id: "NO_ANSWER", label: "No Answer", icon: PhoneCall, color: "text-orange-700 bg-orange-50 hover:bg-orange-100 border-orange-200" },
  { id: "NOT_INTERESTED", label: "Not Interested", icon: XCircle, color: "text-red-700 bg-red-50 hover:bg-red-100 border-red-200" },
  { id: "ENROLLED", label: "Enrolled", icon: CheckCircle, color: "text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200" },
];

export function MeetingActions({
  bookingId,
  currentStatus,
  assignedToId,
  teamMembers = [],
  isAdmin = false,
  phone,
  mode,
}: {
  bookingId: string;
  currentStatus: string;
  assignedToId?: string | null;
  teamMembers?: { id: string; name: string; role: string }[];
  isAdmin?: boolean;
  phone?: string;
  mode?: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [assignedId, setAssignedId] = useState(assignedToId || "unassigned");
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDispositions, setShowDispositions] = useState(false);
  const router = useRouter();

  async function updateStatus(newStatus: string) {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/meetings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      setStatus(newStatus);
      toast.success(`Meeting status updated to ${newStatus}`);
      router.refresh();
    } catch (err) {
      toast.error("Error updating status");
    } finally {
      setIsUpdating(false);
    }
  }

  async function logDisposition(dispositionId: string) {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/meetings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disposition: dispositionId }),
      });
      if (!res.ok) throw new Error("Failed to log disposition");
      setStatus("COMPLETED");
      setShowDispositions(false);
      toast.success(`Call outcome logged: ${dispositionId}`);
      router.refresh();
    } catch (err) {
      toast.error("Error logging disposition");
    } finally {
      setIsUpdating(false);
    }
  }

  async function updateAssignment(newAssignedId: string) {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/meetings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignedToId: newAssignedId === "unassigned" ? null : newAssignedId }),
      });
      if (!res.ok) throw new Error("Failed to assign");
      setAssignedId(newAssignedId);
      toast.success("Meeting assigned successfully");
      router.refresh();
    } catch (err) {
      toast.error("Error updating assignment");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        {/* Assign to Team (Super Admin ONLY) */}
        {isAdmin && (
          <div className="w-40">
            <Select value={assignedId} onValueChange={(val) => { if (val) updateAssignment(val); }} disabled={isUpdating}>
              <SelectTrigger className="h-8 text-xs bg-slate-50">
                <UserCheck className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                <SelectValue placeholder="Assign Staff" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned" className="text-xs">Unassigned</SelectItem>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id} className="text-xs">
                    {member.name} ({member.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Action: Start Call (for counsellors and admin) */}
        {phone && (
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs text-blue-700 hover:bg-blue-50 border-blue-200"
            asChild
          >
            <a href={`tel:${phone}`}>
              <Phone className="w-3 h-3 mr-1" /> Call Student
            </a>
          </Button>
        )}

        {/* 1-Click Call Outcome Button */}
        {status !== "COMPLETED" && (
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs text-indigo-700 hover:bg-indigo-50 border-indigo-200 font-medium"
            onClick={() => setShowDispositions(!showDispositions)}
            disabled={isUpdating}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-600" /> Log Outcome <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
        )}

        {/* Quick Mark Done Button */}
        {status !== "COMPLETED" && (
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs text-green-700 hover:bg-green-50 border-green-200"
            onClick={() => updateStatus("COMPLETED")}
            disabled={isUpdating}
          >
            <Check className="w-3.5 h-3.5 mr-1" /> Done
          </Button>
        )}

        {isAdmin && status !== "CANCELLED" && (
          <Button
            size="sm"
            variant="ghost"
            className="h-8 text-xs text-slate-400 hover:text-red-600 hover:bg-red-50"
            onClick={() => updateStatus("CANCELLED")}
            disabled={isUpdating}
          >
            <X className="w-3.5 h-3.5 mr-1" /> Cancel
          </Button>
        )}
      </div>

      {/* Expandable 1-Click Outcome Dispositions Bar */}
      {showDispositions && (
        <div className="p-2.5 bg-slate-50 border border-indigo-100 rounded-lg flex flex-wrap gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
          <span className="text-[11px] font-semibold text-slate-600 w-full mb-1">
            Select Call Outcome:
          </span>
          {DISPOSITIONS.map((d) => {
            const Icon = d.icon;
            return (
              <button
                key={d.id}
                type="button"
                disabled={isUpdating}
                onClick={() => logDisposition(d.id)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded border text-[11px] font-semibold transition-all shadow-sm ${d.color}`}
              >
                <Icon className="w-3 h-3" />
                {d.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
