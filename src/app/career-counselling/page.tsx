import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit, LineChart, FileText, CheckCircle2, Target, Users, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { QuickEnquiryForm } from "@/components/forms/QuickEnquiryForm";

export const metadata = {
  title: "Career Counselling & Psychometric Testing | Think Wise Careers",
  description: "Discover your true potential with our advanced psychometric testing and expert career counselling sessions.",
};

export default function CareerCounsellingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 mesh-bg overflow-hidden text-white">
        <div className="absolute inset-0 bg-indigo-950" />
        <img src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=2069&auto=format&fit=crop" alt="Counselling Session" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90" />
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/30 backdrop-blur-md px-4 py-2 rounded-full border border-indigo-400/30 mb-8 shadow-2xl">
            <BrainCircuit className="w-4 h-4 text-indigo-200" />
            <span className="text-sm font-semibold text-indigo-100">AI-Powered Psychometric Assessment</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold font-outfit mb-6 tracking-tight">
            Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">True Potential</span>
          </h1>
          <p className="text-xl text-indigo-100/90 leading-relaxed mx-auto max-w-2xl mb-8">
            Stop guessing your future. Use our scientific psychometric testing and expert 1-on-1 career counselling to identify the perfect course, university, and career path for you.
          </p>
          <Button size="lg" className="rounded-full bg-white text-indigo-900 hover:bg-slate-100 font-bold px-8 h-14 text-lg">
            <a href="#book-assessment">Book Your Assessment Now</a>
          </Button>
        </div>
      </section>

      {/* Why Psychometric Testing */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold font-outfit text-slate-900 mb-6">Why Psychometric Testing?</h2>
            <p className="text-lg text-slate-600">Our multidimensional career assessment evaluates you across multiple parameters to ensure 100% accurate career mapping.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BrainCircuit, title: "Aptitude & Intelligence", desc: "Measures numerical, verbal, spatial, and logical reasoning abilities to find your natural strengths." },
              { icon: HeartHandshake, title: "Personality Traits", desc: "Evaluates your core personality to see if you thrive in leadership, creative, or analytical roles." },
              { icon: Target, title: "Career Interests", desc: "Maps your passions to over 500+ modern career clusters, from AI Engineering to Medical Science." },
            ].map((feature, i) => (
              <Card key={i} className="border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-slate-50 hover:bg-indigo-50 transition-colors group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold font-outfit text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process & Reports */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl transform -rotate-3 scale-105 opacity-20 blur-xl" />
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Detailed Report" className="relative rounded-3xl shadow-2xl border border-white" />
            
            {/* Floating widget */}
            <div className="absolute -bottom-6 -right-6 glass-panel bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white max-w-xs animate-bounce" style={{animationDuration: '3s'}}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <LineChart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">30+ Pages</h4>
                  <p className="text-sm text-slate-500">Comprehensive Report</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h2 className="text-4xl font-bold font-outfit text-slate-900 mb-6">Our 3-Step Process</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                We combine AI-driven assessments with human expertise. Your results are analyzed by certified career counsellors who provide actionable advice.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { step: "01", title: "Take the Assessment", desc: "A 45-minute comprehensive online test evaluating your aptitude, personality, and interests." },
                { step: "02", title: "Get the 30-Page Report", desc: "Receive a deeply detailed analysis highlighting your top 5 career matches and required skills." },
                { step: "03", title: "Expert Counselling Session", desc: "A 1-on-1 session with our senior counsellors to interpret the report and map your study abroad journey." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="text-3xl font-bold font-outfit text-indigo-200">{item.step}</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Form / CTA */}
      <section id="book-assessment" className="py-24 bg-slate-900 text-white relative">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center max-w-5xl">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold font-outfit mb-6">Book Your Career Assessment</h2>
            <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
              Don't leave your career to chance. Register now for our premium psychometric testing and counselling package.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-indigo-400 mr-3 shrink-0" /> Avoid wrong course selection</li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-indigo-400 mr-3 shrink-0" /> Save time and tuition money</li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-indigo-400 mr-3 shrink-0" /> Get clarity on post-study work outcomes</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-[2rem] p-8 shadow-2xl text-slate-900 relative">
            <h3 className="text-2xl font-bold font-outfit mb-2">Register Now</h3>
            <p className="text-slate-500 text-sm mb-6">Our team will contact you to schedule your test.</p>
            <QuickEnquiryForm sourcePage="Career Counselling Page" />
          </div>
        </div>
      </section>
    </div>
  );
}
