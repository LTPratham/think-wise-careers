"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Plus, Clock, User } from "lucide-react";
import { format } from "date-fns";

type Note = {
  id: string;
  content: string;
  createdAt: Date | string;
  author: {
    name: string;
    role: string;
  };
};

export function LeadNotesSection({
  leadId,
  initialNotes,
}: {
  leadId: string;
  initialNotes: Note[];
}) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [newNote, setNewNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault();
    if (!newNote.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newNote.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add note");

      setNotes([data.note, ...notes]);
      setNewNote("");
      toast.success("Call note saved!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save note");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddNote} className="space-y-2">
        <Textarea
          placeholder="Log phone call notes, student budget, university preferences, or follow-up date..."
          rows={3}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="bg-white"
        />
        <div className="flex justify-end">
          <Button type="submit" size="sm" disabled={isSubmitting || !newNote.trim()}>
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Call Note
          </Button>
        </div>
      </form>

      <div className="space-y-3 pt-2">
        {notes.map((note) => (
          <div key={note.id} className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-1.5 text-xs text-slate-700">
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <User className="w-3 h-3 text-slate-400" /> {note.author.name} ({note.author.role})
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {format(new Date(note.createdAt), "MMM d, yyyy HH:mm")}
              </span>
            </div>
            <p className="text-slate-800 whitespace-pre-wrap text-sm">{note.content}</p>
          </div>
        ))}

        {notes.length === 0 && (
          <p className="text-slate-400 text-xs text-center py-4 italic">
            No call notes logged yet. Log the first call summary above.
          </p>
        )}
      </div>
    </div>
  );
}
