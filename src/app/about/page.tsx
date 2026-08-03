import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Users, Target, HeartHandshake, Sparkles } from "lucide-react";
import Link from "next/link";
import { QuickEnquiryForm } from "@/components/forms/QuickEnquiryForm";

export const metadata = {
  title: "About Us | Think Wise Careers",
  description: "Learn about Think Wise Careers, our mission, vision, and the expert team dedicated to guiding your international education journey.",
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 mesh-bg overflow-hidden text-white">
        <div className="absolute inset-0 bg-indigo-950" />
        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Team Collaboration" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90" />
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/30 backdrop-blur-md px-4 py-2 rounded-full border border-indigo-400/30 mb-8 shadow-2xl">
            <Sparkles className="w-4 h-4 text-indigo-200" />
            <span className="text-sm font-semibold text-indigo-100">Your Future, Our Priority</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold font-outfit mb-6 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Think Wise</span> Careers
          </h1>
          <p className="text-xl text-indigo-100/90 leading-relaxed mx-auto max-w-2xl">
            We are a premier educational consultancy dedicated to helping students achieve their dreams of studying abroad and building successful global careers.
          </p>
        </div>
      </section>

      {/* Story & Mission Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-100/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold font-outfit text-slate-900 mb-6">Our Story</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-4">
                  Think Wise Careers was founded with a singular vision: to bridge the gap between ambitious students and world-class educational institutions. We realized that the journey to studying abroad is often filled with complex paperwork, confusing requirements, and overwhelming choices.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Today, we stand as a beacon of trust, having guided hundreds of students to prestigious universities across the UK, Canada, Australia, the USA, and top medical colleges worldwide.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <Card className="border-0 shadow-xl shadow-indigo-900/5 glass-card bg-white/80">
                  <CardContent className="p-6">
                    <Target className="w-10 h-10 text-indigo-600 mb-4" />
                    <h3 className="text-xl font-bold font-outfit text-slate-900 mb-2">Our Mission</h3>
                    <p className="text-slate-600 text-sm">To provide transparent, personalized, and ethical counselling that empowers students to make informed career decisions.</p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-xl shadow-purple-900/5 glass-card bg-white/80">
                  <CardContent className="p-6">
                    <HeartHandshake className="w-10 h-10 text-purple-600 mb-4" />
                    <h3 className="text-xl font-bold font-outfit text-slate-900 mb-2">Our Vision</h3>
                    <p className="text-slate-600 text-sm">To be the most trusted global education partner, known for absolute integrity and student-first approaches.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl transform rotate-3 scale-105 opacity-20 blur-xl" />
              <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop" alt="Counselling Session" className="relative rounded-3xl shadow-2xl object-cover h-[600px] w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold font-outfit text-slate-900 mb-6">Why Think Wise Careers?</h2>
            <p className="text-lg text-slate-600">We don't just process applications; we architect careers. Here is why students and parents trust us.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Direct University Tie-ups", desc: "We represent over 500+ top universities globally, ensuring authentic and fast-tracked admission processing." },
              { title: "100% Transparency", desc: "No hidden fees, no false promises. We provide realistic assessments and clear timelines for your journey." },
              { title: "End-to-End Support", desc: "From psychometric testing to university shortlisting, visa stamping, and post-arrival support, we are with you." },
              { title: "Expert Counsellors", desc: "Our team consists of industry veterans and alumni from top global universities who know exactly what it takes." },
              { title: "High Visa Success Rate", desc: "Our rigorous documentation and interview preparation process has resulted in an industry-leading visa success rate." },
              { title: "Dedicated MBBS Division", desc: "Specialized experts focusing exclusively on NMC-approved medical universities with direct admissions." },
            ].map((feature, i) => (
              <div key={i} className="flex items-start space-x-4 p-6 rounded-2xl bg-slate-50 hover:bg-indigo-50 transition-colors border border-slate-100 hover:border-indigo-100">
                <CheckCircle2 className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold font-outfit text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" alt="Campus" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/95 to-purple-900/95" />
        
        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold font-outfit mb-6">Ready to Build Your Future?</h2>
            <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
              Book a free, 1-on-1 personalized counselling session with our experts today and discover the right path for your career.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full bg-white text-indigo-900 hover:bg-slate-100 font-bold px-8">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          
          <div className="glass-panel bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] shadow-2xl">
            <h3 className="text-2xl font-bold font-outfit mb-6">Request a Callback</h3>
            <QuickEnquiryForm sourcePage="About Us Footer" />
          </div>
        </div>
      </section>
    </div>
  );
}
