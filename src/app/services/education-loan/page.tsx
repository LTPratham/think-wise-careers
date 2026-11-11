import { QuickEnquiryForm } from "@/components/forms/QuickEnquiryForm";
import { 
  CreditCard, 
  Percent, 
  Banknote, 
  Files, 
  Zap, 
  Headphones, 
  Star, 
  CheckCircle2, 
  Building2, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Education Loan Support | Think Wise Careers",
  description: "Access fast, collateral-free and competitive overseas education loans from 16+ trusted NBFCs, private banks, government banks, and international lenders.",
};

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    color: "from-blue-600 to-indigo-600",
    title: "Pre-Sanction Support",
    desc: "Check your loan eligibility and secure pre-sanction letters even before admission confirmation.",
  },
  {
    icon: Percent,
    color: "from-red-500 to-orange-500",
    title: "Competitive Interest Rates",
    desc: "Get the lowest rates across premier banking partners with transparent repayment terms.",
  },
  {
    icon: Banknote,
    color: "from-blue-600 to-cyan-600",
    title: "Low Processing Fee",
    desc: "Affordable and transparent charges with zero hidden clauses to save your upfront costs.",
  },
  {
    icon: Files,
    color: "from-orange-500 to-amber-500",
    title: "Multiple Lending Options",
    desc: "Compare offers across leading NBFCs, top private banks, nationalized PSU banks, and international USD lenders.",
  },
  {
    icon: Zap,
    color: "from-indigo-600 to-purple-600",
    title: "Quick & Hassle-Free Processing",
    desc: "Simplified digital documentation and priority fast-track sanction within 7 to 10 working days.",
  },
  {
    icon: Headphones,
    color: "from-orange-600 to-rose-600",
    title: "Dedicated Loan Counsellor",
    desc: "One-on-one expert guidance to prepare loan paperwork, financial affidavits, and disbursement milestones.",
  },
  {
    icon: Star,
    color: "from-purple-600 to-indigo-700",
    title: "Personalized Brand Experience",
    desc: "Stay connected throughout your journey with end-to-end dedicated support from profile to payout.",
  },
];

const LENDING_PARTNERS = [
  {
    category: "NBFCs",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    partners: [
      { name: "HDFC Credila", desc: "The Education Loan Specialist" },
      { name: "Avanse", desc: "Financial Services" },
      { name: "Poonawalla Fincorp", desc: "Affordable Student Finance" },
      { name: "InCred", desc: "Borrow with Confidence" },
      { name: "Tata Capital", desc: "Count on Us" },
      { name: "Auxilo", desc: "Finserve Private Ltd" },
    ],
  },
  {
    category: "Private Banks",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    partners: [
      { name: "Axis Bank", desc: "Premier Education Loans" },
      { name: "ICICI Bank", desc: "Fast Track Sanctions" },
      { name: "IDFC FIRST Bank", desc: "Zero Prepayment Penalty" },
    ],
  },
  {
    category: "Government / PSU Banks",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    partners: [
      { name: "State Bank of India (SBI)", desc: "Global Ed-Vantage Scheme" },
      { name: "Union Bank of India", desc: "Special Student Rates" },
      { name: "Punjab National Bank (PNB)", desc: "Udaan Overseas Scheme" },
      { name: "Saraswat Bank", desc: "Trusted Co-op Banking" },
    ],
  },
  {
    category: "International Lenders",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    partners: [
      { name: "Avanse Global", desc: "Cross-border USD Lending" },
      { name: "Prodigy Finance", desc: "No Cosigner / No Collateral" },
      { name: "MPOWER Financing", desc: "USD Loans for Global Scholars" },
    ],
  },
];

export default function EducationLoanPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-100/80 text-blue-900 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Fund Your Global Dreams</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-outfit text-slate-900 tracking-tight leading-[1.15]">
              Education <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Loan Support</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed">
              Access the right education loan through our extensive network of trusted lenders — covering tuition, living expenses, and travel with zero hassle.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-lg font-bold text-blue-600">16+</div>
                <div className="text-xs text-slate-500 font-medium">Lending Partners</div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-lg font-bold text-indigo-600">Up to 1.5 Cr</div>
                <div className="text-xs text-slate-500 font-medium">Collateral & Non-Collateral</div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
                <div className="text-lg font-bold text-emerald-600">7-10 Days</div>
                <div className="text-xs text-slate-500 font-medium">Fast Sanction Turnaround</div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-200/80">
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
                  <CreditCard className="w-3.5 h-3.5" /> Finance Desk
                </div>
                <h3 className="text-2xl font-bold font-outfit text-slate-900">Explore Education Loans</h3>
                <p className="text-slate-500 text-sm mt-1">It just takes few minutes.</p>
              </div>

              <QuickEnquiryForm 
                sourcePage="Education Loan Page" 
                defaultServiceInterest="Education Loan"
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
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
              Key Highlights
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-slate-900 mt-3 mb-2">
              Why Process Your Loan With Think Wise Careers?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              We eliminate complex bank queues, optimize sanction terms, and compare lenders to get you the lowest interest rate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {HIGHLIGHTS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-slate-50/70 hover:bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col"
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

      {/* Lending Partners Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
              Our Lending Partners
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-slate-900 mt-3 mb-2">
              Extensive Network of Trusted Banking Partners
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Direct institutional tie-ups with top financial providers to ensure you receive instant eligibility checks and lowest fees.
            </p>
          </div>

          <div className="space-y-10 max-w-5xl mx-auto">
            {LENDING_PARTNERS.map((cat, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${cat.badgeColor}`}>
                    {cat.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {cat.partners.length} verified lenders
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {cat.partners.map((partner, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-center flex flex-col items-center justify-center min-h-[90px]"
                    >
                      <div className="font-bold text-xs sm:text-sm text-slate-900 mb-1 leading-snug">
                        {partner.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium leading-tight">
                        {partner.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
