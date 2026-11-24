"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { 
  Home, 
  Globe2, 
  Compass, 
  PhoneCall, 
  ArrowRight, 
  Plane,
  AlertTriangle,
  Move3d,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Dynamically import the 3D Airplane animation with SSR disabled
const BookAirplane3D = dynamic(
  () => import("@/components/animations/BookAirplane3D").then((mod) => mod.BookAirplane3D),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-full border-3 border-indigo-200 border-t-indigo-600 animate-spin" />
        <span className="text-xs text-indigo-400 font-medium">Calibrating 3D Radar...</span>
      </div>
    ),
  }
);

const POPULAR_DESTINATIONS = [
  { name: "United Kingdom", slug: "united-kingdom", code: "UK" },
  { name: "United States", slug: "united-states", code: "USA" },
  { name: "Canada", slug: "canada", code: "CA" },
  { name: "Australia", slug: "australia", code: "AU" },
  { name: "Germany", slug: "germany", code: "DE" },
  { name: "Ireland", slug: "ireland", code: "IE" },
  { name: "Dubai (UAE)", slug: "dubai", code: "UAE" },
];

export default function NotFound() {
  return (
    <div className="relative min-h-[90vh] bg-gradient-to-b from-slate-50 via-white to-indigo-50/20 overflow-hidden flex items-center justify-center py-12 lg:py-16">
      {/* Subtle background ambient blur */}
      <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Error Details & Runways */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Flight Radar Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-semibold text-indigo-900 shadow-2xs">
              <span className="flex items-center text-indigo-600 font-bold">
                <Plane className="w-3.5 h-3.5 mr-1.5 rotate-45" />
                FLIGHT TWC-404
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center text-amber-600 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-500" />
                STATUS: OFF-RADAR DETOUR
              </span>
            </div>

            {/* Main Error Heading */}
            <div className="space-y-2">
              <div className="text-7xl sm:text-8xl lg:text-9xl font-black font-outfit tracking-tighter bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent select-none leading-none">
                404
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-outfit text-slate-900 leading-tight">
                Looks like this flight went off course!
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed pt-1">
                The destination page you are flying towards doesn&apos;t exist, was moved to a new gate, or never cleared for takeoff. Don&apos;t worry, we will help you navigate back on track.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/25 px-6">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Safe Runway
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 px-5">
                <Link href="/study-abroad">
                  <Globe2 className="w-4 h-4 mr-2 text-indigo-600" />
                  Explore Destinations
                </Link>
              </Button>

              <Button asChild size="lg" variant="ghost" className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50">
                <Link href="/contact">
                  <PhoneCall className="w-4 h-4 mr-2" />
                  Talk to Counsellor
                </Link>
              </Button>
            </div>

            {/* Popular Runways Shortcuts */}
            <div className="pt-4 border-t border-slate-200/80 space-y-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center">
                <Compass className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                Popular Destination Runways:
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_DESTINATIONS.map((dest) => (
                  <Link
                    key={dest.slug}
                    href={`/study-abroad/${dest.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-indigo-600 hover:text-white text-slate-700 border border-slate-200 hover:border-indigo-600 transition-all shadow-2xs group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:bg-white" />
                    <span>{dest.name}</span>
                    <ArrowRight className="w-3 h-3 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Prominent Interactive 3D Airplane & Globe Stage */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none h-[400px] sm:h-[460px] lg:h-[520px] rounded-3xl bg-gradient-to-br from-indigo-50/90 via-white/80 to-purple-50/70 border border-indigo-100 shadow-2xl shadow-indigo-950/10 overflow-hidden flex items-center justify-center group">
              
              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 text-2xs font-semibold text-slate-700 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Flight Radar Active
                </span>
              </div>

              {/* 3D Aeroplane Canvas */}
              <BookAirplane3D className="w-full h-full relative z-10 pointer-events-auto opacity-100" />

              {/* Interactive Drag Hint at Bottom */}
              <div className="absolute bottom-4 inset-x-0 z-20 flex justify-center pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-2xs font-medium text-slate-600 shadow-2xs">
                  <Move3d className="w-3 h-3 text-indigo-600" />
                  Click & drag to rotate 3D aeroplane
                </span>
              </div>

              {/* Ambient Glow behind the Canvas */}
              <div className="absolute inset-0 bg-radial from-indigo-400/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
