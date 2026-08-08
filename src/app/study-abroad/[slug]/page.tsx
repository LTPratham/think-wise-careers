import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { QuickEnquiryForm } from "@/components/forms/QuickEnquiryForm";
import Link from "next/link";
import { CheckCircle2, ChevronRight, GraduationCap, MapPin } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const country = await prisma.country.findUnique({
    where: { slug: resolvedParams.slug },
    select: { name: true, overview: true },
  });
  if (!country) return { title: "Not Found" };
  return {
    title: `Study in ${country.name} | Think Wise Careers`,
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
          university: true
        }
      },
    },
  });

  if (!country) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4 flex items-center space-x-2 text-sm text-slate-500 font-medium">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/study-abroad" className="hover:text-indigo-600">Study Abroad</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900">{country.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold font-outfit mb-6">Study in {country.name}</h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              {country.overview}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full">
                <a href="#universities">View Universities</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full bg-transparent border-slate-700 text-white hover:bg-slate-800">
                <a href="#eligibility">Check Eligibility</a>
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            {/* Visual decoration */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl relative z-10">
              <h3 className="text-xl font-bold mb-6 font-outfit">Quick Facts</h3>
              <ul className="space-y-4">
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary mr-3 shrink-0" /> Post-Study Work Visa available</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary mr-3 shrink-0" /> Top Ranked Global Universities</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary mr-3 shrink-0" /> High standard of living & safety</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary mr-3 shrink-0" /> Multicultural environment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Content & Form Split */}
      <section className="py-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-16">
            
            {/* Eligibility, Courses & Cost */}
            <div id="eligibility" className="space-y-8">
              
              {/* Popular Courses */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                <h2 className="text-2xl font-bold font-outfit text-slate-900 mb-6 flex items-center">
                  <CheckCircle2 className="w-6 h-6 mr-3 text-indigo-600" />
                  Popular Courses
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600">
                  {(() => {
                    let parsedCourses: string[] = [];
                    try {
                      parsedCourses = typeof country.popularCourses === 'string'
                        ? JSON.parse(country.popularCourses)
                        : (country.popularCourses as string[] || []);
                    } catch (e) {
                      // ignore parse errors
                    }

                    return parsedCourses.length > 0 ? (
                      <ul className="grid sm:grid-cols-2 gap-4 list-none pl-0">
                        {parsedCourses.map((course: string, idx: number) => (
                          <li key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100 font-medium text-slate-700">{course}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>Information on popular courses is being updated. Consult our experts for tailored course recommendations.</p>
                    );
                  })()}
                </div>
              </div>

              {/* Cost & Scholarships */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold font-outfit text-slate-900 mb-6 border-b pb-4">Cost of Study</h2>
                  <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-600">
                    {(() => {
                      let parsedCost: Record<string, string> = {};
                      try {
                        parsedCost = typeof country.costBreakdown === 'string'
                          ? JSON.parse(country.costBreakdown)
                          : (country.costBreakdown as Record<string, string> || {});
                      } catch (e) {
                        // ignore parse errors
                      }

                      return Object.keys(parsedCost).length > 0 ? (
                         <ul className="space-y-3 list-none pl-0">
                           {Object.entries(parsedCost).map(([key, value]) => (
                              <li key={key} className="flex justify-between border-b border-dashed border-slate-200 pb-2">
                                <span className="font-medium text-slate-700">{key}</span>
                                <span className="text-indigo-600 font-bold">{value as string}</span>
                              </li>
                           ))}
                         </ul>
                      ) : (
                        <p>Tuition fees and living costs vary by university. Reach out for a customized budget estimate.</p>
                      );
                    })()}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 shadow-sm border border-indigo-100">
                  <h2 className="text-2xl font-bold font-outfit text-indigo-900 mb-4">Scholarships</h2>
                  <div className="prose prose-indigo max-w-none whitespace-pre-wrap text-indigo-800/80">
                    {country.scholarships || "Various government and university-specific scholarships are available. Ask our counsellors for eligibility."}
                  </div>
                </div>
              </div>

              {/* Visa & Career */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                <h2 className="text-2xl font-bold font-outfit text-slate-900 mb-4">Visa Overview & Post-Study Work</h2>
                <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-600 mb-8">
                  {country.visaOverview || "Information about student visas and post-study work rights."}
                </div>
                
                <h2 className="text-2xl font-bold font-outfit text-slate-900 mb-4 pt-6 border-t">Career Opportunities</h2>
                <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-600">
                  {country.careerOutcomes || "Discover the immense career opportunities waiting for you."}
                </div>
              </div>

            </div>

            {/* Universities List */}
            <div id="universities">
              <h2 className="text-2xl font-bold font-outfit text-slate-900 mb-6 flex items-center">
                <GraduationCap className="w-6 h-6 mr-3 text-primary" />
                Top Universities in {country.name}
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {country.universities.map(cu => (
                  <div key={cu.university.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/50 transition-colors shadow-sm flex items-start space-x-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                      <GraduationCap className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{cu.university.name}</h4>
                      <p className="text-sm text-slate-500 mt-1 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" /> {cu.university.countryName}
                      </p>
                    </div>
                  </div>
                ))}
                
                {country.universities.length === 0 && (
                  <div className="col-span-full py-8 text-center text-slate-500 bg-white rounded-2xl border border-dashed border-slate-300">
                    <p>University list is being updated. Please contact us for the complete list of partner institutions.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Sidebar Form */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <h3 className="text-xl font-bold font-outfit text-slate-900 mb-2">Apply for {country.name}</h3>
              <p className="text-sm text-slate-500 mb-6">Our senior counsellors will help you shortlist universities and fast-track your admission process.</p>
              <QuickEnquiryForm sourcePage={`Study in ${country.name}`} />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
