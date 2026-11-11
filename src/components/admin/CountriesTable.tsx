"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { 
  Edit, 
  Trash2, 
  ExternalLink, 
  Globe, 
  Search, 
  Building2, 
  BookOpen, 
  AlertTriangle,
  Loader2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export interface CountryListItem {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
  publishStatus: "DRAFT" | "PUBLISHED" | "UNPUBLISHED";
  popularCourses: any;
  updatedAt: string | Date;
  _count: {
    universities: number;
  };
}

export function CountriesTable({ initialCountries }: { initialCountries: CountryListItem[] }) {
  const router = useRouter();
  const [countries, setCountries] = useState<CountryListItem[]>(initialCountries);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [countryToDelete, setCountryToDelete] = useState<CountryListItem | null>(null);

  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
    if (!countryToDelete) return;
    setDeletingId(countryToDelete.id);

    try {
      const res = await fetch(`/api/admin/countries/${countryToDelete.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to delete country");
      }

      setCountries(countries.filter((c) => c.id !== countryToDelete.id));
      toast({ title: `${countryToDelete.name} deleted successfully` });
      router.refresh();
    } catch (err: any) {
      toast({ title: err.message || "Error deleting country", variant: "destructive" });
    } finally {
      setDeletingId(null);
      setCountryToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <Input
            placeholder="Search by country name or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-sm"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing {filteredCountries.length} of {countries.length} destinations
        </div>
      </div>

      {/* Countries Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 w-16">Preview</th>
                <th className="px-6 py-4">Country Name & URL</th>
                <th className="px-6 py-4">Universities</th>
                <th className="px-6 py-4">Popular Streams</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Updated</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCountries.map((country) => {
                const courseCount = Array.isArray(country.popularCourses)
                  ? country.popularCourses.length
                  : 0;

                const thumbnail = country.imageUrl || `/images/${country.slug}.png`;

                return (
                  <tr key={country.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Thumbnail */}
                    <td className="px-6 py-4">
                      <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 relative flex items-center justify-center shrink-0">
                        <img
                          src={thumbnail}
                          alt={country.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                        <Globe className="w-5 h-5 text-slate-400 absolute pointer-events-none" />
                      </div>
                    </td>

                    {/* Country Name */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-base">{country.name}</div>
                      <div className="text-slate-500 font-mono text-xs flex items-center mt-0.5">
                        <span>/study-abroad/{country.slug}</span>
                      </div>
                    </td>

                    {/* Universities Count */}
                    <td className="px-6 py-4 text-slate-700">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        <Building2 className="w-3.5 h-3.5" />
                        {country._count.universities} Partner Unis
                      </span>
                    </td>

                    {/* Popular Streams */}
                    <td className="px-6 py-4 text-slate-700">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                        <BookOpen className="w-3.5 h-3.5" />
                        {courseCount} Streams
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          country.publishStatus === "PUBLISHED"
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {country.publishStatus === "PUBLISHED" ? "● Published" : "○ Draft"}
                      </span>
                    </td>

                    {/* Last Updated */}
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {format(new Date(country.updatedAt), "MMM d, yyyy")}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center justify-end space-x-1">
                        <Button variant="ghost" size="sm" asChild className="h-8 px-2 text-slate-600 hover:text-indigo-600">
                          <Link href={`/study-abroad/${country.slug}`} target="_blank" title="View Public Page">
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild className="h-8 px-2 text-slate-600 hover:text-indigo-600">
                          <Link href={`/admin/countries/${country.id}`} title="Edit Destination">
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCountryToDelete(country)}
                          className="h-8 px-2 text-slate-400 hover:text-red-600"
                          title="Delete Destination"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredCountries.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    {searchQuery
                      ? `No countries found matching "${searchQuery}"`
                      : "No study abroad destinations found. Click 'Add Country' to create one."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {countryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold font-outfit text-slate-900 mb-2">
              Delete {countryToDelete.name}?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Are you sure you want to delete <strong>{countryToDelete.name}</strong> (/study-abroad/{countryToDelete.slug})? 
              This will remove its public page and unlink all universities. This action cannot be undone.
            </p>

            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setCountryToDelete(null)}
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
