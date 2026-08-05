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
import { toast } from "@/components/ui/toast";
import { Save } from "lucide-react";

const universitySchema = z.object({
  name: z.string().min(2, "Name is required"),
  countryName: z.string().min(2, "Country is required"),
  logoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  description: z.string().min(10, "Description is required"),
});

type UniversityValues = z.infer<typeof universitySchema>;

export function UniversityForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UniversityValues>({
    resolver: zodResolver(universitySchema) as any,
    defaultValues: initialData || {
      name: "",
      countryName: "",
      logoUrl: "",
      description: "",
    },
  });

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

      if (!res.ok) throw new Error("Failed to save university");

      toast({ title: "University saved successfully!" });
      router.push("/admin/universities");
      router.refresh();
    } catch (error) {
      toast({ title: "Error saving university", variant: "destructive" });
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
                <FormLabel>University Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Oxford University" {...field} />
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
                <FormLabel>Country Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. United Kingdom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="logoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo URL</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Brief overview of the university..." className="h-32" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4 border-t flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Saving..." : "Save University"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
