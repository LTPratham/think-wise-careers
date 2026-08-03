import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { QuickEnquiryForm } from "@/components/forms/QuickEnquiryForm";

export default async function ServicesHub() {
  const services = await prisma.service.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Hero Section */}
      <section className="bg-indigo-900 text-white py-32 lg:py-48 relative overflow-hidden">
        <img src="/images/campus-1.png" alt="University Services" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-900/60 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/80 to-transparent z-0" />
        
        {/* Floating decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl animate-pulse delay-1000" />
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/30 backdrop-blur-md px-4 py-2 rounded-full border border-indigo-400/30 mb-8 shadow-[0_0_20px_rgba(79,70,229,0.2)]">
            <Sparkles className="w-4 h-4 text-indigo-300" />
            <span className="text-sm font-semibold text-indigo-100">End-to-End Support</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold font-outfit mb-6 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Services</span>
          </h1>
          <p className="text-xl text-indigo-100/90 leading-relaxed max-w-2xl mx-auto">
            Comprehensive guidance for your international education journey. From initial university selection to visa processing and landing support.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 bg-slate-50 flex-grow relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row gap-12">
          
          <div className="w-full">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="mb-10 col-span-full">
              <h2 className="text-3xl font-bold font-outfit text-slate-900">How We Can Help You</h2>
              <p className="text-slate-500 mt-2">Select a service below to see how our experts can accelerate your career.</p>
            </div>
            
              {services.map((service) => (
                <Card key={service.id} className="group hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 border-0 glass-card flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  
                  <CardContent className="p-8 flex-1 flex flex-col">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                    </div>
                    
                    <h3 className="text-2xl font-bold font-outfit text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">{service.name}</h3>
                    
                    <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">
                      {service.description}
                    </p>
                    
                    <Button asChild variant="outline" className="w-full mt-auto group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all shadow-sm">
                      <Link href={`/services/${service.slug}`}>
                        {service.ctaText || "Explore Details"} <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              {services.length === 0 && (
                <div className="col-span-full py-16 text-center text-slate-500 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-slate-300">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-lg font-medium">New services are being updated.</p>
                  <p className="text-sm mt-1">Check back soon for our premium offerings.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="py-24 bg-indigo-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
        <div className="absolute -left-40 -bottom-40 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold font-outfit mb-6">Let's plan your future.</h2>
                <p className="text-indigo-200 text-lg mb-8 leading-relaxed">
                  Whether you need career counselling, university selection, or visa assistance, our experts are here to help.
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-indigo-300" />
                  </div>
                  <div>
                    <h4 className="font-bold">End-to-End Support</h4>
                    <p className="text-sm text-indigo-200">From application to arrival.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 text-slate-900 shadow-xl relative">
                <h3 className="text-xl font-bold font-outfit mb-2">Book a Free Session</h3>
                <p className="text-sm text-slate-500 mb-6">Talk to our experts today.</p>
                <QuickEnquiryForm sourcePage="Services Footer CTA" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
