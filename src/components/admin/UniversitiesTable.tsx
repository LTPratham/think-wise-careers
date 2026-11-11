"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Edit, Trash2, Building2, Search, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export interface UniversityListItem {
  id: string;
  name: string;
  countryName: string;
  logoUrl?: string | null;
  createdAt: string | Date;
  _count?: {
    countries: number;
  };
}

export function UniversitiesTable({
  initialUniversities,
}: {
  initialUniversities: UniversityListItem[];
}) {
  const router = useRouter();
  const [universities, setUniversities] = useState<UniversityListItem[]>(initialUniversities);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [uniToDelete, setUniToDelete] = useState<UniversityListItem | null>(null);

  const filtered = universities.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.countryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
    if (!uniToDelete) return;
    setDeletingId(uniToDelete.id);

    try {
      const res = await fetch(`/api/admin/universities/${uniToDelete.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to delete university");
      }

      setUniversities(universities.filter((u) => u.id !== uniToDelete.id));
      toast({ title: `${uniToDelete.name} deleted successfully` });
      router.refresh();
    } catch (err: any) {
      toast({ title: err.message || "Error deleting university", variant: "destructive" });
    } finally {
      setDeletingId(null);
      setUniToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <Input
            placeholder="Search universities by name or country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-sm"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing {filtered.length} of {universities.length} institutions
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 w-16">Logo</th>
                <th className="px-6 py-4">University Name</th>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4">Linked Destinations</th>
                <th className="px-6 py-4">Added On</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((uni) => (
                <tr key={uni.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    {uni.logoUrl ? (
                      <img
                        src={uni.logoUrl}
                        alt={uni.name}
                        className="w-9 h-9 rounded-lg object-contain bg-white border p-1"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                        <Building2 className="w-4 h-4" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900 text-base">
                    {uni.name}
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    {uni.countryName}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-slate-100 text-slate-700 font-medium">
                      {uni._count?.countries || 0} linked
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {format(new Date(uni.createdAt), "MMM d, yyyy")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center justify-end space-x-1">
                      <Button variant="ghost" size="sm" asChild className="h-8 px-2 text-slate-600 hover:text-indigo-600">
                        <Link href={`/admin/universities/${uni.id}`} title="Edit University">
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setUniToDelete(uni)}
                        className="h-8 px-2 text-slate-400 hover:text-red-600"
                        title="Delete University"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    {searchQuery
                      ? `No universities found matching "${searchQuery}"`
                      : "No universities found. Click 'Add University' to create one."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {uniToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold font-outfit text-slate-900 mb-2">
              Delete {uniToDelete.name}?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Are you sure you want to delete <strong>{uniToDelete.name}</strong>? It will be removed from all linked country pages. This action cannot be undone.
            </p>

            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setUniToDelete(null)}
                disabled={Boolean(deletingId)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={Boolean(deletingId)}
                className="bg-red-600 hover:bg-red-700"
              >
                {deletingId ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" /> Yes, Delete
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
