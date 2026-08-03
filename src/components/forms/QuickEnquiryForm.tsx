"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { QuickEnquirySchema } from "@/lib/validators";
import { useFormSessionPersistence } from "./FormSessionPersistence";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type QuickEnquiryValues = z.infer<typeof QuickEnquirySchema>;

export function QuickEnquiryForm({ sourcePage = "Home" }: { sourcePage?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<QuickEnquiryValues>({
    resolver: zodResolver(QuickEnquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      serviceInterest: "",
    },
  });

  const { clearSession } = useFormSessionPersistence("quickEnquiryDraft", form);

  async function onSubmit(data: QuickEnquiryValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, sourcePage }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit enquiry");
      }

      toast.success("Enquiry submitted successfully! We will contact you soon.");
      clearSession();
      form.reset();
    } catch (error) {
      toast.error("Failed to submit. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+91 99999 99999" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="serviceInterest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interested In</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || undefined}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Study Abroad">Study Abroad Admissions</SelectItem>
                  <SelectItem value="MBBS Abroad">MBBS Abroad</SelectItem>
                  <SelectItem value="Career Counselling">Career Counselling</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Get Free Consultation"}
        </Button>
      </form>
    </Form>
  );
}
