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
import { CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, Lock, PhoneCall } from "lucide-react";

type QuickEnquiryValues = z.infer<typeof QuickEnquirySchema>;

interface QuickEnquiryFormProps {
  sourcePage?: string;
  defaultServiceInterest?: string;
  hideServiceSelect?: boolean;
  ctaText?: string;
}

export function QuickEnquiryForm({
  sourcePage = "Home",
  defaultServiceInterest = "Study Abroad",
  hideServiceSelect = false,
  ctaText = "Continue",
}: QuickEnquiryFormProps) {
  const [step, setStep] = useState<"DETAILS" | "OTP" | "SUCCESS">("DETAILS");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingData, setPendingData] = useState<QuickEnquiryValues | null>(null);

  const form = useForm<QuickEnquiryValues>({
    resolver: zodResolver(QuickEnquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceInterest: defaultServiceInterest,
    },
  });

  const { clearSession } = useFormSessionPersistence(`quickEnquiryDraft_${sourcePage}`, form);

  // Called when user clicks "Continue"
  function onDetailsSubmit(data: QuickEnquiryValues) {
    // If phone doesn't have country code and is 10 digits, prefix with +91
    let formattedPhone = data.phone.trim();
    if (/^\d{10}$/.test(formattedPhone)) {
      formattedPhone = `+91 ${formattedPhone}`;
    }
    const finalData = {
      ...data,
      phone: formattedPhone,
      serviceInterest: data.serviceInterest || defaultServiceInterest,
    };
    setPendingData(finalData);
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
    form.reset({
      name: "",
      email: "",
      phone: "",
      serviceInterest: defaultServiceInterest,
    });
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
              <FormLabel className="text-xs font-semibold text-slate-700">Full name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" className="h-11 rounded-xl bg-slate-50/50 border-slate-200 focus:bg-white text-sm" {...field} />
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
              <FormLabel className="text-xs font-semibold text-slate-700">Email address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" className="h-11 rounded-xl bg-slate-50/50 border-slate-200 focus:bg-white text-sm" {...field} />
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
              <FormLabel className="text-xs font-semibold text-slate-700">Mobile number</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 select-none">
                    🇮🇳 +91
                  </div>
                  <Input
                    placeholder="10-digit mobile number"
                    className="h-11 rounded-xl bg-slate-50/50 border-slate-200 focus:bg-white text-sm flex-1"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!hideServiceSelect && (
          <FormField
            control={form.control}
            name="serviceInterest"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-slate-700">Interested In</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || defaultServiceInterest}>
                  <FormControl>
                    <SelectTrigger className="h-11 rounded-xl bg-slate-50/50 border-slate-200 focus:bg-white text-sm">
                      <SelectValue placeholder="Select an area of interest" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Study Abroad">Study Abroad</SelectItem>
                    <SelectItem value="Education Loan">Education Loan Support</SelectItem>
                    <SelectItem value="Student Accommodation">Student Accommodation</SelectItem>
                    <SelectItem value="TOEFL Vouchers">TOEFL Vouchers</SelectItem>
                    <SelectItem value="Career Counselling">Career Counselling</SelectItem>
                    <SelectItem value="Visa Assistance">Visa Assistance</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="pt-2 space-y-3">
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-base"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 font-medium">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            We&apos;ll send a one-time OTP to verify your number.
          </p>

          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            By continuing, you agree to be contacted by Think Wise Careers about your enquiry. Your information is kept private.
          </p>

          <div className="pt-1 text-center">
            <a
              href="tel:+917300036507"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-indigo-500" />
              <span>Prefer to talk? Call <strong className="text-indigo-600">+91 73000 36507</strong></span>
            </a>
          </div>
        </div>
      </form>
    </Form>
  );
}
