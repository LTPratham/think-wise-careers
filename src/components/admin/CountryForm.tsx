"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { 
  Save, 
  Trash2, 
  Upload, 
  Globe, 
  Check, 
  X, 
  Plus, 
  ExternalLink,
  GraduationCap,
  DollarSign,
  FileText,
  Search,
  Building2,
  AlertTriangle,
  Loader2
} from "lucide-react";
import Link from "next/link";

const countrySchema = z.object({
  name: z.string().min(2, "Country name is required"),
  slug: z.string().min(2, "URL slug is required"),
  imageUrl: z.string().optional().nullable(),
  overview: z.string().min(10, "Overview is required"),
  eligibility: z.string().min(5, "Eligibility requirements are required"),
  scholarships: z.string().optional().nullable(),
  visaOverview: z.string().optional().nullable(),
  careerOutcomes: z.string().optional().nullable(),
  publishStatus: z.enum(["DRAFT", "PUBLISHED", "UNPUBLISHED"]).default("DRAFT"),
});

type CountryFormValues = z.infer<typeof countrySchema>;

interface UniversityOption {
  id: string;
  name: string;
  countryName: string;
  logoUrl?: string | null;
}

interface CountryFormProps {
  initialData?: any;
  universities?: UniversityOption[];
  linkedUniversityIds?: string[];
}

export function CountryForm({
  initialData,
  universities = [],
  linkedUniversityIds = [],
}: CountryFormProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Selected Universities
  const [selectedUniIds, setSelectedUniIds] = useState<string[]>(linkedUniversityIds);
  const [uniSearch, setUniSearch] = useState("");

  // Popular Courses Tags
  const [courses, setCourses] = useState<string[]>(() => {
    if (!initialData?.popularCourses) return [];
    if (Array.isArray(initialData.popularCourses)) return initialData.popularCourses;
    try {
      const parsed = JSON.parse(initialData.popularCourses);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [newCourseInput, setNewCourseInput] = useState("");

  // Structured Cost Breakdown
  const initialCost = (() => {
    if (!initialData?.costBreakdown) return {};
    if (typeof initialData.costBreakdown === "object") return initialData.costBreakdown;
    try {
      return JSON.parse(initialData.costBreakdown);
    } catch {
      return {};
    }
  })();

  const [costBreakdown, setCostBreakdown] = useState<Record<string, string>>({
    undergraduateTuition: initialCost.undergraduateTuition || initialCost.tuition || "",
    postgraduateTuition: initialCost.postgraduateTuition || "",
    livingExpenses: initialCost.livingExpenses || initialCost.living || "",
    visaFees: initialCost.visaFees || "",
    workRights: initialCost.workRights || "",
    postStudyWork: initialCost.postStudyWork || "",
  });

  const [customCostRows, setCustomCostRows] = useState<{ label: string; value: string }[]>(() => {
    const defaultKeys = [
      "undergraduateTuition",
      "postgraduateTuition",
      "livingExpenses",
      "visaFees",
      "workRights",
      "postStudyWork",
      "tuition",
      "living",
    ];
    return Object.entries(initialCost)
      .filter(([k]) => !defaultKeys.includes(k))
      .map(([label, value]) => ({ label, value: String(value) }));
  });

  const [newCostLabel, setNewCostLabel] = useState("");
  const [newCostValue, setNewCostValue] = useState("");

  const form = useForm<CountryFormValues>({
    resolver: zodResolver(countrySchema) as any,
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      imageUrl: initialData?.imageUrl || "",
      overview: initialData?.overview || "",
      eligibility: initialData?.eligibility || "",
      scholarships: initialData?.scholarships || "",
      visaOverview: initialData?.visaOverview || "",
      careerOutcomes: initialData?.careerOutcomes || "",
      publishStatus: initialData?.publishStatus || "DRAFT",
    },
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "country");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }

      const data = await res.json();
      form.setValue("imageUrl", data.url, { shouldDirty: true });
      toast({ title: "Image uploaded successfully!" });
    } catch (err: any) {
      toast({ title: err.message || "Failed to upload image", variant: "destructive" });
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Tag Management
  const addCourse = () => {
    const trimmed = newCourseInput.trim();
    if (trimmed && !courses.includes(trimmed)) {
      setCourses([...courses, trimmed]);
      setNewCourseInput("");
    }
  };

  const removeCourse = (courseToRemove: string) => {
    setCourses(courses.filter((c) => c !== courseToRemove));
  };

  // Custom Cost Rows
  const addCustomCostRow = () => {
    if (newCostLabel.trim() && newCostValue.trim()) {
      setCustomCostRows([...customCostRows, { label: newCostLabel.trim(), value: newCostValue.trim() }]);
      setNewCostLabel("");
      setNewCostValue("");
    }
  };

  const removeCustomCostRow = (index: number) => {
    setCustomCostRows(customCostRows.filter((_, i) => i !== index));
  };

  // University Selection Toggle
  const toggleUniversity = (id: string) => {
    if (selectedUniIds.includes(id)) {
      setSelectedUniIds(selectedUniIds.filter((item) => item !== id));
    } else {
      setSelectedUniIds([...selectedUniIds, id]);
    }
  };

  const filteredUniversities = universities.filter(
    (u) =>
      u.name.toLowerCase().includes(uniSearch.toLowerCase()) ||
      u.countryName.toLowerCase().includes(uniSearch.toLowerCase())
  );

  // Form Submission
  const onSubmit = async (data: CountryFormValues) => {
    setIsSubmitting(true);
    try {
      // Assemble full cost breakdown
      const fullCostBreakdown: Record<string, string> = { ...costBreakdown };
      customCostRows.forEach((row) => {
        if (row.label && row.value) {
          fullCostBreakdown[row.label] = row.value;
        }
      });

      const payload = {
        ...data,
        popularCourses: courses,
        costBreakdown: fullCostBreakdown,
        universityIds: selectedUniIds,
      };

      const url = initialData ? `/api/admin/countries/${initialData.id}` : `/api/admin/countries`;
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save country");
      }

      toast({ title: initialData ? "Country updated successfully!" : "Country created successfully!" });
      router.push("/admin/countries");
      router.refresh();
    } catch (error: any) {
      toast({ title: error.message || "Error saving country", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Country Delete
  const handleDelete = async () => {
    if (!initialData?.id) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/countries/${initialData.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to delete country");
      }

      toast({ title: "Country deleted successfully!" });
      router.push("/admin/countries");
      router.refresh();
    } catch (err: any) {
      toast({ title: err.message || "Error deleting country", variant: "destructive" });
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const currentImageUrl = form.watch("imageUrl");

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Top Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center space-x-3">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  form.watch("publishStatus") === "PUBLISHED"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-amber-100 text-amber-700 border border-amber-200"
                }`}
              >
                {form.watch("publishStatus") === "PUBLISHED" ? "● Live / Published" : "○ Draft Mode"}
              </span>
              {initialData?.slug && (
                <Link
                  href={`/study-abroad/${initialData.slug}`}
                  target="_blank"
                  className="inline-flex items-center text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1" /> View Live Page
                </Link>
              )}
            </div>

            <div className="flex items-center space-x-3">
              {initialData && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete Country
                </Button>
              )}

              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/countries")}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" /> Save Destination
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Section 1: Basic Information */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-lg font-bold font-outfit text-slate-900 flex items-center border-b pb-4">
              <Globe className="w-5 h-5 mr-2 text-indigo-600" />
              1. Basic Information & Status
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-slate-700">Country Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. United Kingdom"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          if (!initialData) {
                            form.setValue("slug", generateSlug(e.target.value));
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-slate-700">URL Slug</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <span className="bg-slate-100 border border-r-0 border-slate-200 px-3 py-2 text-sm text-slate-500 rounded-l-md select-none">
                          /study-abroad/
                        </span>
                        <Input
                          placeholder="united-kingdom"
                          className="rounded-l-none"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="publishStatus"
              render={({ field }) => (
                <FormItem className="pt-2">
                  <FormLabel className="font-semibold text-slate-700 block mb-2">Publishing Status</FormLabel>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700">
                      <input
                        type="radio"
                        value="PUBLISHED"
                        checked={field.value === "PUBLISHED"}
                        onChange={() => field.onChange("PUBLISHED")}
                        className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      />
                      <span>Published (Live on Public Website)</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700">
                      <input
                        type="radio"
                        value="DRAFT"
                        checked={field.value === "DRAFT"}
                        onChange={() => field.onChange("DRAFT")}
                        className="text-slate-600 focus:ring-slate-500 h-4 w-4"
                      />
                      <span>Draft (Hidden from Public Website)</span>
                    </label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Section 2: Country Featured Image */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-lg font-bold font-outfit text-slate-900 flex items-center border-b pb-4">
              <Upload className="w-5 h-5 mr-2 text-indigo-600" />
              2. Destination Banner Image
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* Image Preview */}
              <div className="relative rounded-xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 aspect-video flex items-center justify-center">
                {currentImageUrl ? (
                  <>
                    <img
                      src={currentImageUrl}
                      alt="Country Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => form.setValue("imageUrl", "", { shouldDirty: true })}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-md"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <div className="text-center p-4 text-slate-400">
                    <Globe className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">No image uploaded</p>
                    <p className="text-2xs text-slate-400 mt-1">
                      Falls back to /images/{form.watch("slug") || "slug"}.png
                    </p>
                  </div>
                )}
              </div>

              {/* Upload Controls */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Upload New Image
                  </label>
                  <p className="text-xs text-slate-500 mb-3">
                    Recommended: 1200x800px landscape PNG, JPG, or WebP. Max 5MB.
                  </p>
                  <div className="flex items-center space-x-3">
                    <label className="cursor-pointer">
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isUploadingImage}
                        asChild
                      >
                        <span>
                          {isUploadingImage ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 mr-2" /> Choose Image File
                            </>
                          )}
                        </span>
                      </Button>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={isUploadingImage}
                      />
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-slate-500 font-normal">
                          Or enter direct image URL / file path
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="/uploads/countries/example.jpg or https://..."
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Overview & Popular Courses */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-lg font-bold font-outfit text-slate-900 flex items-center border-b pb-4">
              <FileText className="w-5 h-5 mr-2 text-indigo-600" />
              3. Overview & Popular Courses
            </h3>

            <FormField
              control={form.control}
              name="overview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-slate-700">Country Overview</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Comprehensive overview highlighting education quality, lifestyle, student cities, and why students choose this destination..."
                      className="h-32 text-sm"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Popular Courses Dynamic Chips */}
            <div className="space-y-3 pt-2">
              <label className="block text-sm font-semibold text-slate-700">
                Popular Courses & Streams
              </label>
              <p className="text-xs text-slate-500">
                Add the key academic disciplines students seek in this destination.
              </p>

              {/* Tag Chips */}
              <div className="flex flex-wrap gap-2 min-h-10 p-3 bg-slate-50 rounded-xl border border-slate-200">
                {courses.map((course, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs"
                  >
                    <span>{course}</span>
                    <button
                      type="button"
                      onClick={() => removeCourse(course)}
                      className="hover:text-red-600 transition-colors"
                      title="Remove course"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
                {courses.length === 0 && (
                  <span className="text-xs text-slate-400 italic">
                    No courses added yet. Type below to add.
                  </span>
                )}
              </div>

              {/* Add New Tag Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Computer Science, MBA, Data Analytics..."
                  value={newCourseInput}
                  onChange={(e) => setNewCourseInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCourse();
                    }
                  }}
                  className="max-w-md"
                />
                <Button type="button" variant="secondary" onClick={addCourse}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>

              {/* Quick Suggestion Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-2xs text-slate-400 font-medium mr-1">Quick Add:</span>
                {[
                  "Computer Science & IT",
                  "Business & Management (MBA)",
                  "Data Science & AI",
                  "Mechanical & Civil Engineering",
                  "Biotechnology & Health",
                  "Finance & Accounting",
                  "Law & International Relations",
                ].map((sugg) => (
                  <button
                    key={sugg}
                    type="button"
                    onClick={() => {
                      if (!courses.includes(sugg)) setCourses([...courses, sugg]);
                    }}
                    className="text-2xs px-2 py-0.5 rounded-md bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200 transition-colors"
                  >
                    + {sugg}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Cost Breakdown & Fee Structure Table */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-bold font-outfit text-slate-900 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-indigo-600" />
                  4. Cost Breakdown & Financial Table
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  This data powers the Cost Table on the student-facing destination page.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Undergraduate Tuition Range
                </label>
                <Input
                  placeholder="e.g. £12,000 - £25,000 / year"
                  value={costBreakdown.undergraduateTuition || ""}
                  onChange={(e) =>
                    setCostBreakdown({ ...costBreakdown, undergraduateTuition: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Postgraduate / Masters Tuition Range
                </label>
                <Input
                  placeholder="e.g. £14,000 - £30,000 / year"
                  value={costBreakdown.postgraduateTuition || ""}
                  onChange={(e) =>
                    setCostBreakdown({ ...costBreakdown, postgraduateTuition: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Average Living Cost (Accommodation & Food)
                </label>
                <Input
                  placeholder="e.g. £9,000 - £12,000 / year"
                  value={costBreakdown.livingExpenses || ""}
                  onChange={(e) =>
                    setCostBreakdown({ ...costBreakdown, livingExpenses: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Visa & Health Insurance (IHS)
                </label>
                <Input
                  placeholder="e.g. £490 Visa + £776/yr Health Surcharge"
                  value={costBreakdown.visaFees || ""}
                  onChange={(e) =>
                    setCostBreakdown({ ...costBreakdown, visaFees: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Part-Time Work Permission & Wages
                </label>
                <Input
                  placeholder="e.g. 20 hrs/week (~£11.44/hr minimum wage)"
                  value={costBreakdown.workRights || ""}
                  onChange={(e) =>
                    setCostBreakdown({ ...costBreakdown, workRights: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Post-Study Work Visa Duration
                </label>
                <Input
                  placeholder="e.g. 2 Years Graduate Route (3 Years for PhD)"
                  value={costBreakdown.postStudyWork || ""}
                  onChange={(e) =>
                    setCostBreakdown({ ...costBreakdown, postStudyWork: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Custom Rows */}
            {customCostRows.length > 0 && (
              <div className="pt-4 border-t space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                  Custom Cost Table Entries
                </label>
                <div className="space-y-2">
                  {customCostRows.map((row, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Input
                        value={row.label}
                        onChange={(e) => {
                          const updated = [...customCostRows];
                          updated[idx].label = e.target.value;
                          setCustomCostRows(updated);
                        }}
                        className="w-1/3 text-xs"
                        placeholder="Label"
                      />
                      <Input
                        value={row.value}
                        onChange={(e) => {
                          const updated = [...customCostRows];
                          updated[idx].value = e.target.value;
                          setCustomCostRows(updated);
                        }}
                        className="flex-1 text-xs"
                        placeholder="Estimated Cost"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCustomCostRow(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add Custom Row */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-600 block mb-2">
                + Add Additional Cost Category
              </span>
              <div className="flex flex-wrap gap-2">
                <Input
                  placeholder="Category Name (e.g. Flight Ticket)"
                  value={newCostLabel}
                  onChange={(e) => setNewCostLabel(e.target.value)}
                  className="w-48 text-xs"
                />
                <Input
                  placeholder="Amount (e.g. ₹45,000 - ₹65,000)"
                  value={newCostValue}
                  onChange={(e) => setNewCostValue(e.target.value)}
                  className="w-64 text-xs"
                />
                <Button type="button" variant="outline" size="sm" onClick={addCustomCostRow}>
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Row
                </Button>
              </div>
            </div>
          </div>

          {/* Section 5: Admissions, Scholarships, Visa & Career */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-lg font-bold font-outfit text-slate-900 flex items-center border-b pb-4">
              <GraduationCap className="w-5 h-5 mr-2 text-indigo-600" />
              5. Admissions, Scholarships, Visa & Career
            </h3>

            <FormField
              control={form.control}
              name="eligibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-slate-700">
                    Eligibility & Academic Requirements
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Minimum GPA/percentage, accepted English tests (IELTS/TOEFL/PTE score requirements), backlogs criteria, GRE/GMAT if applicable..."
                      className="h-28 text-sm"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scholarships"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-slate-700">
                    Scholarships & Financial Aid
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Government scholarships (e.g., Chevening, Fulbright), university merit awards, tuition fee discounts, early application waivers..."
                      className="h-28 text-sm"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="visaOverview"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-slate-700">
                      Visa Requirements & Process
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Student visa processing time, financial proof/funds required, interview guidelines, biometric details..."
                        className="h-28 text-sm"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="careerOutcomes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-slate-700">
                      Career Opportunities & Post-Study Work
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Key hiring sectors, average starting salary ranges, top employment hubs, PR / permanent residency pathways..."
                        className="h-28 text-sm"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Section 6: Linked Partner Universities */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
              <div>
                <h3 className="text-lg font-bold font-outfit text-slate-900 flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-indigo-600" />
                  6. Linked Partner Universities ({selectedUniIds.length} Linked)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Select which universities from your database will appear on this country page.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedUniIds(universities.map((u) => u.id))}
                  className="text-xs"
                >
                  Select All
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedUniIds([])}
                  className="text-xs"
                >
                  Deselect All
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  asChild
                  className="text-xs"
                >
                  <Link href="/admin/universities/new" target="_blank">
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add New Uni
                  </Link>
                </Button>
              </div>
            </div>

            {/* University Search Filter */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <Input
                placeholder="Search universities by name or country..."
                value={uniSearch}
                onChange={(e) => setUniSearch(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>

            {/* Universities Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-1 border rounded-xl bg-slate-50/50">
              {filteredUniversities.map((uni) => {
                const isSelected = selectedUniIds.includes(uni.id);
                return (
                  <div
                    key={uni.id}
                    onClick={() => toggleUniversity(uni.id)}
                    className={`flex items-center p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-indigo-50/70 border-indigo-300 shadow-2xs"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center mr-3 border shrink-0 transition-colors ${
                        isSelected
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>

                    <div className="overflow-hidden flex-1">
                      <p className="text-sm font-semibold text-slate-900 truncate">{uni.name}</p>
                      <p className="text-2xs text-slate-500 truncate">{uni.countryName}</p>
                    </div>
                  </div>
                );
              })}

              {filteredUniversities.length === 0 && (
                <div className="col-span-full py-8 text-center text-slate-400 text-sm">
                  No universities match your search.{" "}
                  <Link href="/admin/universities/new" className="text-indigo-600 underline">
                    Add a university
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Save Button Bar */}
          <div className="flex items-center justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/countries")}
            >
              Cancel
            </Button>
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving Destination...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" /> Save Country Destination
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold font-outfit text-slate-900 mb-2">
              Delete {initialData?.name}?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Are you sure you want to delete this country destination? This will remove its public
              destination page and unlink it from all associated universities. This action cannot be
              undone.
            </p>

            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" /> Yes, Delete Country
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
