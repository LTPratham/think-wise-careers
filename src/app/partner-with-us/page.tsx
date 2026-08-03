import { prisma } from "@/lib/prisma";
import { PartnerEnquiryForm } from "@/components/forms/PartnerEnquiryForm";
import { Handshake, Building, Landmark, Network } from "lucide-react";

export const metadata = {
  title: "Partner With Us | Think Wise Careers",
  description: "Collaborate with Think Wise Careers. We partner with schools, universities, and financial institutions to build global education pathways.",
};

export default async function PartnerWithUsPage() {
  const activePartners = await prisma.partner.findMany({
    where: { status: "ACTIVE" },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <Handshake className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl lg:text-6xl font-bold font-outfit mb-6">Partner With Us</h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Join our global network of educational and financial institutions. Together, we can build transparent, seamless pathways for students aiming for international education.
          </p>
        </div>
      </section>

      {/* Collaboration Models */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-outfit text-slate-900 mb-4">Collaboration Models</h2>
            <p className="text-slate-600">We work with diverse stakeholders in the education ecosystem.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-outfit mb-4">Schools & Colleges</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Empower your students with expert career counselling, psychometric testing, and university admission workshops directly on your campus.
              </p>
            </div>
            
            <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Network className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-outfit mb-4">Universities</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Appoint us as your authorized recruitment partner to access a pipeline of highly qualified, vetted Indian students seeking global degrees.
              </p>
            </div>
            
            <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Landmark className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-outfit mb-4">Financial Institutions</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Partner with us to offer competitive education loans, forex, and travel insurance solutions to our premium student base.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Existing Partners (Only renders if there are published partners) */}
      {activePartners.length > 0 && (
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold font-outfit text-slate-900 mb-8 text-center">Our Trusted Partners</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {activePartners.map(partner => (
                <div key={partner.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center shadow-sm">
                  {partner.logo ? (
                    <img src={partner.logo} alt={partner.name} className="h-12 object-contain mb-3" />
                  ) : (
                    <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-slate-400 font-bold text-lg">{partner.name.charAt(0)}</span>
                    </div>
                  )}
                  <span className="text-xs font-semibold text-slate-700">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enquiry Form Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-outfit mb-4">Become a Partner</h2>
            <p className="text-slate-300">Fill out the partnership inquiry form below and our institutional relations team will contact you within 24 hours.</p>
          </div>
          
          <div className="bg-white text-slate-900 rounded-3xl p-8 lg:p-12 shadow-2xl">
            <PartnerEnquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
