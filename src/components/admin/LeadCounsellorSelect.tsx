"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCheck } from "lucide-react";

export function LeadCounsellorSelect({
  leadId,
  currentAssignedId,
  teamMembers,
}: {
  leadId: string;
  currentAssignedId?: string | null;
  teamMembers: { id: string; name: string; role: string }[];
}) {
  const [assignedId, setAssignedId] = useState(currentAssignedId || "unassigned");
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleAssign(newId: string) {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignedToId: newId === "unassigned" ? null : newId }),
      });

      if (!res.ok) throw new Error("Failed to assign counsellor");
      setAssignedId(newId);
      toast.success("Lead assigned successfully");
    } catch (err) {
      toast.error("Error updating assignment");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <Select value={assignedId} onValueChange={(val) => { if (val) handleAssign(val); }} disabled={isUpdating}>
      <SelectTrigger className="w-full bg-white">
        <UserCheck className="w-4 h-4 mr-2 text-slate-400" />
        <SelectValue placeholder="Assign Staff" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="unassigned">Unassigned</SelectItem>
        {teamMembers.map((member) => (
          <SelectItem key={member.id} value={member.id}>
            {member.name} ({member.role})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
