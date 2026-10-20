"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageCircle, RefreshCw, CheckCircle2, ShieldCheck, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface OtpVerificationStepProps {
  email: string;
  phone: string;
  defaultChannel?: "PHONE" | "EMAIL";
  onVerified: (verificationToken: string, channel: "PHONE" | "EMAIL") => Promise<void>;
  onCancel: () => void;
  isSubmittingLead?: boolean;
}

export function OtpVerificationStep({
  email,
  phone,
  defaultChannel = "PHONE",
  onVerified,
  onCancel,
  isSubmittingLead = false,
}: OtpVerificationStepProps) {
  const [channel, setChannel] = useState<"PHONE" | "EMAIL">(defaultChannel);
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(45);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const sentKeyRef = useRef<string | null>(null);

  const activeIdentifier = channel === "PHONE" ? phone : email;

  // Countdown timer for resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Trigger initial OTP send on mount or channel switch (guarded against React 18 StrictMode duplicate run)
  useEffect(() => {
    const key = `${channel}:${channel === "PHONE" ? phone : email}`;
    if (sentKeyRef.current === key) return;
    sentKeyRef.current = key;
    handleSendOtp(channel);
  }, [channel, phone, email]);

  // Focus first input box on load
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, [channel]);

  async function handleSendOtp(targetChannel: "PHONE" | "EMAIL") {
    if (isSending) return;
    setIsSending(true);
    setErrorMsg(null);
    setOtpDigits(["", "", "", "", "", ""]);

    try {
      const targetId = targetChannel === "PHONE" ? phone : email;
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: targetId,
          channel: targetChannel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }

      toast.success(
        targetChannel === "PHONE"
          ? `Verification code sent via SMS to ${phone}`
          : `Verification code sent to ${email}`
      );

      setResendCooldown(45);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to send code. Please try again.");
      toast.error(err.message || "Failed to send OTP");
    } finally {
      setIsSending(false);
    }
  }

  function handleDigitChange(index: number, value: string) {
    if (errorMsg) setErrorMsg(null);

    // Handle multi-character paste (e.g. user pasted 6-digit code)
    if (value.length > 1) {
      const pasted = value.replace(/\D/g, "").slice(0, 6);
      if (pasted.length > 0) {
        const newDigits = [...otpDigits];
        for (let i = 0; i < 6; i++) {
          newDigits[i] = pasted[i] || "";
        }
        setOtpDigits(newDigits);
        const nextFocus = Math.min(pasted.length, 5);
        inputRefs.current[nextFocus]?.focus();
        return;
      }
    }

    const singleDigit = value.replace(/\D/g, "").slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = singleDigit;
    setOtpDigits(newDigits);

    // Auto-advance
    if (singleDigit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  async function handleVerify() {
    const code = otpDigits.join("");
    if (code.length !== 6) {
      setErrorMsg("Please enter the complete 6-digit verification code.");
      return;
    }

    setIsVerifying(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: activeIdentifier,
          channel,
          code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Verification failed");
      }

      toast.success("Verification successful!");
      await onVerified(data.verificationToken, channel);
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid or expired OTP code.");
      toast.error(err.message || "Verification failed");
    } finally {
      setIsVerifying(false);
    }
  }

  const isFullCodeEntered = otpDigits.every((d) => d.length === 1);

  return (
    <div className="bg-slate-50/80 border border-indigo-100 rounded-2xl p-6 shadow-inner space-y-6 animate-in fade-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold font-outfit text-slate-900">
          Verify Your Inquiry
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Please verify your contact details to receive prompt guidance from our senior academic counsellors.
        </p>
      </div>

      {/* Dual Channel Tabs */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-slate-200/60 rounded-xl">
        <button
          type="button"
          onClick={() => {
            if (channel !== "PHONE") setChannel("PHONE");
          }}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
            channel === "PHONE"
              ? "bg-white text-indigo-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          WhatsApp / SMS ({phone ? phone.slice(-4).padStart(phone.length, "•") : "Mobile"})
        </button>

        <button
          type="button"
          onClick={() => {
            if (channel !== "EMAIL") setChannel("EMAIL");
          }}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
            channel === "EMAIL"
              ? "bg-white text-indigo-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          Email OTP
        </button>
      </div>

      {/* Current destination info */}
      <div className="text-center">
        <span className="text-xs text-slate-500">
          Sending code to:{" "}
          <strong className="text-slate-800 font-mono">
            {activeIdentifier || "your contact"}
          </strong>
        </span>
      </div>

      {/* 6-Digit PIN Boxes */}
      <div className="flex justify-center items-center gap-2 sm:gap-3">
        {otpDigits.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleDigitChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold font-mono rounded-xl border transition-all outline-none ${
              digit
                ? "border-indigo-600 bg-white shadow-sm ring-2 ring-indigo-100"
                : "border-slate-300 bg-white hover:border-slate-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            }`}
          />
        ))}
      </div>


      {/* Error message */}
      {errorMsg && (
        <p className="text-xs text-red-600 text-center font-medium bg-red-50 p-2 rounded-lg border border-red-100">
          {errorMsg}
        </p>
      )}

      {/* Actions */}
      <div className="space-y-3">
        <Button
          type="button"
          onClick={handleVerify}
          disabled={!isFullCodeEntered || isVerifying || isSubmittingLead}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all disabled:opacity-50"
        >
          {isVerifying || isSubmittingLead ? (
            <span className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" /> Verifying & Submitting...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Verify & Complete Inquiry
            </span>
          )}
        </Button>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <button
            type="button"
            onClick={onCancel}
            disabled={isVerifying || isSubmittingLead}
            className="flex items-center gap-1 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Edit Details
          </button>

          {resendCooldown > 0 ? (
            <span className="text-slate-400">
              Resend in <strong className="text-slate-600">{resendCooldown}s</strong>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => handleSendOtp(channel)}
              disabled={isSending}
              className="text-indigo-600 font-semibold hover:underline flex items-center gap-1"
            >
              {isSending ? (
                <RefreshCw className="w-3 h-3 animate-spin" />
              ) : null}
              Resend Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
