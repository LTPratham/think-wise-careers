import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2, Home, CreditCard, GraduationCap, Building2, Compass, ShieldCheck } from "lucide-react";
import { QuickEnquiryForm } from "@/components/forms/QuickEnquiryForm";

const CORE_SERVICES = [
  {
    id: "study-abroad",
    slug: "study-abroad-admissions",
    name: "Study Abroad Admissions",
    description: "Guidance for undergraduate and postgraduate programs across 800+ top universities worldwide.",
    icon: Building2,
    href: "/study-abroad",
    ctaText: "Explore Universities",
  },
  {
    id: "education-loan",
    slug: "education-loan",
    name: "Education Loan Support",
    description: "Fast, pre-sanctioned education loans through our extensive network of 16+ trusted NBFCs and banks.",
    icon: CreditCard,
    href: "/services/education-loan",
    ctaText: "Explore Loans",
  },
  {
    id: "student-accommodation",
    slug: "student-accommodation",
    name: "Student Accommodation",
    description: "Safe, verified and student-friendly housing options across the UK, Canada, Ireland, USA, UAE & Europe.",
    icon: Home,
    href: "/services/student-accommodation",
    ctaText: "Find Housing",
  },
  {
    id: "toefl-vouchers",
    slug: "toefl-vouchers",
    name: "TOEFL Vouchers",
    description: "Official ETS TOEFL vouchers with quick processing, free prep resources, and student discount rates.",
    icon: GraduationCap,
    href: "/services/toefl-vouchers",
    ctaText: "Get Voucher",
  },
  {
    id: "career-counselling",
    slug: "career-counselling",
    name: "Career Counselling",
    description: "Psychometric testing and personalized one-on-one career guidance to choose the ideal study path.",
    icon: Compass,
    href: "/career-counselling",
    ctaText: "Book Session",
  },
  {
    id: "visa-assistance",
    slug: "visa-assistance",
    name: "Visa & Financial Assistance",
    description: "End-to-end visa filing, financial affidavit review, and rigorous mock interview preparations.",
    icon: ShieldCheck,
    href: "/services/visa-assistance",
    ctaText: "Learn More",
  },
];

export default async function ServicesHub() {
  let dbServices: any[] = [];
  try {
    dbServices = await prisma.service.findMany({
      orderBy: { name: "asc" },
    });
  } catch (e) {
    // Graceful fallback to static core services
  }

  // Merge so core services and any dynamic db services are listed
  const allServices = [...CORE_SERVICES];
  for (const s of dbServices) {
    if (!allServices.some((c) => c.slug === s.slug)) {
      allServices.push({
        id: s.id,
        slug: s.slug,
        name: s.name,
        description: s.description,
        icon: CheckCircle2,
        href: `/services/${s.slug}`,
        ctaText: s.ctaText || "Explore Details",
      });
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Hero Section */}
      <section className="bg-[#0b1329] text-white py-32 lg:py-44 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-[#0b1329]/80 to-transparent z-0" />
        
        {/* Floating decorative elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-indigo-400/30 mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-300" />
            <span className="text-xs sm:text-sm font-semibold text-indigo-200 uppercase tracking-wider">End-to-End Support</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-outfit mb-6 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Services</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Comprehensive guidance for your international education journey — from university selection and visa assistance to education loans, student housing, and TOEFL vouchers.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24 bg-slate-50 flex-grow relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-100">
              Complete Student Care
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-slate-900 mt-3 mb-2">
              How We Help You Succeed
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Select a service below to explore our offerings and speak with dedicated specialists.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {allServices.map((service) => {
              const IconComp = service.icon;
              return (
                <Card key={service.id} className="group hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 border border-slate-200/80 bg-white rounded-3xl flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  
                  <CardContent className="p-8 flex-1 flex flex-col">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      <IconComp className="w-6 h-6" />
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold font-outfit text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {service.name}
                    </h3>
                    
                    <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">
                      {service.description}
                    </p>
                    
                    <Link 
                      href={service.href}
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-transparent px-4 py-2 text-sm font-semibold text-slate-800 w-full mt-auto transition-all shadow-xs"
                    >
                      <span>{service.ctaText}</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="py-24 bg-[#080d1a] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800/80">
                  Free Consultation
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold font-outfit mt-4 mb-4">
                  Let&apos;s plan your future.
                </h2>
                <p className="text-slate-300 text-base mb-8 leading-relaxed">
                  Whether you need career counselling, university selection, education loans, accommodation, or visa assistance, our experts are here to help.
                </p>
                <div className="flex items-center space-x-3 text-indigo-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>100% Free Profile Assessment</span>
                </div>
              </div>
              
              <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-xl relative">
                <h3 className="text-2xl font-bold font-outfit mb-1">Get Free Counselling</h3>
                <p className="text-xs text-slate-500 mb-6">It just takes few minutes.</p>
                <QuickEnquiryForm sourcePage="Services Hub CTA" ctaText="Continue" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
