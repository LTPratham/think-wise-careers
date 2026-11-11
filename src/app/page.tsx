import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QuickEnquiryForm } from "@/components/forms/QuickEnquiryForm";
import { 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Compass, 
  Globe, 
  Sparkles, 
  Building2, 
  Banknote, 
  ShieldCheck, 
  Home as HomeIcon, 
  CreditCard,
  Percent,
  CalendarCheck,
  Headphones,
  ThumbsUp,
  Lock,
  Files,
  Zap,
  Star,
  Clock,
  BookOpen,
  Award,
  Tag
} from "lucide-react";
import { BookAirplane3D } from "@/components/animations/BookAirplane3D";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28 mesh-bg min-h-[85vh] sm:min-h-[90vh] flex items-center">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
          <BookAirplane3D />
        </div>

        {/* Subtle glowing orbs in the background */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 pointer-events-none">
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 relative pointer-events-auto">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-indigo-100 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-xs font-semibold text-indigo-950 uppercase tracking-wide">
                Free Student Profile Review
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-outfit tracking-tight leading-[1.15] text-slate-900">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">global future</span><br className="hidden sm:inline" /> starts with one conversation.
            </h1>

            <p className="text-base sm:text-xl text-slate-600 max-w-xl leading-relaxed">
              Share your details and our counselling team will help you explore the right study options for your goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1 sm:pt-2">
              <Button asChild size="lg" className="rounded-full text-sm sm:text-base px-6 sm:px-8 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all border-0">
                <Link href="/study-abroad">Explore Destinations <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-sm sm:text-base px-6 sm:px-8 h-12 bg-white/70 backdrop-blur-md border-slate-200 hover:bg-white text-slate-900 hover:-translate-y-0.5 transition-all">
                <a href="tel:+917300036507">Talk to an Advisor</a>
              </Button>
            </div>

            <div className="pt-2 sm:pt-4 flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600 font-medium">
              <div className="flex items-center space-x-1.5 sm:space-x-2 bg-white/80 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-slate-200 shadow-xs">
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                <span>17+ Countries</span>
              </div>
              <div className="flex items-center space-x-1.5 sm:space-x-2 bg-white/80 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-slate-200 shadow-xs">
                <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
                <span>600+ Global Universities</span>
              </div>
              <div className="flex items-center space-x-1.5 sm:space-x-2 bg-white/80 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-slate-200 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                <span>100% Transparent Process</span>
              </div>
            </div>
          </div>

          {/* Hero Form Card */}
          <div className="lg:col-span-5 relative mt-4 sm:mt-6 lg:mt-0 pointer-events-auto">
            <div className="glass-panel bg-white/95 rounded-3xl p-5 sm:p-8 relative z-10 border border-slate-100 shadow-[0_20px_60px_rgba(15,23,42,0.1)] backdrop-blur-2xl">
              <div className="mb-6">
                <h3 className="text-2xl font-bold font-outfit text-slate-900">Get Your Free Counselling</h3>
                <p className="text-slate-500 text-sm mt-1">It just takes few minutes.</p>
              </div>
              <QuickEnquiryForm sourcePage="Home Hero" ctaText="Continue" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pathways Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-3.5 py-1 rounded-full text-xs font-semibold mb-4 tracking-wider uppercase border border-indigo-100">
              Explore Global Opportunities
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-outfit text-slate-900 mb-4 tracking-tight">
              Choose <span className="text-indigo-600">Your Pathway</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Whether you&apos;re looking for world-class education, career-focused programs or long-term global opportunities, we have the right pathway for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Card 1: Study Abroad (7 cols) */}
            <div className="lg:col-span-7 rounded-[2.5rem] overflow-hidden bg-white border border-slate-200/80 shadow-xl shadow-slate-200/50 flex flex-col hover:border-indigo-200 hover:shadow-2xl transition-all duration-300">
              {/* Card Banner Header */}
              <div className="relative h-64 sm:h-72 bg-slate-900 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
                  alt="Students Graduating"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600 text-white shadow-md">
                    Global Degrees
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl sm:text-3xl font-bold font-outfit">Study Abroad</h3>
                  <p className="text-indigo-200 text-sm sm:text-base mt-1 font-medium">UK, Canada, Australia, USA & more</p>
                </div>
              </div>

              {/* Card Body Features */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">800+ Global Universities</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Choose from top-ranked institutions</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">17+ Countries</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Wide range of destinations</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Scholarship Guidance</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Find programs that fit your budget</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Application & Visa</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Complete end-to-end support</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Post-Study Work Permit</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Plan career after graduation</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Personalised Counselling</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Based on your profile and goals</p>
                    </div>
                  </div>
                </div>

                <Button asChild className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base shadow-md">
                  <Link href="/study-abroad">
                    Explore Study Abroad Destinations <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Card 2: Get a Free Counselling Session (5 cols) */}
            <div className="lg:col-span-5 rounded-[2.5rem] bg-white border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 sm:p-8 flex flex-col justify-between hover:border-indigo-200 hover:shadow-2xl transition-all duration-300">
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-3">
                    <GraduationCap className="w-4 h-4" />
                    <span>Not sure where to start?</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-outfit text-slate-900">
                    Get a Free Counselling Session
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
                    Our expert counsellors will help you choose the right country, university and program based on your profile, interests and career goals.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    "100% Free Guidance",
                    "Unbiased Counselling",
                    "Personalised University Shortlist",
                    "Application & Visa Support",
                    "End-to-End Assistance",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-slate-800 text-sm font-medium">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Button asChild variant="outline" className="w-full h-12 rounded-xl border-indigo-200 bg-indigo-50/50 hover:bg-indigo-600 hover:text-white text-indigo-700 font-semibold text-base transition-colors shadow-xs">
                  <Link href="/contact">
                    Book Free Counselling <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-CARD SHOWCASE SECTION: Student Accommodation, Education Loan, TOEFL Vouchers (Arch Theme) */}
      <section className="py-24 bg-white border-t border-slate-200/80 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-orange-400/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-400/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              SPECIALIZED STUDENT SERVICES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-outfit text-slate-900 tracking-tight">
              Everything You Need for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-blue-600 to-purple-600">Your Journey</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-3">
              Explore safe student accommodation, fast education loans, and official ETS TOEFL exam vouchers &mdash; with 1-click access to each service.
            </p>
          </div>

          {/* 3 Cards Matching the Client Graphic (Arch Theme) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
            
            {/* CARD 1: Student Accommodation (Orange / Warm Theme) */}
            <div className="rounded-[2.5rem] bg-white border-2 border-orange-100 hover:border-orange-300 shadow-xl shadow-orange-500/5 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col overflow-hidden group">
              {/* Top Arched Image Header */}
              <div className="relative h-60 bg-gradient-to-b from-orange-50 to-orange-100 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1200&auto=format&fit=crop"
                  alt="Student Accommodation Room"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                <div className="absolute top-5 left-5">
                  <span className="text-[11px] font-bold tracking-widest uppercase bg-orange-600 text-white px-3 py-1 rounded-full shadow-md">
                    LIVE COMFORTABLY ABROAD
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="text-2xl sm:text-3xl font-bold font-outfit text-white">
                    Student <span className="text-orange-400">Accommodation</span>
                  </h3>
                  <p className="text-xs text-slate-200 mt-1 leading-snug">
                    Safe, comfortable, and student-friendly housing options across top destinations.
                  </p>
                </div>
              </div>

              {/* Card Body - 6 Highlights */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3.5">
                  {[
                    { title: "Student-Friendly Accommodation Options", sub: "From university halls to private rentals", icon: HomeIcon, color: "bg-orange-500 text-white" },
                    { title: "Safe & Verified Properties", sub: "We partner with trusted accommodation providers", icon: ShieldCheck, color: "bg-blue-600 text-white" },
                    { title: "Easy & Hassle-Free Booking", sub: "Quick and transparent process", icon: CalendarCheck, color: "bg-orange-500 text-white" },
                    { title: "Dedicated Support Before & After Booking", sub: "Assistance throughout your stay", icon: Headphones, color: "bg-blue-600 text-white" },
                    { title: "Best Available Options for Students", sub: "Budget-friendly and well-located", icon: ThumbsUp, color: "bg-orange-500 text-white" },
                    { title: "Flexible Booking Protection", sub: "Change or cancel with peace of mind*", icon: Lock, color: "bg-blue-600 text-white" },
                  ].map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className={`w-7 h-7 rounded-full ${item.color} flex items-center justify-center shrink-0 mt-0.5 shadow-xs`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 leading-snug">{item.title}</div>
                          <div className="text-[11px] text-slate-500 leading-tight">{item.sub}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <Button asChild className="w-full h-12 rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2">
                    <Link href="/services/student-accommodation">
                      <span>Find Accommodation</span>
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* CARD 2: Education Loan Support (Blue / Corporate Theme) */}
            <div className="rounded-[2.5rem] bg-white border-2 border-blue-100 hover:border-blue-300 shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col overflow-hidden group">
              {/* Top Arched Image Header */}
              <div className="relative h-60 bg-gradient-to-b from-blue-50 to-blue-100 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
                  alt="Student with Books"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                <div className="absolute top-5 left-5">
                  <span className="text-[11px] font-bold tracking-widest uppercase bg-blue-600 text-white px-3 py-1 rounded-full shadow-md">
                    FUND YOUR GLOBAL DREAMS
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="text-2xl sm:text-3xl font-bold font-outfit text-white">
                    Education <span className="text-blue-400">Loan Support</span>
                  </h3>
                  <p className="text-xs text-slate-200 mt-1 leading-snug">
                    Access the right education loan through our extensive network of trusted lenders.
                  </p>
                </div>
              </div>

              {/* Card Body - 7 Highlights + Lending Partners */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="inline-block bg-orange-600 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider shadow-xs">
                    KEY HIGHLIGHTS
                  </div>

                  <div className="space-y-3">
                    {[
                      { title: "Pre-Sanction Support", sub: "Check your eligibility before you apply", icon: ShieldCheck, color: "bg-blue-600 text-white" },
                      { title: "Competitive Interest Rates", sub: "Get the best rates from top lenders", icon: Percent, color: "bg-orange-500 text-white" },
                      { title: "Low Processing Fee", sub: "Affordable and transparent charges", icon: Banknote, color: "bg-blue-600 text-white" },
                      { title: "Multiple Lending Options", sub: "Choose from NBFCs, private banks and more", icon: Files, color: "bg-orange-500 text-white" },
                      { title: "Quick & Hassle-Free Processing", sub: "Simplified documentation and faster approvals", icon: Zap, color: "bg-blue-600 text-white" },
                      { title: "Dedicated Loan Counsellor", sub: "Personalized guidance at every step", icon: Headphones, color: "bg-orange-500 text-white" },
                      { title: "Personalized Brand Experience", sub: "Stay connected throughout your complete loan journey", icon: Star, color: "bg-blue-600 text-white" },
                    ].map((item, idx) => {
                      const IconComp = item.icon;
                      return (
                        <div key={idx} className="flex items-start gap-3">
                          <div className={`w-7 h-7 rounded-full ${item.color} flex items-center justify-center shrink-0 mt-0.5 shadow-xs`}>
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 leading-snug">{item.title}</div>
                            <div className="text-[11px] text-slate-500 leading-tight">{item.sub}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Lending Partners pill bar */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-blue-700 mb-1">
                      Our Lending Partners
                    </div>
                    <div className="text-[10px] text-slate-600 font-medium">
                      Credila &bull; Avanse &bull; Tata Capital &bull; InCred &bull; Axis &bull; ICICI &bull; SBI &bull; Prodigy
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button asChild className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
                    <Link href="/services/education-loan">
                      <span>Explore Education Loans</span>
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* CARD 3: TOEFL Vouchers (Purple / Premium Prep Theme) */}
            <div className="rounded-[2.5rem] bg-white border-2 border-purple-100 hover:border-purple-300 shadow-xl shadow-purple-500/5 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col overflow-hidden group">
              {/* Top Arched Image Header */}
              <div className="relative h-60 bg-gradient-to-b from-purple-50 to-purple-100 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                  alt="Student with Laptop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <span className="text-[11px] font-bold tracking-widest uppercase bg-purple-700 text-white px-3 py-1 rounded-full shadow-md">
                    TEST PREP WITH REAL ADVANTAGE
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl sm:text-3xl font-bold font-outfit text-white">
                      TOEFL <span className="text-purple-300">Vouchers</span>
                    </h3>
                    <span className="bg-white/90 text-purple-950 font-black text-[11px] px-2 py-0.5 rounded shadow-sm">
                      ETS TOEFL
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 mt-1 leading-snug">
                    Official TOEFL test vouchers at best prices with complete support.
                  </p>
                </div>
              </div>

              {/* Card Body - 7 Highlights */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3.5">
                  {[
                    { title: "Accepted by 13,000+ Institutions", sub: "Across 160+ countries worldwide", icon: Building2 },
                    { title: "Results in as Little as 72 Hours", sub: "Plan your next steps faster", icon: Zap },
                    { title: "Less than 5% Need to Repeat the Test", sub: "With the right preparation", icon: CheckCircle2 },
                    { title: "Just 90 Minutes", sub: "One of the shortest English proficiency tests", icon: Clock },
                    { title: "Free Official Preparation Resources", sub: "Including study material and mock tests", icon: BookOpen },
                    { title: "B2-Level Scores Achievable", sub: "With focused preparation guidance", icon: Award },
                    { title: "Competitively Priced for Students", sub: "Get official vouchers at best rates", icon: Tag },
                  ].map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 leading-snug">{item.title}</div>
                          <div className="text-[11px] text-slate-500 leading-tight">{item.sub}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <Button asChild className="w-full h-12 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2">
                    <Link href="/services/toefl-vouchers">
                      <span>Get TOEFL Voucher</span>
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
