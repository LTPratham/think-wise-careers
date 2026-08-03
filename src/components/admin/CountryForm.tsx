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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/toast";
import { Save } from "lucide-react";

const countrySchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(2, "Slug is required"),
  overview: z.string().min(10, "Overview is required"),
  eligibility: z.string().min(10, "Eligibility is required"),
  publishStatus: z.enum(["DRAFT", "PUBLISHED", "UNPUBLISHED"]).default("DRAFT"),
});

type CountryValues = z.infer<typeof countrySchema>;

export function CountryForm({ initialData, universities }: { initialData: any, universities: any[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CountryValues>({
    resolver: zodResolver(countrySchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
      overview: "",
      eligibility: "",
      publishStatus: "DRAFT",
    },
  });

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const onSubmit = async (data: CountryValues) => {
    setIsSubmitting(true);
    try {
      const url = initialData ? `/api/admin/countries/${initialData.id}` : `/api/admin/countries`;
      const method = initialData ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save country");

      toast({ title: "Country saved successfully!" });
      router.push("/admin/countries");
      router.refresh();
    } catch (error) {
      toast({ title: "Error saving country", variant: "destructive" });
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
                <FormLabel>URL Slug</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. united-kingdom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="overview"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Overview</FormLabel>
              <FormControl>
                <Textarea placeholder="Brief introduction about studying in this country..." className="h-32" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="eligibility"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eligibility Requirements</FormLabel>
                <FormControl>
                  <Textarea placeholder="IELTS, GPA requirements, etc." className="h-32" {...field} value={field.value || ""} />
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
            {isSubmitting ? "Saving..." : "Save Country"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
