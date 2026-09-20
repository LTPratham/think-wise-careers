"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Check, X, UserCheck } from "lucide-react";

export function MeetingActions({
  bookingId,
  currentStatus,
  assignedToId,
  teamMembers,
}: {
  bookingId: string;
  currentStatus: string;
  assignedToId?: string | null;
  teamMembers: { id: string; name: string; role: string }[];
}) {
  const [status, setStatus] = useState(currentStatus);
  const [assignedId, setAssignedId] = useState(assignedToId || "unassigned");
  const [isUpdating, setIsUpdating] = useState(false);

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
    } catch (err) {
      toast.error("Error updating status");
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
    } catch (err) {
      toast.error("Error updating assignment");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Assign to Team */}
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

      {/* Quick Status Buttons */}
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

      {status !== "CANCELLED" && (
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
  );
}
