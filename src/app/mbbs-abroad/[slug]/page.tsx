import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { QuickEnquiryForm } from "@/components/forms/QuickEnquiryForm";
import Link from "next/link";
import { CheckCircle2, ChevronRight, GraduationCap, MapPin, AlertTriangle, Building2, Wallet } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const country = await prisma.mBBSCountry.findUnique({
    where: { slug: resolvedParams.slug },
    select: { name: true, admissionProcess: true },
  });
  if (!country) return { title: "Not Found" };
  return {
    title: `Study MBBS in ${country.name} | Think Wise Careers`,
    description: country.admissionProcess?.substring(0, 160) || `Learn about MBBS admissions, fees, and NMC approved universities in ${country.name}.`,
  };
}

export default async function MBBSCountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const country = await prisma.mBBSCountry.findUnique({
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
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/mbbs-abroad" className="hover:text-primary">MBBS Abroad</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900">{country.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 bg-red-500/20 text-red-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <ShieldAlert className="w-4 h-4" />
              <span>NMC & WHO Recognized</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold font-outfit mb-6">MBBS in {country.name}</h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Study medicine at top government and private universities in {country.name}.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full">
                <a href="#universities">View Universities</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full bg-transparent border-slate-700 text-white hover:bg-slate-800">
                <a href="#fees">Fee Structure</a>
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl relative z-10">
              <h3 className="text-xl font-bold mb-6 font-outfit">Why {country.name}?</h3>
              <ul className="space-y-4">
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-green-400 mr-3 shrink-0" /> English Medium Curriculum</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-green-400 mr-3 shrink-0" /> Low Tuition Fees & Living Cost</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-green-400 mr-3 shrink-0" /> Direct Admission (No Entrance Exam)</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-green-400 mr-3 shrink-0" /> FMGE / NEXT Coaching Available</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Regulatory Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 py-4">
        <div className="container mx-auto px-4 flex items-start space-x-3 text-amber-900 text-sm">
          <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
          <p>
            <strong>Regulatory Disclaimer:</strong> Medical council recognition status is subject to NMC/FMGE regulations at the time of admission. 
            Students must verify current NMC guidelines and ensure they meet all NEET qualification criteria before applying. 
            {country.recognitionDisclaimer && ` ${country.recognitionDisclaimer}`}
          </p>
        </div>
      </div>

      {/* Content & Form Split */}
      <section className="py-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-12">
            
            {/* Fees & Eligibility Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div id="fees" className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Wallet className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-outfit text-slate-900 mb-4 border-b pb-2">Cost Overview</h3>
                <div className="text-slate-600 text-sm whitespace-pre-wrap">
                  {country.feeStructure && Object.keys(JSON.parse(country.feeStructure as string)).length > 0 ? (
                       <ul className="space-y-3 list-none pl-0">
                         {Object.entries(JSON.parse(country.feeStructure as string)).map(([key, value]) => (
                            <li key={key} className="flex justify-between border-b border-dashed border-slate-200 pb-2">
                              <span className="font-medium text-slate-700">{key}</span>
                              <span className="text-green-600 font-bold">{value as string}</span>
                            </li>
                         ))}
                       </ul>
                  ) : (
                    <p>Contact us for a detailed breakdown of tuition and hostel fees.</p>
                  )}
                </div>
              </div>
              
              <div id="eligibility" className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-outfit text-slate-900 mb-2">Eligibility</h3>
                <div className="text-slate-600 text-sm whitespace-pre-wrap">
                  {country.eligibilityNeet || "NEET Qualification is mandatory. 50% marks in PCB in 12th Standard for General Category (40% for Reserved Categories)."}
                </div>
              </div>
            </div>

            {/* Admission Process */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold font-outfit text-slate-900 mb-6">Admission Process</h2>
              <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-600 mb-8">
                {country.admissionProcess || "Our team handles the entire process from university selection, application, document apostille, visa stamping, to travel arrangements."}
              </div>
              
              <h2 className="text-2xl font-bold font-outfit text-slate-900 mb-6 border-t pt-8">Hostel & Living Info</h2>
              <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-600 mb-8">
                {country.hostelInfo || "Detailed information regarding hostels and Indian mess facilities available on request."}
              </div>
              
              {country.careerScope && (
                <>
                  <h3 className="text-xl font-bold font-outfit text-slate-900 mt-8 mb-4">Career Opportunities</h3>
                  <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-600">
                    {country.careerScope}
                  </div>
                </>
              )}
            </div>

            {/* Universities List */}
            <div id="universities">
              <h2 className="text-2xl font-bold font-outfit text-slate-900 mb-6 flex items-center">
                <Building2 className="w-6 h-6 mr-3 text-primary" />
                NMC Approved Universities in {country.name}
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {country.universities.map(cu => (
                  <div key={cu.university.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/50 transition-colors shadow-sm flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">{cu.university.name}</h4>
                      <div className="flex items-center text-xs text-slate-500 mb-4">
                        <MapPin className="w-3 h-3 mr-1" /> {cu.university.countryName}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Get Fee Structure
                    </Button>
                  </div>
                ))}
                
                {country.universities.length === 0 && (
                  <div className="col-span-full py-8 text-center text-slate-500 bg-white rounded-2xl border border-dashed border-slate-300">
                    <p>University list is being updated. Please contact us for the complete list of approved institutions.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Sidebar Form */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <h3 className="text-xl font-bold font-outfit text-slate-900 mb-2">Apply for MBBS in {country.name}</h3>
              <p className="text-sm text-slate-500 mb-6">Get a free profile evaluation and fee structure breakdown from our medical admission experts.</p>
              <QuickEnquiryForm sourcePage={`MBBS in ${country.name}`} />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

// Ensure the icon is imported for the hero section
import { ShieldAlert } from "lucide-react";
