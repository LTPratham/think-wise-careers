"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Phone, 
  MessageCircle, 
  Globe, 
  CreditCard, 
  Home, 
  Award, 
  Briefcase, 
  BookOpen, 
  Info, 
  ChevronRight,
  Sparkles
} from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="w-full sticky top-0 z-50 glass-panel border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="container mx-auto px-4 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/tw-logo.png"
            alt="Think Wise Careers Logo"
            className="h-9 sm:h-11 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm">
          <Link
            href="/study-abroad"
            className={`font-semibold transition-colors relative py-1 ${
              pathname.startsWith("/study-abroad")
                ? "text-indigo-600 after:w-full"
                : "text-slate-700 hover:text-indigo-600 after:w-0"
            } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-indigo-600 after:transition-all hover:after:w-full`}
          >
            Study Abroad
          </Link>
          <Link
            href="/services/education-loan"
            className={`font-semibold transition-colors relative py-1 ${
              pathname.includes("education-loan")
                ? "text-indigo-600 after:w-full"
                : "text-slate-700 hover:text-indigo-600 after:w-0"
            } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-indigo-600 after:transition-all hover:after:w-full`}
          >
            Education Loan
          </Link>
          <Link
            href="/services/student-accommodation"
            className={`font-semibold transition-colors relative py-1 ${
              pathname.includes("student-accommodation")
                ? "text-indigo-600 after:w-full"
                : "text-slate-700 hover:text-indigo-600 after:w-0"
            } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-indigo-600 after:transition-all hover:after:w-full`}
          >
            Accommodation
          </Link>
          <Link
            href="/services/toefl-vouchers"
            className={`font-semibold transition-colors relative py-1 ${
              pathname.includes("toefl-vouchers")
                ? "text-indigo-600 after:w-full"
                : "text-slate-700 hover:text-indigo-600 after:w-0"
            } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-indigo-600 after:transition-all hover:after:w-full`}
          >
            TOEFL Vouchers
          </Link>
          <Link
            href="/about"
            className={`font-semibold transition-colors relative py-1 ${
              pathname === "/about"
                ? "text-indigo-600 after:w-full"
                : "text-slate-700 hover:text-indigo-600 after:w-0"
            } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-indigo-600 after:transition-all hover:after:w-full`}
          >
            About Us
          </Link>
          <Link
            href="/blog"
            className={`font-semibold transition-colors relative py-1 ${
              pathname.startsWith("/blog")
                ? "text-indigo-600 after:w-full"
                : "text-slate-700 hover:text-indigo-600 after:w-0"
            } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-indigo-600 after:transition-all hover:after:w-full`}
          >
            Blog
          </Link>
        </nav>

        {/* Desktop CTA & Phone */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href="tel:+917300036507"
            className="text-slate-700 font-semibold hover:text-indigo-600 transition-colors flex items-center text-sm"
          >
            <Phone className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
            +91 73000 36507
          </a>
          <Button
            asChild
            className="rounded-full px-5 py-2 text-xs sm:text-sm font-semibold shadow-md shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all bg-gradient-to-r from-indigo-600 to-purple-600 border-0"
          >
            <Link href="/contact">Book Free Counselling</Link>
          </Button>
        </div>

        {/* Mobile Hamburger & Quick CTA */}
        <div className="flex lg:hidden items-center space-x-2">
          <a
            href="tel:+917300036507"
            aria-label="Call Advisor"
            className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors"
          >
            <Phone className="w-4 h-4" />
          </a>

          <Button
            asChild
            size="sm"
            className="rounded-full px-3 h-9 text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 border-0 shadow-xs"
          >
            <Link href="/contact">Counselling</Link>
          </Button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition-colors focus:outline-hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] sm:top-20 z-50 bg-slate-950/60 backdrop-blur-xs lg:hidden animate-in fade-in duration-200">
          <div className="bg-white w-full max-h-[calc(100vh-72px)] overflow-y-auto border-b border-slate-200 shadow-2xl p-5 flex flex-col justify-between space-y-6">
            
            {/* Navigation Category Links */}
            <div className="space-y-1">
              <div className="text-2xs uppercase tracking-wider font-bold text-slate-400 px-3 py-1">
                Explore Pathways
              </div>

              <Link
                href="/study-abroad"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50/70 text-slate-800 hover:text-indigo-700 font-semibold text-sm transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span>Study Abroad Destinations</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/services/education-loan"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50/70 text-slate-800 hover:text-indigo-700 font-semibold text-sm transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span>Education Loan Support</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/services/student-accommodation"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50/70 text-slate-800 hover:text-indigo-700 font-semibold text-sm transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Home className="w-4 h-4" />
                  </div>
                  <span>Student Accommodation</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/services/toefl-vouchers"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50/70 text-slate-800 hover:text-indigo-700 font-semibold text-sm transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <span>TOEFL Exam Vouchers</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <div className="pt-2 text-2xs uppercase tracking-wider font-bold text-slate-400 px-3 py-1">
                Company & Insights
              </div>

              <Link
                href="/services"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50/70 text-slate-800 hover:text-indigo-700 font-semibold text-sm transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <span>All Student Services</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/about"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50/70 text-slate-800 hover:text-indigo-700 font-semibold text-sm transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                    <Info className="w-4 h-4" />
                  </div>
                  <span>About Think Wise Careers</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/blog"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50/70 text-slate-800 hover:text-indigo-700 font-semibold text-sm transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span>Study Abroad Blog</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Quick Action Buttons & Phone */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <Button
                asChild
                className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold shadow-md shadow-indigo-300 text-sm"
              >
                <Link href="/contact">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Book Free 1-on-1 Counselling
                </Link>
              </Button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="tel:+917300036507"
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Call Advisor</span>
                </a>

                <a
                  href="https://wa.me/917300036507?text=Hi%2C%20I%20am%20interested%20in%20study%20abroad%20counselling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs border border-emerald-200 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <p className="text-[11px] text-slate-400 text-center pt-2">
                Office: Narayan Vihar, Jaipur (Raj.) • Mon-Sat 10 AM - 7 PM
              </p>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
