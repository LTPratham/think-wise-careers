import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { QuickEnquiryForm } from "@/components/forms/QuickEnquiryForm";

export default async function MBBSAbroadHub() {
  const countries = await prisma.mBBSCountry.findMany({
    where: { publishStatus: "PUBLISHED" },
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { universities: true },
      },
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-purple-950 text-white py-32 lg:py-48 relative overflow-hidden">
        <img src="/images/mbbs-hero.png" alt="Medical Students" className="absolute inset-0 w-full h-full object-cover opacity-60 animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-900/40 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-950/90 via-purple-950/40 to-transparent z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <ShieldCheck className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h1 className="text-5xl lg:text-7xl font-bold font-outfit mb-6">
            MBBS <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">Abroad</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90 leading-relaxed">
            Direct admission to NMC & WHO recognized medical universities globally.
          </p>
        </div>
      </div>

      {/* Destinations Grid & Form Split */}
      <section className="py-16 bg-slate-50 flex-grow">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12">
          
          {/* Main Grid */}
          <div className="w-full">
            <h2 className="text-3xl font-bold font-outfit text-slate-900 mb-8 text-center">Top MBBS Destinations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {countries.map((country, idx) => (
                <Card className="flex flex-col h-full hover:shadow-xl transition-all duration-300 group overflow-hidden border-0 glass-card" key={country.id}>
                  <div className="h-56 relative overflow-hidden bg-slate-200">
                    <img 
                      src={`/images/${country.slug}.png`}
                      alt={`MBBS in ${country.name}`} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10" />
                    <div className="absolute bottom-6 left-6 z-20">
                      <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-2xl flex items-center justify-center mb-3 border border-white/30 shadow-lg">
                        <ShieldCheck className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white font-outfit">MBBS in {country.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="space-y-3 mb-6 flex-1">
                      <div className="flex justify-between items-center text-sm border-b pb-3">
                        <span className="text-slate-500">Eligibility</span>
                        <span className="font-semibold text-slate-900">NEET Qualified</span>
                      </div>
                      <div className="flex justify-between items-center text-sm pt-1">
                        <span className="text-slate-500">Universities</span>
                        <span className="font-semibold text-slate-900">{country._count.universities}</span>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-slate-900 hover:bg-purple-600 text-white transition-colors group-hover:shadow-md">
                      <Link href={`/mbbs-abroad/${country.slug}`}>View Details <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              {countries.length === 0 && (
                <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-dashed border-slate-300">
                  <p>MBBS destinations are currently being updated. Please check back later.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="py-24 bg-purple-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
        <div className="absolute -right-40 -top-40 w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold font-outfit mb-6">Confused about MCI / NMC Rules?</h2>
                <p className="text-purple-200 text-lg mb-8 leading-relaxed">
                  Our medical admission experts have helped thousands of students secure seats in WHO-approved universities abroad.
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-bold">100% Genuine Guidance</h4>
                    <p className="text-sm text-purple-200">No hidden fees, fully transparent process.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 text-slate-900 shadow-xl relative">
                <h3 className="text-xl font-bold font-outfit mb-2">Book Expert Counselling</h3>
                <p className="text-sm text-slate-500 mb-6">Enter your details and our senior MBBS counselor will call you.</p>
                <QuickEnquiryForm sourcePage="MBBS Abroad Footer CTA" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
