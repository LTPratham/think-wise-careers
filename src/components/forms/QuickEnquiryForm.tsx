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
import { OtpVerificationStep } from "./OtpVerificationStep";
import { CheckCircle2, MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";

type QuickEnquiryValues = z.infer<typeof QuickEnquirySchema>;

export function QuickEnquiryForm({ sourcePage = "Home" }: { sourcePage?: string }) {
  const [step, setStep] = useState<"DETAILS" | "OTP" | "SUCCESS">("DETAILS");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingData, setPendingData] = useState<QuickEnquiryValues | null>(null);

  const form = useForm<QuickEnquiryValues>({
    resolver: zodResolver(QuickEnquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceInterest: "",
    },
  });

  const { clearSession } = useFormSessionPersistence("quickEnquiryDraft", form);

  // Called when user clicks "Proceed to Verification"
  function onDetailsSubmit(data: QuickEnquiryValues) {
    setPendingData(data);
    setStep("OTP");
  }

  // Called once OTP is verified
  async function handleVerifiedSubmission(verificationToken: string, channel: "PHONE" | "EMAIL") {
    if (!pendingData) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...pendingData,
          sourcePage,
          verificationToken,
          verifiedChannel: channel,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit enquiry");
      }

      toast.success("Inquiry submitted successfully! A senior counsellor will contact you.");
      clearSession();
      setStep("SUCCESS");
    } catch (error) {
      toast.error("Failed to submit inquiry. Please try again or contact us directly.");
      setStep("DETAILS");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    form.reset();
    setPendingData(null);
    setStep("DETAILS");
  }

  // SUCCESS STEP
  if (step === "SUCCESS") {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917300036507";
    const waText = encodeURIComponent(
      `Hi Think Wise Careers, I just verified my inquiry for ${pendingData?.serviceInterest || "counselling"}. Could you connect with me?`
    );

    return (
      <div className="text-center py-8 px-4 space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Inquiry
          </span>
          <h3 className="text-2xl font-bold font-outfit text-slate-900">
            Thank You, {pendingData?.name}!
          </h3>
          <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
            Your inquiry has been verified and assigned to our senior admissions counselling team. We will reach out shortly via phone & WhatsApp.
          </p>
        </div>

        <div className="pt-2 space-y-3">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all text-sm"
          >
            <MessageCircle className="w-5 h-5" /> Chat Instantly on WhatsApp
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-800 underline block mx-auto pt-2"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  // OTP STEP
  if (step === "OTP" && pendingData) {
    return (
      <OtpVerificationStep
        email={pendingData.email}
        phone={pendingData.phone}
        defaultChannel="PHONE"
        onVerified={handleVerifiedSubmission}
        onCancel={() => setStep("DETAILS")}
        isSubmittingLead={isSubmitting}
      />
    );
  }

  // DETAILS FORM STEP
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onDetailsSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Rahul Sharma" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="rahul@example.com" {...field} />
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
              <FormLabel>Mobile Number (for OTP verification)</FormLabel>
              <FormControl>
                <Input placeholder="+91 73000 36507" {...field} />
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
                    <SelectValue placeholder="Select an area of interest" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Study Abroad">Study Abroad Admissions</SelectItem>
                  <SelectItem value="MBBS Abroad">MBBS Abroad Guidance</SelectItem>
                  <SelectItem value="Career Counselling">Career Counselling</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Verify</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <p className="text-[11px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
            We will verify your inquiry with an instant SMS or Email OTP
          </p>
        </div>
      </form>
    </Form>
  );
}
