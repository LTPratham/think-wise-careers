import Link from "next/link";
import Image from "next/image";
import { 
  Globe, 
  Building2, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar,
  ArrowRight,
  GraduationCap,
  FileText,
  Compass,
  Plane,
  Home,
  CreditCard,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-[#080d1a] text-slate-300 relative overflow-hidden pt-16 border-t border-slate-800/80">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main 4-Column Section */}
      <div className="container mx-auto px-4 relative z-10 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Highlights (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <div className="bg-white/95 px-4 py-2.5 rounded-2xl shadow-lg inline-flex items-center">
                <Image 
                  src="/tw-logo.png" 
                  alt="Think Wise Careers Logo" 
                  width={180} 
                  height={50} 
                  className="object-contain h-10 w-auto" 
                />
              </div>
            </Link>

            <div>
              <p className="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-1">
                Study Abroad | Global Opportunities
              </p>
              <h3 className="text-2xl font-bold font-outfit text-white">
                Your <span className="text-indigo-400">Global Education</span> Partner
              </h3>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              We help students find the right universities, programs and global opportunities with complete transparency and expert support.
            </p>

            {/* 4 Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">17+</div>
                  <div className="text-[10px] text-slate-400">Countries</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">600+</div>
                  <div className="text-[10px] text-slate-400">Universities</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">100%</div>
                  <div className="text-[10px] text-slate-400">Transparent</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Expert</div>
                  <div className="text-[10px] text-slate-400">Guidance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Study Destinations (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-bold font-outfit text-white tracking-wide border-b border-indigo-500/40 pb-2 inline-block">
              Study Destinations
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/study-abroad/uk" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>🇬🇧</span> <span>Study in UK</span>
                </Link>
              </li>
              <li>
                <Link href="/study-abroad/canada" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>🇨🇦</span> <span>Study in Canada</span>
                </Link>
              </li>
              <li>
                <Link href="/study-abroad/australia" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>🇦🇺</span> <span>Study in Australia</span>
                </Link>
              </li>
              <li>
                <Link href="/study-abroad/usa" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>🇺🇸</span> <span>Study in USA</span>
                </Link>
              </li>
              <li>
                <Link href="/study-abroad/germany" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>🇩🇪</span> <span>Study in Germany</span>
                </Link>
              </li>
              <li>
                <Link href="/study-abroad/ireland" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>🇮🇪</span> <span>Study in Ireland</span>
                </Link>
              </li>
              <li>
                <Link href="/study-abroad/france" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>🇫🇷</span> <span>Study in France</span>
                </Link>
              </li>
              <li>
                <Link href="/study-abroad/singapore" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>🇸🇬</span> <span>Study in Singapore</span>
                </Link>
              </li>
              <li>
                <Link href="/study-abroad/malaysia" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>🇲🇾</span> <span>Study in Malaysia</span>
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <Link 
                href="/study-abroad" 
                className="inline-flex items-center text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors gap-1.5"
              >
                <span>+8 More Countries &bull; Explore All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Column 3: Our Services (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-base font-bold font-outfit text-white tracking-wide border-b border-indigo-500/40 pb-2 inline-block">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/services" className="hover:text-white transition-colors flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Admissions</span>
                </Link>
              </li>
              <li>
                <Link href="/career-counselling" className="hover:text-white transition-colors flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-slate-500" />
                  <span>Counselling</span>
                </Link>
              </li>
              <li>
                <Link href="/services/application-guidance" className="hover:text-white transition-colors flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Application</span>
                </Link>
              </li>
              <li>
                <Link href="/services/visa-assistance" className="hover:text-white transition-colors flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>Visa Assistance</span>
                </Link>
              </li>
              <li>
                <Link href="/services/education-loan" className="hover:text-indigo-400 font-medium text-slate-300 transition-colors flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                  <span>Education Loan</span>
                </Link>
              </li>
              <li>
                <Link href="/services/scholarships" className="hover:text-white transition-colors flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-slate-500" />
                  <span>Scholarships</span>
                </Link>
              </li>
              <li>
                <Link href="/services/student-accommodation" className="hover:text-indigo-400 font-medium text-slate-300 transition-colors flex items-center gap-2">
                  <Home className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Accommodation</span>
                </Link>
              </li>
              <li>
                <Link href="/services/pre-post-departure" className="hover:text-white transition-colors flex items-center gap-2">
                  <Plane className="w-3.5 h-3.5 text-slate-500" />
                  <span>Departure Support</span>
                </Link>
              </li>
              <li>
                <Link href="/services/toefl-vouchers" className="hover:text-indigo-400 font-medium text-slate-300 transition-colors flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                  <span>TOEFL Voucher</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect With Us (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-bold font-outfit text-white tracking-wide border-b border-indigo-500/40 pb-2 inline-block">
              Connect With Us
            </h4>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 text-xs">
              <div className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  1-50, Bharat Mata Circle, 200 Feet Road, Narayan Vihar, Jaipur (Raj.) &ndash; 302026
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+917300036507" className="hover:text-white font-medium">
                  +91 73000 36507
                </a>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:admissions@thinkwisecareers.com" className="hover:text-white">
                  admissions@thinkwisecareers.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mon &ndash; Sat: 10:00 AM &ndash; 7:00 PM</span>
              </div>

              <div className="pt-2">
                <Button asChild className="w-full h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-md">
                  <Link href="/contact" className="flex items-center justify-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Free Counselling</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skyline Graphic Banner */}
      <div className="relative w-full h-28 sm:h-36 overflow-hidden pointer-events-none opacity-40 mix-blend-screen">
        <img 
          src="/change-images/footer-skyline-banner.jpeg" 
          alt="International Skyline" 
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-transparent to-transparent" />
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="border-t border-slate-800/80 bg-[#050810] py-6 relative z-10 text-xs text-slate-500">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Think Wise Careers. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-slate-700">&bull;</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span className="text-slate-700">&bull;</span>
            <Link href="/faqs" className="hover:text-white transition-colors">FAQs</Link>
            <span className="text-slate-700">&bull;</span>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 mr-1">Follow Us</span>
            <a 
              href="https://www.instagram.com/thinkwisecareers" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-pink-400 hover:border-pink-500/50 transition-colors"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-blue-400 hover:border-blue-500/50 transition-colors"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
              </svg>
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="YouTube"
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-red-400 hover:border-red-500/50 transition-colors"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-blue-400 hover:border-blue-500/50 transition-colors"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
