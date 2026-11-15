import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Globe, 
  Building2, 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  Stethoscope, 
  Compass, 
  Home, 
  CreditCard, 
  CheckCircle2, 
  Sparkles,
  Plane,
  HeartHandshake,
  Quote,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickEnquiryForm } from "@/components/forms/QuickEnquiryForm";

export const metadata = {
  title: "About Us | Think Wise Careers",
  description: "Learn about Think Wise Careers — our story, global network, comprehensive services, and student-first commitment.",
};

const SERVICES_GRID = [
  {
    title: "Study Abroad",
    desc: "Guidance for undergraduate and postgraduate programs across top universities worldwide.",
    href: "/study-abroad",
    icon: GraduationCap,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Visa Assistance",
    desc: "Complete visa filing guidance, documentation review, and mock interview preparations.",
    href: "/services/visa-assistance",
    icon: ShieldCheck,
    color: "bg-sky-50 text-sky-600",
  },
  {
    title: "Career Counselling",
    desc: "Psychometric testing and personalised career guidance to help you choose the right path.",
    href: "/career-counselling",
    icon: Compass,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Student Accommodation",
    desc: "Safe, verified and student-friendly housing options near your university.",
    href: "/services/student-accommodation",
    icon: Home,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "TOEFL Vouchers",
    desc: "Official TOEFL vouchers with quick processing and complete guidance for your test preparation.",
    href: "/services/toefl-vouchers",
    icon: Sparkles,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Education Loan",
    desc: "Assistance with education loans through our network of trusted banking and financial partners.",
    href: "/services/education-loan",
    icon: CreditCard,
    color: "bg-amber-50 text-amber-600",
  },
];

const WHY_CHOOSE_US = [
  {
    title: "Expert Guidance",
    desc: "Personalised, one-on-one counselling for the right course, country and university.",
    icon: GraduationCap,
    color: "bg-blue-500",
  },
  {
    title: "End-to-End Support",
    desc: "From applications and visa to travel and post-arrival assistance.",
    icon: HeartHandshake,
    color: "bg-indigo-600",
  },
  {
    title: "Wide Global Network",
    desc: "Access to 600+ universities across 17+ countries worldwide.",
    icon: Globe,
    color: "bg-sky-500",
  },
  {
    title: "Comprehensive Services",
    desc: "Study Abroad, Career Counselling, Accommodation, TOEFL Vouchers, and Education Loans.",
    icon: Building2,
    color: "bg-amber-500",
  },
  {
    title: "Trusted & Transparent",
    desc: "Honest advice, clear processes and a strict student-first approach.",
    icon: ShieldCheck,
    color: "bg-emerald-600",
  },
  {
    title: "High Visa Success Rate",
    desc: "A strong track record of successful student visas across multiple countries.",
    icon: Plane,
    color: "bg-purple-600",
  },
];

const ADVISORY_BOARD = [
  {
    name: "Dr Peter Gough",
    designation: "Medical Doctor (UK) & Humanitarian Leader",
    highlightBadge: "43+ Years Medical & Philanthropic Service",
    image: "/change-images/advisory-board-peter-gough.jpeg",
    quickStats: [
      { val: "43 Years", label: "UK Medical Service" },
      { val: "3 Regions", label: "UK, India & Ethiopia" },
    ],
    tags: [
      "Medical Doctor (UK)",
      "Co-Founder, Khandel Light",
      "Trustee, Meseret for Women",
    ],
    bio: [
      "Peter, medical doctor in the UK for 43 years, has been involved with communities in Rajasthan, addressing the issues of forced migration, health, education, inequalities of gender, caste, religion, and lack of opportunities, particularly for girls and women, through the charity Khandel light, which he co-founded with some of his patients at the turn of the Millennium.",
      "Khandel light is a partnership with the NGO Nirman Sanstha Khandel, which recognises that we are all part of a global community in which we can empower each other by sharing our experiences, world views, responsibilities and skills.",
      "Peter is also a Trustee of Meseret for Women, a charity providing support for single mothers in Ethiopia who, because of their situation, have been shunned by their families and communities and are at risk of abandoning their children and being forced to migrate.",
    ],
  },
];

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* SECTION 1: HERO BANNER */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-white border-b border-slate-200/80">
        <div className="container mx-auto px-4">
          {/* Visual Hero Banner Container */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-gradient-to-r from-slate-50 via-white to-blue-50/30">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  ABOUT US
                </div>

                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-outfit text-slate-900 tracking-tight leading-[1.15]">
                    Guiding Dreams <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-indigo-700">
                      Beyond Borders.
                    </span>
                  </h1>
                  <p className="text-xl sm:text-2xl text-indigo-900 font-serif italic pt-1">
                    Because Your Future Matters.
                  </p>
                </div>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  At Think Wise Careers, we are more than an education consultancy. We are a team of mentors, guides and supporters, committed to helping students discover global opportunities and build a future that truly reflects their potential.
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <Button asChild size="lg" className="rounded-xl bg-gradient-to-r from-orange-600 to-indigo-600 hover:from-orange-700 hover:to-indigo-700 text-white font-semibold shadow-md">
                    <Link href="/contact">
                      Speak With a Counsellor <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5 h-72 sm:h-96 lg:h-full min-h-[380px] relative overflow-hidden">
                <img
                  src="/change-images/about-section-1-hero.jpeg"
                  alt="Think Wise Careers - Guiding Dreams Beyond Borders"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR STORY */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-slate-200 shadow-xl overflow-hidden bg-gradient-to-br from-white to-slate-50">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
                  OUR STORY
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-outfit text-slate-900 tracking-tight">
                  More Than Admissions. <br />
                  <span className="text-indigo-600">We Build Futures.</span>
                </h2>

                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    Think Wise Careers was founded with a simple belief &mdash; that every student deserves the right guidance, the right opportunities, and the confidence to build a future of their own choice.
                  </p>
                  <p>
                    We understand that studying abroad is not just about a university, but about a new environment, new experiences and a brighter tomorrow. That&apos;s why we are here &mdash; to guide, support and stand with our students and their families at every step of their journey.
                  </p>
                </div>

                {/* 3 Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">Student-Centric</h3>
                    <p className="text-xs text-slate-500 leading-snug">
                      Every journey is unique, and so is our guidance.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">Trust & Transparency</h3>
                    <p className="text-xs text-slate-500 leading-snug">
                      Honest advice and ethical support at every step.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">Long-Term Support</h3>
                    <p className="text-xs text-slate-500 leading-snug">
                      We stay connected beyond admissions, because your journey doesn&apos;t end here.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 h-72 sm:h-96 lg:h-full min-h-[420px] relative overflow-hidden">
                <img
                  src="/change-images/about-section-2-story.jpeg"
                  alt="Think Wise Careers Counselling Story"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR GLOBAL NETWORK / OUR REACH */}
      <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200/80">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-slate-200 shadow-xl overflow-hidden bg-white p-8 sm:p-12 lg:p-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
                OUR GLOBAL NETWORK
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-outfit text-slate-900 mt-4 mb-4 tracking-tight">
                A World of Opportunities <span className="text-blue-600">for Your Future.</span>
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                We connect students to top universities across the globe, with the right guidance, trusted partnerships, and complete support at every step of their journey.
              </p>
            </div>

            {/* Banner graphic image */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-md mb-12 border border-slate-100">
              <img
                src="/change-images/about-section-3-reach.jpeg"
                alt="Think Wise Careers Global Network and Reach"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-outfit text-slate-900">17+</div>
                <div className="text-sm font-semibold text-slate-800 mt-0.5">Countries</div>
                <p className="text-xs text-slate-500 mt-1">Global education destinations</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-outfit text-slate-900">600+</div>
                <div className="text-sm font-semibold text-slate-800 mt-0.5">Universities</div>
                <p className="text-xs text-slate-500 mt-1">Wide network of reputed institutions</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-outfit text-slate-900">360&deg;</div>
                <div className="text-sm font-semibold text-slate-800 mt-0.5">Student Support</div>
                <p className="text-xs text-slate-500 mt-1">From counselling to arrival</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-outfit text-slate-900">1:1</div>
                <div className="text-sm font-semibold text-slate-800 mt-0.5">Personalised Guidance</div>
                <p className="text-xs text-slate-500 mt-1">Tailored to your goals & interests</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR SERVICES */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200">
              OUR SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-outfit text-slate-900 mt-4 mb-2 tracking-tight">
              Complete Support for Every Step of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-indigo-600 to-purple-600">
                Your Global Journey.
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-4">
              From choosing the right course to settling in abroad, we offer a comprehensive range of services to make your international education journey simple, transparent and successful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {SERVICES_GRID.map((svc, idx) => {
              const IconComp = svc.icon;
              return (
                <Link
                  key={idx}
                  href={svc.href}
                  className="bg-slate-50/70 hover:bg-white p-7 rounded-3xl border border-slate-200 hover:border-indigo-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl ${svc.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold font-outfit text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {svc.desc}
                    </p>
                  </div>

                  <div className="pt-6 flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY CHOOSE THINK WISE CAREERS? */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-200">
              THE TWC ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-outfit text-slate-900 mt-4 mb-4 tracking-tight">
              Why Choose Think Wise Careers?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              More than just admissions &mdash; we&apos;re your long-term study abroad partner, committed to making your global education journey simpler, safer and successful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {WHY_CHOOSE_US.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col"
                >
                  <div className={`w-12 h-12 rounded-2xl ${item.color} text-white flex items-center justify-center mb-5 shadow-sm`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-outfit text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Bar Metrics */}
          <div className="bg-[#0b1329] text-white rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-xl flex flex-wrap items-center justify-around gap-6 text-center">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-indigo-400" />
              <div className="text-left">
                <div className="text-xl font-bold font-outfit">17+ Countries</div>
                <div className="text-xs text-slate-400">Global Destinations</div>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-px bg-slate-800" />

            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-indigo-400" />
              <div className="text-left">
                <div className="text-xl font-bold font-outfit">600+ Universities</div>
                <div className="text-xs text-slate-400">Top-Ranked Partners</div>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-px bg-slate-800" />

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <div className="text-left">
                <div className="text-xl font-bold font-outfit">360&deg; Student Support</div>
                <div className="text-xs text-slate-400">End-to-End Care</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: A MESSAGE FROM THE FOUNDER */}
      <section className="py-24 bg-white relative border-t border-slate-200/80">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-orange-50/20">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Founder Portrait Column */}
              <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-10 flex flex-col justify-between text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-950/60 px-3.5 py-1.5 rounded-full border border-orange-500/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    FOUNDER&apos;S PERSPECTIVE
                  </div>

                  <div className="relative mx-auto max-w-[280px] sm:max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-slate-700/60 shadow-2xl group">
                    <img
                      src="/change-images/about-section-6-founder.jpeg"
                      alt="Raj Verma - Founder, Think Wise Careers"
                      className="w-full h-full object-cover object-[center_60%] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-center sm:text-left">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-orange-400 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-xs border border-white/10">
                        Leadership &amp; Vision
                      </span>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <h3 className="text-2xl font-bold font-outfit text-white">Raj Verma</h3>
                    <p className="text-sm font-medium text-indigo-300">Founder, Think Wise Careers</p>
                  </div>
                </div>

                <div className="relative z-10 pt-6 border-t border-slate-800/80 mt-6 text-center">
                  <p className="text-xs text-slate-400 italic">
                    &ldquo;Let&apos;s think wisely. Let&apos;s build a better future.&rdquo;
                  </p>
                </div>
              </div>

              {/* Founder Letter Content */}
              <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200 mb-4">
                    A MESSAGE FROM THE FOUNDER
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                      <Quote className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-outfit text-slate-900 tracking-tight">
                        A Message from the Founder
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">
                        Raj Verma &bull; Founder, Think Wise Careers
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                    <p>
                      At <strong>Think Wise Careers</strong>, we believe that every student has the potential to achieve something extraordinary. Sometimes, all they need is the right direction, the right guidance, and someone who believes in their dreams.
                    </p>

                    <p>
                      My vision behind establishing Think Wise Careers was simple: to make career and education guidance more accessible, personalised, and meaningful. I believe that choosing a career or pursuing education abroad is not just about selecting a course or a university; it is about making decisions that shape an individual&apos;s future.
                    </p>

                    <p>
                      Through our career counselling and psychometric assessments, we aim to help students understand their strengths, interests, and potential. Through our international education services, we guide them towards opportunities that match their ambitions, while supporting them and their families at every step of the journey.
                    </p>

                    <p>
                      We understand that every student&apos;s journey is different. That&apos;s why we don&apos;t believe in one-size-fits-all solutions. We believe in listening first, understanding individual aspirations, and then creating the right pathway forward.
                    </p>

                    {/* Featured Callout Quote */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-50 to-indigo-50 border-l-4 border-orange-500 my-5 text-slate-900 font-medium text-sm sm:text-base italic shadow-xs">
                      &ldquo;At Think Wise Careers, we don&apos;t just help students choose their next destination; we help them discover their direction in life.&rdquo;
                    </div>

                    <p className="pt-1">
                      Thank you for trusting us to be a part of your journey.
                    </p>

                    <p className="font-semibold text-indigo-900 text-base">
                      Let&apos;s think wisely. Let&apos;s build a better future.
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200 mt-8 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold font-outfit text-slate-900">Raj Verma</div>
                    <div className="text-xs font-medium text-slate-500">Founder, Think Wise Careers</div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200">
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>Student-First Mission</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: OUR ADVISORY BOARD */}
      <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative border-t border-slate-200/80">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-200">
              OUR ADVISORY BOARD
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-outfit text-slate-900 mt-4 mb-4 tracking-tight">
              Distinguished Global Mentorship <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">
                &amp; Advisory Guidance
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Guided by esteemed international leaders and humanitarians who champion education, healthcare, and equal opportunities across the globe.
            </p>
          </div>

          <div className="space-y-8">
            {ADVISORY_BOARD.map((advisor, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Portrait Column */}
                  <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-8 sm:p-10 flex flex-col justify-between text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 space-y-6">
                      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-500/30">
                        <Award className="w-3.5 h-3.5" />
                        ADVISORY BOARD MEMBER
                      </div>

                      <div className="relative mx-auto max-w-[280px] sm:max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-slate-700/60 shadow-2xl group">
                        <img
                          src={advisor.image}
                          alt={advisor.name}
                          className="w-full h-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 text-center sm:text-left">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-300 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-xs border border-white/10">
                            {advisor.highlightBadge}
                          </span>
                        </div>
                      </div>

                      <div className="text-center pt-2">
                        <h3 className="text-2xl font-bold font-outfit text-white">{advisor.name}</h3>
                        <p className="text-sm font-medium text-indigo-300 mt-1">{advisor.designation}</p>
                      </div>
                    </div>

                    <div className="relative z-10 pt-6 border-t border-slate-800/80 mt-6 grid grid-cols-2 gap-3 text-center">
                      {advisor.quickStats.map((stat, sIdx) => (
                        <div key={sIdx} className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                          <div className="text-base font-bold text-white font-outfit">{stat.val}</div>
                          <div className="text-[11px] text-slate-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Biography Column */}
                  <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="flex flex-wrap items-center gap-2">
                        {advisor.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200"
                          >
                            <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                        {advisor.bio.map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>

                      {/* Global Impact Highlights */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-1">
                            <Globe className="w-4 h-4" />
                            <span>Global Humanitarian Reach</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-snug">
                            Co-founder of Khandel Light (UK &amp; Rajasthan) and Trustee of Meseret for Women (Ethiopia).
                          </p>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mb-1">
                            <Stethoscope className="w-4 h-4" />
                            <span>43 Years Medical Service</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-snug">
                            Decades of UK healthcare practice combined with community advocacy for health, education, and equality.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-slate-200 mt-8 flex flex-wrap items-center justify-between gap-4">
                      <p className="text-xs text-slate-500 italic">
                        Advisory guidance empowering students through global connection and ethical stewardship.
                      </p>
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                        <span>Think Wise Careers Advisory Board</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Free Counselling Section */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-slate-50/80 rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                  Ready to Begin?
                </span>
                <h3 className="text-3xl font-bold font-outfit text-slate-900">
                  Book Your Free 1-on-1 Consultation
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Our certified education advisers are ready to map out your university shortlist, scholarship opportunities, loan eligibility, and student housing.
                </p>
                <div className="space-y-2 text-xs font-medium text-slate-700 pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>No consultation fee, 100% transparent guidance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Instant phone & WhatsApp OTP verification</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="mb-4">
                  <h4 className="text-xl font-bold font-outfit text-slate-900">Get Free Counselling</h4>
                  <p className="text-xs text-slate-500">It just takes few minutes.</p>
                </div>
                <QuickEnquiryForm sourcePage="About Us Footer Form" ctaText="Continue" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
