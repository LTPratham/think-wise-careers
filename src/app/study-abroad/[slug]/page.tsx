import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { QuickEnquiryForm } from "@/components/forms/QuickEnquiryForm";
import Link from "next/link";
import { 
  CheckCircle2, 
  ChevronRight, 
  GraduationCap, 
  MapPin, 
  Globe, 
  DollarSign, 
  FileCheck2, 
  Briefcase, 
  PlaneTakeoff,
  Award,
  Building2,
  Clock,
  ShieldCheck
} from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const country = await prisma.country.findUnique({
    where: { slug: resolvedParams.slug },
    select: { name: true, overview: true },
  });
  if (!country) return { title: "Not Found" };
  return {
    title: `Study in ${country.name} | Top Universities, Costs, Visa & Scholarships | Think Wise Careers`,
    description: country.overview.substring(0, 160),
  };
}

export default async function StudyAbroadCountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const country = await prisma.country.findUnique({
    where: { slug: resolvedParams.slug, publishStatus: "PUBLISHED" },
    include: {
      universities: {
        include: {
          university: true,
        },
      },
    },
  });

  if (!country) {
    notFound();
  }

  // Parse Popular Courses
  let parsedCourses: string[] = [];
  try {
    parsedCourses = typeof country.popularCourses === "string"
      ? JSON.parse(country.popularCourses)
      : (country.popularCourses as string[] || []);
  } catch {
    parsedCourses = [];
  }

  // Parse Cost Breakdown Table Data
  let costData: Record<string, string> = {};
  try {
    if (typeof country.costBreakdown === "string") {
      costData = JSON.parse(country.costBreakdown);
    } else if (typeof country.costBreakdown === "object" && country.costBreakdown !== null) {
      costData = country.costBreakdown as Record<string, string>;
    }
  } catch {
    costData = {};
  }

  // Standard cost breakdown mapping
  const costLabels: Record<string, { title: string; note: string }> = {
    undergraduateTuition: { title: "Undergraduate Tuition (Bachelor's)", note: "Average estimated annual fee" },
    postgraduateTuition: { title: "Postgraduate Tuition (Master's / MBA)", note: "Average estimated course fee" },
    livingExpenses: { title: "Estimated Living Cost", note: "Includes housing, meals & local transport" },
    visaFees: { title: "Student Visa & Health Insurance", note: "Statutory government application fees" },
    workRights: { title: "Part-Time Work Permission", note: "Permitted work hours during semester" },
    postStudyWork: { title: "Post-Study Work Visa (PSW)", note: "Work permit duration after graduation" },
    tuition: { title: "Average Tuition Fees", note: "Annual estimated range" },
    living: { title: "Average Living Expenses", note: "Annual estimated range" },
  };

  const costRows = Object.entries(costData).filter(([_, value]) => Boolean(value && String(value).trim()));

  const bannerImage = country.imageUrl || `/images/${country.slug}.png`;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b py-3.5 sticky top-0 z-30 shadow-2xs">
        <div className="container mx-auto px-4 flex items-center space-x-2 text-xs md:text-sm text-slate-500 font-medium overflow-x-auto whitespace-nowrap scrollbar-none">
          <Link href="/" className="hover:text-indigo-600 shrink-0">Home</Link>
          <ChevronRight className="w-4 h-4 shrink-0 text-slate-400" />
          <Link href="/study-abroad" className="hover:text-indigo-600 shrink-0">Study Abroad</Link>
          <ChevronRight className="w-4 h-4 shrink-0 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate">{country.name}</span>
        </div>
      </div>

      {/* Hero Section with Country Image Backdrop */}
      <section className="bg-slate-950 text-white py-12 sm:py-16 lg:py-24 relative overflow-hidden">
        {/* Dynamic Background Image with Overlays */}
        <img
          src={bannerImage}
          alt={`Study in ${country.name}`}
          className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-xs scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />

        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-3 py-1 rounded-full text-xs font-semibold mb-4 sm:mb-6 backdrop-blur-xs">
              <Globe className="w-3.5 h-3.5" />
              <span>Global Destination Guide</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-outfit mb-4 sm:mb-6 tracking-tight">
              Study in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-200">{country.name}</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed mb-6 sm:mb-8 max-w-2xl">
              {country.overview}
            </p>

            <div className="flex flex-wrap gap-2.5 sm:gap-4">
              <Button asChild size="lg" className="rounded-full text-xs sm:text-sm px-5 sm:px-6 h-10 sm:h-12 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30">
                <a href="#universities">Universities ({country.universities.length})</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-xs sm:text-sm px-5 sm:px-6 h-10 sm:h-12 bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-xs">
                <a href="#cost-table">Cost & Fee Table</a>
              </Button>
              <Button asChild variant="ghost" size="lg" className="rounded-full text-xs sm:text-sm px-4 h-10 sm:h-12 text-slate-300 hover:text-white hover:bg-white/10">
                <a href="#eligibility">Criteria</a>
              </Button>
            </div>
          </div>
          
          {/* Hero Quick Highlights Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-8 rounded-3xl relative z-10 shadow-2xl">
              <h3 className="text-xl font-bold mb-6 font-outfit flex items-center">
                <Award className="w-5 h-5 mr-2.5 text-indigo-400" />
                Key Highlights & Advantages
              </h3>
              <ul className="space-y-4 text-sm text-slate-200">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 mr-3 shrink-0 mt-0.5" />
                  <span><strong>Post-Study Work:</strong> Generous work permit options for international graduates.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 mr-3 shrink-0 mt-0.5" />
                  <span><strong>Top-Ranked Institutions:</strong> Internationally accredited degrees recognised across the globe.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 mr-3 shrink-0 mt-0.5" />
                  <span><strong>Earn While You Learn:</strong> Flexible part-time work rights during study semesters.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 mr-3 shrink-0 mt-0.5" />
                  <span><strong>Scholarships:</strong> Merit and need-based financial awards available for qualified students.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Full Content & Tables */}
          <div className="lg:w-2/3 space-y-12">

            {/* Section A: Popular Courses */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-200">
              <h2 className="text-2xl font-bold font-outfit text-slate-900 mb-2 flex items-center">
                <GraduationCap className="w-6 h-6 mr-3 text-indigo-600" />
                Popular Courses & Streams in {country.name}
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Most applied academic programs and high-growth professional fields.
              </p>

              {parsedCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {parsedCourses.map((course, idx) => (
                    <div
                      key={idx}
                      className="flex items-center p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/40 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 mr-3 shrink-0" />
                      <span className="font-semibold text-slate-800 text-sm">{course}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic bg-slate-50 p-4 rounded-xl border">
                  Popular courses are currently being updated. Contact our counsellors for course shortlisting.
                </p>
              )}
            </div>

            {/* Section B: Comprehensive Cost Breakdown & Fees Table */}
            <div id="cost-table" className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-2xl font-bold font-outfit text-slate-900 flex items-center">
                    <DollarSign className="w-6 h-6 mr-3 text-emerald-600" />
                    Estimated Cost of Study & Living Table
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Transparent financial expectations for international students planning their budget.
                  </p>
                </div>
                <span className="self-start sm:self-auto text-2xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Estimated Financials
                </span>
              </div>

              {costRows.length > 0 ? (
                <div>
                  <div className="sm:hidden flex items-center justify-between text-2xs text-slate-400 mb-2 px-1">
                    <span>Swipe sideways to view full table</span>
                    <span>&rarr;</span>
                  </div>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 -mx-1 sm:mx-0">
                    <table className="min-w-[500px] w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-xs uppercase tracking-wider">
                        <tr>
                          <th className="px-4 sm:px-5 py-3 sm:py-4 w-1/3">Expense Category</th>
                          <th className="px-4 sm:px-5 py-3 sm:py-4 w-1/3">Estimated Amount</th>
                          <th className="px-4 sm:px-5 py-3 sm:py-4 w-1/3">Notes & Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {costRows.map(([key, value], idx) => {
                          const meta = costLabels[key] || {
                            title: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
                            note: "Estimated expense head",
                          };

                          return (
                            <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                              <td className="px-4 sm:px-5 py-3 sm:py-4">
                                <div className="font-semibold text-slate-900 text-xs sm:text-sm">{meta.title}</div>
                                <div className="text-2xs text-slate-400">{key}</div>
                              </td>
                              <td className="px-4 sm:px-5 py-3 sm:py-4 font-bold text-slate-900 font-mono text-xs sm:text-base">
                                {value}
                              </td>
                              <td className="px-4 sm:px-5 py-3 sm:py-4 text-xs text-slate-500">
                                {meta.note}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 rounded-2xl p-6 text-center border border-dashed border-slate-200">
                  <p className="text-sm text-slate-600 font-medium">
                    Detailed tuition fee schedule varies by university and degree program.
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Request a free counselling call for a tailored cost breakdown for {country.name}.
                  </p>
                </div>
              )}

              <p className="text-2xs text-slate-400 mt-4 leading-relaxed">
                * Note: Tuition fees, living costs, and government visa charges fluctuate based on currency exchange rates, city location, university tier, and personal lifestyle.
              </p>
            </div>

            {/* Section C: Eligibility & Admission Requirements */}
            <div id="eligibility" className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-200">
              <h2 className="text-2xl font-bold font-outfit text-slate-900 mb-2 flex items-center">
                <FileCheck2 className="w-6 h-6 mr-3 text-indigo-600" />
                Eligibility Criteria & Admission Requirements
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Standard academic benchmarks and language test requirements for entry into {country.name}.
              </p>

              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm">
                {country.eligibility || "Standard admission criteria requires a recognised 12th/High School diploma or relevant Bachelor's degree. Contact our counselling team for program-specific cutoffs."}
              </div>
            </div>

            {/* Section D: Scholarships & Financial Support */}
            <div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-white rounded-3xl p-6 md:p-8 shadow-xs border border-indigo-100">
              <h2 className="text-2xl font-bold font-outfit text-indigo-950 mb-2 flex items-center">
                <Award className="w-6 h-6 mr-3 text-indigo-600" />
                Scholarships & Financial Aid
              </h2>
              <p className="text-sm text-indigo-800/70 mb-6">
                Scholarships, government waivers, and university grants available to ease your education investment.
              </p>

              <div className="prose prose-indigo max-w-none text-indigo-900/90 leading-relaxed whitespace-pre-wrap text-sm bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-indigo-100 shadow-2xs">
                {country.scholarships || "Merit-based university scholarships, international student bursaries, and tuition fee reductions are available for eligible profiles. Our advisors assist with early scholarship applications."}
              </div>
            </div>

            {/* Section E: Visa Overview & Post-Study Work */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-200">
              <h2 className="text-2xl font-bold font-outfit text-slate-900 mb-2 flex items-center">
                <PlaneTakeoff className="w-6 h-6 mr-3 text-indigo-600" />
                Student Visa & Post-Study Work Rights
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Official visa guidelines, processing parameters, and post-graduation stay-back rules.
              </p>

              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm mb-8">
                {country.visaOverview || "International students must obtain a valid Student Visa prior to departure. Proof of sufficient financial funds, valid passport, and university offer letter are mandatory."}
              </div>

              {/* Career Opportunities */}
              <div className="pt-6 border-t border-slate-200">
                <h3 className="text-xl font-bold font-outfit text-slate-900 mb-2 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2.5 text-indigo-600" />
                  Career Outcomes & Employment Scope
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  Job market opportunities and international career prospects after graduation.
                </p>

                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm">
                  {country.careerOutcomes || "Graduates from accredited universities in this destination enjoy strong global employability, fast-track PR pathways, and attractive initial compensation packages in high-demand industries."}
                </div>
              </div>
            </div>

            {/* Section F: Top Partner Universities */}
            <div id="universities" className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-2xl font-bold font-outfit text-slate-900 flex items-center">
                    <Building2 className="w-6 h-6 mr-3 text-indigo-600" />
                    Top Partner Universities in {country.name}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    World-class institutions where Think Wise Careers assists students with admissions.
                  </p>
                </div>
                <span className="self-start sm:self-auto text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {country.universities.length} Universities
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {country.universities.map((cu) => (
                  <div
                    key={cu.university.id}
                    className="p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-start space-x-4 bg-white group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 p-1 group-hover:scale-105 transition-transform">
                      {cu.university.logoUrl ? (
                        <img
                          src={cu.university.logoUrl}
                          alt={cu.university.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Building2 className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors truncate">
                        {cu.university.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {cu.university.countryName}
                      </p>
                      {cu.university.description && (
                        <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                          {cu.university.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                
                {country.universities.length === 0 && (
                  <div className="col-span-full py-12 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <Building2 className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p className="font-medium text-slate-600">University catalogue is being updated</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Contact our admissions desk to receive the full list of accredited universities in {country.name}.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Quick Enquiry Form */}
          <div className="lg:w-1/3">
            <div className="sticky top-20 bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-2xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Free Consultation</span>
              </div>

              <h3 className="text-2xl font-bold font-outfit text-slate-900 mb-2">
                Apply for {country.name}
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Connect with our senior international admissions counsellor for shortlisting, eligibility verification, and visa assistance.
              </p>

              <QuickEnquiryForm sourcePage={`Study in ${country.name}`} />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
