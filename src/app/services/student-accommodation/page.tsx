import { QuickEnquiryForm } from "@/components/forms/QuickEnquiryForm";
import { 
  Home, 
  ShieldCheck, 
  CalendarCheck, 
  Headphones, 
  ThumbsUp, 
  Lock, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Student Accommodation | Think Wise Careers",
  description: "Safe, comfortable, and student-friendly housing options across the UK, Canada, Ireland, USA, New Zealand, UAE, and Europe.",
};

const COUNTRIES = [
  { name: "United Kingdom", flag: "🇬🇧", desc: "Halls of residence & private student studios near top UK universities" },
  { name: "Canada", flag: "🇨🇦", desc: "On-campus & off-campus verified apartments across major provinces" },
  { name: "Ireland", flag: "🇮🇪", desc: "Purpose-built student residences in Dublin, Cork, and Galway" },
  { name: "United States", flag: "🇺🇸", desc: "Dorms, shared student suites & luxury student housing options" },
  { name: "New Zealand", flag: "🇳🇿", desc: "Homestays, campus colleges & student apartments" },
  { name: "UAE", flag: "🇦🇪", desc: "Modern, secure student housing in Dubai and Abu Dhabi" },
  { name: "European Countries", flag: "🇪🇺", desc: "Affordable student accommodation across Germany, France & more" },
];

const HIGHLIGHTS = [
  {
    icon: Home,
    color: "from-orange-500 to-amber-500",
    title: "Student-Friendly Accommodation Options",
    desc: "From university residential halls to fully furnished private student apartments and shared flats.",
  },
  {
    icon: ShieldCheck,
    color: "from-blue-600 to-indigo-600",
    title: "Safe & Verified Properties",
    desc: "We partner strictly with accredited accommodation providers featuring 24/7 security and verified amenities.",
  },
  {
    icon: CalendarCheck,
    color: "from-emerald-600 to-teal-600",
    title: "Easy & Hassle-Free Booking",
    desc: "100% digital, fast paperwork and transparent booking terms before you even board your flight.",
  },
  {
    icon: Headphones,
    color: "from-purple-600 to-pink-600",
    title: "Dedicated Support Before & After Booking",
    desc: "Personalized assistance throughout your overseas stay — from move-in checks to maintenance escalation.",
  },
  {
    icon: ThumbsUp,
    color: "from-amber-600 to-orange-600",
    title: "Best Available Options for Students",
    desc: "Budget-friendly options strategically located close to transit hubs and university campuses.",
  },
  {
    icon: Lock,
    color: "from-cyan-600 to-blue-600",
    title: "Flexible Booking Protection",
    desc: "No visa, no pay policies and flexible cancellation protections so you can book with total peace of mind.",
  },
];

export default function StudentAccommodationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-gradient-to-b from-orange-50/40 via-white to-slate-50">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-orange-100/80 text-orange-800 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-orange-200">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Live Comfortably Abroad</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-outfit text-slate-900 tracking-tight leading-[1.15]">
              Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-red-600">Accommodation</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed">
              Safe, comfortable, and student-friendly housing options across top overseas study destinations — confirmed before you travel.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-lg font-bold text-orange-600">100%</div>
                <div className="text-xs text-slate-500 font-medium">Verified Properties</div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-lg font-bold text-blue-600">7+</div>
                <div className="text-xs text-slate-500 font-medium">Global Countries</div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
                <div className="text-lg font-bold text-emerald-600">24/7</div>
                <div className="text-xs text-slate-500 font-medium">Student Support</div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-200/80">
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200 mb-2">
                  <Home className="w-3.5 h-3.5" /> Housing Desk
                </div>
                <h3 className="text-2xl font-bold font-outfit text-slate-900">Find Accommodation</h3>
                <p className="text-slate-500 text-sm mt-1">It just takes few minutes.</p>
              </div>

              <QuickEnquiryForm 
                sourcePage="Student Accommodation Page" 
                defaultServiceInterest="Student Accommodation"
                hideServiceSelect={true}
                ctaText="Continue"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Countries Available In Section */}
      <section className="py-20 bg-white border-y border-slate-200/70">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1 rounded-full border border-orange-100">
              Worldwide Locations
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-slate-900 mt-3 mb-2">
              Accommodation Available In
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Explore safe, fully-furnished student housing near top universities across all major education hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {COUNTRIES.map((c, i) => (
              <div 
                key={i} 
                className="bg-slate-50/70 hover:bg-orange-50/40 p-5 rounded-2xl border border-slate-200 hover:border-orange-200 transition-all duration-200 flex flex-col justify-between group shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{c.flag}</span>
                    <h3 className="text-lg font-bold font-outfit text-slate-900 group-hover:text-orange-600 transition-colors">
                      {c.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-orange-600">
                  <span>Explore stays</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1 rounded-full border border-orange-100">
              Why Book With Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-slate-900 mt-3 mb-2">
              Key Accommodation Highlights
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              We ensure your transition abroad is comfortable, secure, and completely hassle-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {HIGHLIGHTS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center mb-5 shadow-sm`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-outfit text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
