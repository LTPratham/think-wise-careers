import { QuickEnquiryForm } from "@/components/forms/QuickEnquiryForm";
import { 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  Award, 
  Tag, 
  Building2, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "TOEFL Vouchers | Think Wise Careers",
  description: "Get official ETS TOEFL test vouchers at student discount prices with rapid results, free prep materials, and complete booking assistance.",
};

const HIGHLIGHTS = [
  {
    icon: Building2,
    color: "from-purple-600 to-indigo-600",
    title: "Accepted by 13,000+ Institutions",
    desc: "Recognized across 160+ countries, including 100% of universities in the UK, USA, Canada, Australia, and New Zealand.",
  },
  {
    icon: Zap,
    color: "from-blue-600 to-cyan-600",
    title: "Results in as Little as 72 Hours",
    desc: "Fast scoring turnaround so you can meet urgent university application deadlines and visa processing cutoffs.",
  },
  {
    icon: CheckCircle2,
    color: "from-emerald-600 to-teal-600",
    title: "Less than 5% Need to Repeat",
    desc: "With our structured diagnostic orientation and prep guidelines, over 95% of candidates hit their target scores on test 1.",
  },
  {
    icon: Clock,
    color: "from-indigo-600 to-blue-600",
    title: "Just 90 Minutes Test Duration",
    desc: "One of the shortest and most student-friendly English proficiency exams in the world, reducing test fatigue.",
  },
  {
    icon: BookOpen,
    color: "from-pink-600 to-rose-600",
    title: "Free Official Prep Resources",
    desc: "Includes comprehensive ETS official preparation materials, practice test sets, sample essays, and mock tests.",
  },
  {
    icon: Award,
    color: "from-amber-500 to-orange-600",
    title: "B2-Level Scores Achievable",
    desc: "Attain CEFR B2 and C1 level scores with focused guidance from our verified language test mentors.",
  },
  {
    icon: Tag,
    color: "from-purple-700 to-indigo-900",
    title: "Competitively Priced for Students",
    desc: "Exclusive partner discount vouchers that save significant upfront money on standard test registration fees.",
  },
];

export default function ToeflVouchersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-gradient-to-b from-purple-50/50 via-white to-slate-50">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-purple-100/80 text-purple-900 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Test Prep with Real Advantage &bull; ETS Partner</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-outfit text-slate-900 tracking-tight leading-[1.15]">
              TOEFL <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">Vouchers</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed">
              Official TOEFL test vouchers at the best prices, with complete support from exam slot booking to test day preparation.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-lg font-bold text-purple-600">13,000+</div>
                <div className="text-xs text-slate-500 font-medium">Universities Accept</div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-lg font-bold text-blue-600">72 Hours</div>
                <div className="text-xs text-slate-500 font-medium">Score Availability</div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
                <div className="text-lg font-bold text-emerald-600">90 Mins</div>
                <div className="text-xs text-slate-500 font-medium">Short Exam Duration</div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-200/80">
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 mb-2">
                  <GraduationCap className="w-3.5 h-3.5" /> Official ETS Vouchers
                </div>
                <h3 className="text-2xl font-bold font-outfit text-slate-900">Get TOEFL Voucher</h3>
                <p className="text-slate-500 text-sm mt-1">It just takes few minutes.</p>
              </div>

              <QuickEnquiryForm 
                sourcePage="TOEFL Vouchers Page" 
                defaultServiceInterest="TOEFL Vouchers"
                hideServiceSelect={true}
                ctaText="Continue"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section className="py-24 bg-white border-y border-slate-200/70">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3.5 py-1 rounded-full border border-purple-100">
              Why Choose TOEFL iBT
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-slate-900 mt-3 mb-2">
              How You Can Win with TOEFL
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              The premier English proficiency credential preferred by premier academic institutions worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {HIGHLIGHTS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-slate-50/70 hover:bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-purple-200 transition-all duration-300 flex flex-col"
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
