"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, Phone, Video, MapPin, CheckCircle2, Globe, Shield, Sparkles, ArrowRight, User, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const TIME_SLOTS = [
  "10:00 AM - 10:30 AM",
  "11:30 AM - 12:00 PM",
  "02:00 PM - 02:30 PM",
  "03:30 PM - 04:00 PM",
  "05:00 PM - 05:30 PM",
  "06:30 PM - 07:00 PM",
];

const SERVICES = [
  { id: "Study Abroad", label: "Study Abroad (Bachelors / Masters)", icon: Globe, desc: "UK, USA, Canada, Germany, Australia" },
  { id: "MBBS Abroad", label: "MBBS Abroad (NMC Recognized)", icon: Shield, desc: "Georgia, Russia, Uzbekistan, Philippines" },
  { id: "Career Counselling", label: "Career Counselling & Profiling", icon: Sparkles, desc: "Aptitude, stream selection & career mapping" },
];

const MODES = [
  { id: "PHONE_CALL", label: "Phone Call", icon: Phone, desc: "We call you directly on your mobile number" },
  { id: "GOOGLE_MEET", label: "Google Meet / Video", icon: Video, desc: "1-on-1 video call link sent to your email" },
  { id: "IN_PERSON_JAIPUR", label: "In-Person (Jaipur)", icon: MapPin, desc: "Visit our Jaipur head office for counseling" },
];

export default function ScheduleConsultationPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [serviceInterest, setServiceInterest] = useState("Study Abroad");
  const [targetCountry, setTargetCountry] = useState("");
  const [targetDegree, setTargetDegree] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const [selectedMode, setSelectedMode] = useState("PHONE_CALL");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  // Calculate available dates (next 10 days excluding Sundays)
  const availableDates: { value: string; label: string; day: string }[] = [];
  const today = new Date();
  for (let i = 1; i <= 14 && availableDates.length < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) { // Exclude Sundays
      availableDates.push({
        value: d.toISOString().slice(0, 10),
        label: d.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
        day: d.toLocaleDateString("en-IN", { weekday: "short" }),
      });
    }
  }

  // Set default date on mount
  if (!selectedDate && availableDates.length > 0) {
    setSelectedDate(availableDates[0].value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in your name, email, and phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: selectedDate,
          timeSlot: selectedSlot,
          mode: selectedMode,
          serviceInterest,
          targetCountry: targetCountry || undefined,
          targetDegree: targetDegree || undefined,
          notes: formData.notes || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to book consultation");
      }

      setIsSubmitted(true);
      toast.success("Consultation booked successfully! Confirmation email sent.");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-indigo-50/20 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3">
            <Sparkles className="w-3.5 h-3.5" /> VIP Priority Advisory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-outfit">
            Schedule Your 1-on-1 Consultation
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
            Book a dedicated 30-minute session with our senior educational advisors to evaluate your profile, universities, and scholarships.
          </p>
        </div>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-10 text-center"
          >
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-outfit">Appointment Confirmed!</h2>
            <p className="text-slate-600 mt-2">
              We have sent full appointment details and calendar invites to <strong className="text-slate-900">{formData.email}</strong>.
            </p>

            <div className="my-6 bg-slate-50 border border-slate-200 rounded-xl p-6 text-left max-w-md mx-auto space-y-3 text-sm text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Date:</span>
                <span className="font-semibold text-slate-900">{new Date(selectedDate).toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Time:</span>
                <span className="font-semibold text-slate-900">{selectedSlot} (IST)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mode:</span>
                <span className="font-semibold text-slate-900">{MODES.find(m => m.id === selectedMode)?.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Focus:</span>
                <span className="font-semibold text-slate-900">{serviceInterest}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="bg-[#25D366] hover:bg-[#1ebd5a] text-white">
                <a href={`https://wa.me/917300036507?text=Hi%20Think%20Wise%20Careers,%20I%20have%20booked%20a%20consultation%20for%20${encodeURIComponent(selectedDate)}.`} target="_blank" rel="noopener noreferrer">
                  💬 Chat on WhatsApp
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/">Return to Home</a>
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            
            {/* Progress Bar */}
            <div className="bg-slate-100 h-2 w-full">
              <div 
                className="bg-primary h-2 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: Area of Focus */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 font-outfit">Step 1: What is your primary interest?</h2>
                      <p className="text-sm text-slate-500 mt-1">Select the advisory program that best matches your goals.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {SERVICES.map((s) => {
                        const Icon = s.icon;
                        const isSelected = serviceInterest === s.id;
                        return (
                          <button
                            type="button"
                            key={s.id}
                            onClick={() => setServiceInterest(s.id)}
                            className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                              isSelected 
                                ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm" 
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                          >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
                              isSelected ? "bg-primary text-white" : "bg-slate-100 text-slate-600"
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-slate-900">{s.label}</div>
                              <div className="text-xs text-slate-500 mt-1">{s.desc}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Target Country (Optional)
                        </label>
                        <Input 
                          placeholder="e.g. UK, Germany, Georgia, USA" 
                          value={targetCountry}
                          onChange={(e) => setTargetCountry(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Target Degree / Course (Optional)
                        </label>
                        <Input 
                          placeholder="e.g. MBBS, MS Computer Science, MBA" 
                          value={targetDegree}
                          onChange={(e) => setTargetDegree(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <Button type="button" onClick={() => setStep(2)}>
                        Continue to Date & Time <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Pick Date, Time & Mode */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 font-outfit">Step 2: Choose Date, Time Slot & Mode</h2>
                      <p className="text-sm text-slate-500 mt-1">Select when you are free and how you would prefer to connect.</p>
                    </div>

                    {/* Date Selector */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <CalendarIcon className="w-3.5 h-3.5 text-primary" /> Select Date
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                        {availableDates.map((d) => {
                          const isSelected = selectedDate === d.value;
                          return (
                            <button
                              type="button"
                              key={d.value}
                              onClick={() => setSelectedDate(d.value)}
                              className={`p-2.5 rounded-xl border text-center transition-all ${
                                isSelected
                                  ? "border-primary bg-primary text-white shadow-sm font-semibold"
                                  : "border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700"
                              }`}
                            >
                              <div className="text-[11px] opacity-80 uppercase">{d.day}</div>
                              <div className="text-sm font-bold mt-0.5">{d.label}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Slot Selector */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary" /> Select Preferred Time Slot (IST)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {TIME_SLOTS.map((slot) => {
                          const isSelected = selectedSlot === slot;
                          return (
                            <button
                              type="button"
                              key={slot}
                              onClick={() => setSelectedSlot(slot)}
                              className={`p-2.5 rounded-xl border text-xs font-medium transition-all text-center ${
                                isSelected
                                  ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20 font-semibold"
                                  : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Mode Selector */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Consultation Mode
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {MODES.map((m) => {
                          const Icon = m.icon;
                          const isSelected = selectedMode === m.id;
                          return (
                            <button
                              type="button"
                              key={m.id}
                              onClick={() => setSelectedMode(m.id)}
                              className={`p-3 rounded-xl border text-left transition-all ${
                                isSelected
                                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                  : "border-slate-200 hover:border-slate-300 bg-white"
                              }`}
                            >
                              <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? "text-primary" : "text-slate-500"}`} />
                              <div className="font-semibold text-xs text-slate-900">{m.label}</div>
                              <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">{m.desc}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button type="button" onClick={() => setStep(3)}>
                        Continue to Your Details <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Contact Info & Confirm */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 font-outfit">Step 3: Your Contact Details</h2>
                      <p className="text-sm text-slate-500 mt-1">We will send confirmation and call you at your booked time.</p>
                    </div>

                    <div className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <Input 
                            className="pl-9"
                            placeholder="John Doe"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <Input 
                              type="email"
                              className="pl-9"
                              placeholder="john@example.com"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                            WhatsApp / Phone Number *
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <Input 
                              className="pl-9"
                              placeholder="+91 73000 36507"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Brief Note or Specific Questions (Optional)
                        </label>
                        <Textarea 
                          placeholder="e.g. I want to know about fee budget for MBBS in Georgia and NEET eligibility."
                          rows={3}
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Booking Summary Box */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-1">
                      <div className="font-semibold text-slate-800">Booking Overview:</div>
                      <div>📅 <strong>{new Date(selectedDate).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</strong> at <strong>{selectedSlot}</strong></div>
                      <div>🎯 {serviceInterest} · {MODES.find(m => m.id === selectedMode)?.label}</div>
                    </div>

                    <div className="pt-3 flex justify-between items-center">
                      <Button type="button" variant="outline" onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <Button type="submit" disabled={isSubmitting} className="min-w-[160px]">
                        {isSubmitting ? "Confirming Slot..." : "Confirm Consultation"}
                      </Button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
