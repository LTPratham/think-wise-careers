"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export function LeadStatusSelect({ leadId, currentStatus }: { leadId: string, currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setStatus(newStatus);
      toast({ title: "Status updated successfully" });
      router.refresh();
    } catch (error) {
      toast({ title: "Error updating status", variant: "destructive" });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <select
      value={status}
      onChange={(e) => handleStatusChange(e.target.value)}
      disabled={isUpdating}
      className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 disabled:opacity-50"
    >
      <option value="NEW">New</option>
      <option value="CONTACTED">Contacted</option>
      <option value="CONSULTATION_BOOKED">Consultation Booked</option>
      <option value="CONVERTED">Converted</option>
      <option value="LOST">Lost</option>
    </select>
  );
}
