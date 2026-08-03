"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/toast";
import { Save } from "lucide-react";

const mbbsSchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(2, "Slug is required"),
  recognitionStatus: z.string().min(5, "Recognition status is required"),
  eligibilityNeet: z.string().min(5, "Eligibility is required"),
  admissionProcess: z.string().min(10, "Admission process is required"),
  hostelInfo: z.string().min(5, "Hostel info is required"),
  careerScope: z.string().min(5, "Career scope is required"),
  publishStatus: z.enum(["DRAFT", "PUBLISHED", "UNPUBLISHED"]).default("DRAFT"),
});

type MBBSValues = z.infer<typeof mbbsSchema>;

export function MBBSForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MBBSValues>({
    resolver: zodResolver(mbbsSchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
      recognitionStatus: "",
      eligibilityNeet: "",
      admissionProcess: "",
      hostelInfo: "",
      careerScope: "",
      publishStatus: "DRAFT",
    },
  });

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const onSubmit = async (data: MBBSValues) => {
    setIsSubmitting(true);
    try {
      const url = initialData ? `/api/admin/mbbs/${initialData.id}` : `/api/admin/mbbs`;
      const method = initialData ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save MBBS destination");

      toast({ title: "MBBS Destination saved successfully!" });
      router.push("/admin/mbbs");
      router.refresh();
    } catch (error) {
      toast({ title: "Error saving destination", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. Russia" 
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
                <FormLabel>URL Slug</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. russia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="eligibilityNeet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eligibility & NEET</FormLabel>
                <FormControl>
                  <Textarea placeholder="NEET requirements, 12th percentage..." className="h-24" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recognitionStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recognition Status</FormLabel>
                <FormControl>
                  <Textarea placeholder="NMC, WHO approved..." className="h-24" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="hostelInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost Overview / Hostel Info</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tuition and living costs..." className="h-24" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="careerScope"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Career Scope</FormLabel>
                <FormControl>
                  <Textarea placeholder="FMGE, PG opportunities..." className="h-24" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="admissionProcess"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admission Process</FormLabel>
              <FormControl>
                <Textarea placeholder="Step by step admission process..." className="h-32" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="publishStatus"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-slate-50">
              <FormControl>
                <Checkbox
                  checked={field.value === "PUBLISHED"}
                  onCheckedChange={(checked) => field.onChange(checked ? "PUBLISHED" : "DRAFT")}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Publish this destination
                </FormLabel>
                <p className="text-sm text-slate-500">
                  If unchecked, it will be saved as a draft and won't appear on the public website.
                </p>
              </div>
            </FormItem>
          )}
        />

        <div className="pt-4 border-t flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Saving..." : "Save MBBS Destination"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
