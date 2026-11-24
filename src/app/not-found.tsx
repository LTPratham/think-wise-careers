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
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Dynamically import the 3D Airplane animation with SSR disabled for optimal WebGL performance
const BookAirplane3D = dynamic(
  () => import("@/components/animations/BookAirplane3D").then((mod) => mod.BookAirplane3D),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin opacity-40" />
      </div>
    ),
  }
);

const POPULAR_DESTINATIONS = [
  { name: "United Kingdom", slug: "united-kingdom", flag: "🇬🇧" },
  { name: "United States", slug: "united-states", flag: "🇺🇸" },
  { name: "Canada", slug: "canada", flag: "🇨🇦" },
  { name: "Australia", slug: "australia", flag: "🇦🇺" },
  { name: "Germany", slug: "germany", flag: "🇩🇪" },
  { name: "Ireland", slug: "ireland", flag: "🇮🇪" },
  { name: "Dubai (UAE)", slug: "dubai", flag: "🇦🇪" },
];

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] bg-gradient-to-b from-slate-50 via-indigo-50/30 to-slate-100/60 overflow-hidden flex items-center justify-center py-12 lg:py-20 font-sans">
      {/* 3D Airplane & Globe Background */}
      <div className="absolute inset-0 z-0 opacity-45 pointer-events-auto">
        <BookAirplane3D />
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-indigo-400/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-400/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glass Content Card */}
      <div className="container relative z-10 mx-auto px-4 max-w-4xl">
        <div className="bg-white/80 backdrop-blur-xl border border-white/80 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl shadow-indigo-950/10 text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
          
          {/* Flight Radar Status Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/90 border border-indigo-200/80 text-xs font-semibold text-indigo-900 shadow-2xs">
            <span className="flex items-center text-indigo-600 font-bold">
              <Plane className="w-3.5 h-3.5 mr-1 rotate-45" />
              FLIGHT TWC-404
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center text-amber-600 font-medium">
              <AlertCircle className="w-3.5 h-3.5 mr-1" />
              STATUS: RADAR SIGNAL LOST
            </span>
          </div>

          {/* Big Error Headline */}
          <div className="space-y-3">
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-black font-outfit tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-indigo-500 to-purple-600 drop-shadow-xs">
              404
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-outfit text-slate-900">
              Whoops! This Flight Took a Wrong Turn
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Looks like the destination page you are flying towards doesn&apos;t exist, was moved to a new departure gate, or never cleared for takeoff.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/25 px-6">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Home Runway
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 px-6">
              <Link href="/study-abroad">
                <Globe2 className="w-4 h-4 mr-2" />
                Explore Destinations
              </Link>
            </Button>

            <Button asChild size="lg" variant="ghost" className="text-slate-700 hover:bg-slate-100">
              <Link href="/contact">
                <PhoneCall className="w-4 h-4 mr-2 text-indigo-600" />
                Contact Counselling Team
              </Link>
            </Button>
          </div>

          {/* Popular Destination Runway Pills */}
          <div className="pt-6 border-t border-slate-200/70 space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-center">
              <Compass className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
              Popular Destinations to get you back on track:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {POPULAR_DESTINATIONS.map((dest) => (
                <Link
                  key={dest.slug}
                  href={`/study-abroad/${dest.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100/90 hover:bg-indigo-600 hover:text-white text-slate-700 border border-slate-200 hover:border-indigo-600 transition-all active:scale-95 shadow-2xs"
                >
                  <span>{dest.flag}</span>
                  <span>{dest.name}</span>
                  <ArrowRight className="w-3 h-3 opacity-60" />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
