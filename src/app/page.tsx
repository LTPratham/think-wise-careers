import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QuickEnquiryForm } from "@/components/forms/QuickEnquiryForm";
import { ArrowRight } from "lucide-react";
import { BookAirplane3D } from "@/components/animations/BookAirplane3D";
import MorphingParticles from "@/components/3d/MorphingParticles";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32 mesh-bg min-h-screen flex items-center">
        <MorphingParticles className="absolute inset-0 z-0" />
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
          <BookAirplane3D />
        </div>

        {/* Subtle glowing orbs in the background */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 pointer-events-none">
          <div className="lg:col-span-7 space-y-8 relative pointer-events-auto">
            <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-indigo-100 shadow-sm">
              <span className="text-sm font-semibold text-indigo-900">#1 Trusted Education Consultancy</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold font-outfit tracking-tight leading-[1.1] text-slate-900">
              Your Gateway to <br/>
              <span className="text-gradient">Global Education</span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
              Premium consulting for Study Abroad and MBBS programs. We guide you to the world's best universities with complete transparency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="rounded-full text-lg px-8 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all border-0">
                <Link href="/study-abroad">Explore Destinations <ArrowRight className="w-5 h-5 ml-2" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-lg px-8 h-14 bg-white/50 backdrop-blur-md border-slate-200 hover:bg-white text-slate-900 hover:-translate-y-0.5 transition-all">
                <Link href="/contact">Talk to an Expert</Link>
              </Button>
            </div>
            
            <div className="pt-8 flex flex-wrap gap-6 text-sm text-slate-600 font-medium">
              <div className="flex items-center space-x-2 bg-white/60 px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                <span>NMC & WHO Recognized</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/60 px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                <span>15+ Countries</span>
              </div>
            </div>
          </div>

          {/* Floating Form */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0 pointer-events-auto">
            {/* Form */}
            <div className="glass-panel bg-white/80 rounded-[2rem] p-8 lg:p-10 relative z-10 border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transform lg:-translate-x-8 lg:translate-y-8 backdrop-blur-2xl">
              <div className="mb-8">
                <h3 className="text-2xl font-bold font-outfit text-slate-900 mb-2">Check Your Eligibility</h3>
                <p className="text-slate-500 text-sm">Get a free profile evaluation from our senior counsellors.</p>
              </div>
              <QuickEnquiryForm sourcePage="Home Hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators / Accreditations */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-semibold text-slate-400 tracking-widest uppercase mb-8">
            Recognized By Global Medical Councils & Authorities
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-slate-400 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold font-outfit text-slate-700">WHO</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold font-outfit text-slate-700">NMC Approved</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold font-outfit text-slate-700">ECFMG</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold font-outfit text-slate-700">WFME</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold font-outfit text-slate-700">FAIMER</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pathways */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold font-outfit mb-6 text-slate-900">Choose Your Pathway</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-20 text-lg leading-relaxed">
            Whether you're looking for world-class engineering programs or seeking guaranteed medical admissions abroad, we have the right pathway for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Study Abroad Card */}
            <div className="group rounded-[2rem] overflow-hidden glass-card text-left flex flex-col relative z-20">
              <div className="h-72 bg-indigo-900 relative overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop" alt="Global University Campus" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                 
                 <div className="absolute bottom-8 left-8 text-white z-10">
                   <div className="inline-flex items-center space-x-2 bg-indigo-500/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-indigo-400/50">
                     <span>Global Degrees</span>
                   </div>
                   <h3 className="text-4xl font-bold font-outfit">Study Abroad</h3>
                   <p className="text-indigo-100 mt-2 font-medium">UK, Canada, Australia, USA & more</p>
                 </div>
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <ul className="space-y-5 mb-10 flex-1">
                  <li className="flex items-start text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-4 shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                    </div>
                    <span className="font-medium text-slate-900">Top 500 Global Universities</span>
                  </li>
                  <li className="flex items-start text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-4 shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                    </div>
                    <span className="font-medium text-slate-900">Scholarship & Visa Assistance</span>
                  </li>
                  <li className="flex items-start text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-4 shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                    </div>
                    <span className="font-medium text-slate-900">Post-Study Work Permit Guidance</span>
                  </li>
                </ul>
                <Button asChild className="w-full h-14 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white transition-colors group-hover:shadow-lg group-hover:shadow-indigo-200 text-lg">
                  <Link href="/study-abroad">Explore Destinations <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" /></Link>
                </Button>
              </div>
            </div>

            {/* MBBS Abroad Card */}
            <div className="group rounded-[2rem] overflow-hidden glass-card text-left flex flex-col relative z-20">
              <div className="h-72 bg-purple-900 relative overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?q=80&w=2070&auto=format&fit=crop" alt="Medical Students" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                 
                 <div className="absolute bottom-8 left-8 text-white z-10">
                   <div className="inline-flex items-center space-x-2 bg-purple-500/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-purple-400/50">
                     <span>Direct Admission</span>
                   </div>
                   <h3 className="text-4xl font-bold font-outfit">MBBS Abroad</h3>
                   <p className="text-purple-100 mt-2 font-medium">Russia, Georgia, Kazakhstan & more</p>
                 </div>
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <ul className="space-y-5 mb-10 flex-1">
                  <li className="flex items-start text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-4 shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-purple-600 rounded-full" />
                    </div>
                    <span className="font-medium text-slate-900">NMC & WHO Recognized Universities</span>
                  </li>
                  <li className="flex items-start text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-4 shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-purple-600 rounded-full" />
                    </div>
                    <span className="font-medium text-slate-900">Direct Admission with Affordable Fees</span>
                  </li>
                  <li className="flex items-start text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-4 shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-purple-600 rounded-full" />
                    </div>
                    <span className="font-medium text-slate-900">FMGE/NEXT Coaching Support</span>
                  </li>
                </ul>
                <Button asChild className="w-full h-14 rounded-xl bg-slate-900 hover:bg-purple-600 text-white transition-colors group-hover:shadow-lg group-hover:shadow-purple-200 text-lg">
                  <Link href="/mbbs-abroad">View Medical Universities <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900" />
        <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" alt="University Campus" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/90 to-purple-950/80" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
        <MorphingParticles className="absolute inset-0 z-0" />
        
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10 text-white">
          <div className="mb-6">
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold font-outfit mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl opacity-90 mb-10 leading-relaxed text-indigo-100">
            Book a free, 1-on-1 career counselling session with our experts today. We'll map out your entire path from application to arrival.
          </p>
          <Button asChild size="lg" className="rounded-full text-lg px-10 h-14 font-semibold bg-white text-indigo-900 hover:bg-indigo-50 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] border-0">
            <Link href="/contact">Book Free Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
