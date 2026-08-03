import Link from "next/link";
import Image from "next/image";
import { QuickEnquiryForm } from "@/components/forms/QuickEnquiryForm";
import { BookAirplane3D } from "@/components/animations/BookAirplane3D";
import { Sparkles } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden flex flex-col items-center justify-center font-outfit">
      {/* 3D Background - Full Screen */}
      <div className="absolute inset-0 z-0">
        <BookAirplane3D />
      </div>

      {/* Overlay gradient to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/80 z-10 pointer-events-none" />

      {/* Logo in top left */}
      <div className="absolute top-6 left-6 z-30 animate-in fade-in slide-in-from-top-4 duration-1000">
        <Image 
          src="/tw-logo.png" 
          alt="Think Wise Careers Logo" 
          width={180} 
          height={60} 
          className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform cursor-pointer"
        />
      </div>

      {/* Main Content Card - Glassmorphism */}
      <div className="relative z-20 w-full max-w-lg px-4 mt-12">
        <div className="glass-panel bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-[0_0_50px_rgba(79,70,229,0.15)] animate-in zoom-in-95 fade-in duration-1000 delay-300">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-200 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-indigo-500/30">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Something Amazing is Brewing</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Coming <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Soon</span>
            </h1>
            
            <p className="text-slate-300 text-lg">
              We are building the ultimate gateway to your global education. Drop your details below for early access and a free profile evaluation!
            </p>
          </div>

          {/* Enquiry Form */}
          <div className="bg-slate-950/40 rounded-2xl p-6 border border-white/5 dark">
            <QuickEnquiryForm sourcePage="Coming Soon Page" />
          </div>

        </div>
      </div>

      {/* Interactive prompt */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-slate-400/80 text-sm tracking-widest uppercase animate-pulse text-center">
        Try clicking the airplane above!
      </div>
    </div>
  );
}
