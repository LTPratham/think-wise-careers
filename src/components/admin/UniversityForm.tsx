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
import { Save, Trash2, Upload, Building2, X, AlertTriangle, Loader2 } from "lucide-react";

const universitySchema = z.object({
  name: z.string().min(2, "University name is required"),
  countryName: z.string().min(2, "Country name is required"),
  logoUrl: z.string().optional().nullable(),
  description: z.string().min(10, "Description is required"),
});

type UniversityValues = z.infer<typeof universitySchema>;

export function UniversityForm({ initialData }: { initialData?: any }) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  const form = useForm<UniversityValues>({
    resolver: zodResolver(universitySchema) as any,
    defaultValues: {
      name: initialData?.name || "",
      countryName: initialData?.countryName || "",
      logoUrl: initialData?.logoUrl || "",
      description: initialData?.description || "",
    },
  });

  // Handle Logo Upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingLogo(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "university");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }

      const data = await res.json();
      form.setValue("logoUrl", data.url, { shouldDirty: true });
      toast({ title: "Logo uploaded successfully!" });
    } catch (err: any) {
      toast({ title: err.message || "Failed to upload logo", variant: "destructive" });
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const onSubmit = async (data: UniversityValues) => {
    setIsSubmitting(true);
    try {
      const url = initialData ? `/api/admin/universities/${initialData.id}` : `/api/admin/universities`;
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save university");
      }

      toast({ title: initialData ? "University updated successfully!" : "University created successfully!" });
      router.push("/admin/universities");
      router.refresh();
    } catch (error: any) {
      toast({ title: error.message || "Error saving university", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/universities/${initialData.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to delete university");
      }

      toast({ title: "University deleted successfully!" });
      router.push("/admin/universities");
      router.refresh();
    } catch (err: any) {
      toast({ title: err.message || "Error deleting university", variant: "destructive" });
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const currentLogoUrl = form.watch("logoUrl");

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-slate-700">University Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. University of Manchester" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="countryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-slate-700">Country</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. United Kingdom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Logo Upload Section */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
            <label className="block text-sm font-semibold text-slate-700">University Logo</label>

            <div className="flex items-center space-x-6">
              {/* Logo Preview */}
              <div className="w-20 h-20 rounded-xl bg-white border border-slate-200 p-2 relative flex items-center justify-center shrink-0">
                {currentLogoUrl ? (
                  <>
                    <img
                      src={currentLogoUrl}
                      alt="Logo Preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => form.setValue("logoUrl", "", { shouldDirty: true })}
                      className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-md"
                      title="Remove logo"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </>
                ) : (
                  <Building2 className="w-8 h-8 text-slate-300" />
                )}
              </div>

              {/* Upload Controls */}
              <div className="space-y-2 flex-1">
                <label className="cursor-pointer inline-block">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isUploadingLogo}
                    asChild
                  >
                    <span>
                      {isUploadingLogo ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" /> Upload Logo Image
                        </>
                      )}
                    </span>
                  </Button>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp, image/svg+xml"
                    className="hidden"
                    onChange={handleLogoUpload}
                    disabled={isUploadingLogo}
                  />
                </label>
                <p className="text-2xs text-slate-500">
                  Square or horizontal transparent PNG/SVG recommended. Max 5MB.
                </p>

                <FormField
                  control={form.control}
                  name="logoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Or paste direct logo URL (https://...)"
                          className="text-xs bg-white"
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

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-slate-700">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief overview of the university, rankings, key faculties, campus highlights..."
                    className="h-32 text-sm"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4 border-t flex flex-wrap items-center justify-between gap-4">
            <div>
              {initialData && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete University
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/universities")}
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
                    <Save className="w-4 h-4 mr-2" /> Save University
                  </>
                )}
              </Button>
            </div>
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
              Are you sure you want to delete this university? It will be removed from all linked country pages.
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
                    <Trash2 className="w-4 h-4 mr-2" /> Yes, Delete
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
