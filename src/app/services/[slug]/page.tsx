import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { QuickEnquiryForm } from "@/components/forms/QuickEnquiryForm";
import Link from "next/link";
import { ChevronRight, CheckCircle2 } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = await prisma.service.findUnique({
    where: { slug: resolvedParams.slug },
    select: { name: true, description: true },
  });
  if (!service) return { title: "Not Found" };
  return {
    title: `${service.name} | Think Wise Careers`,
    description: service.description.substring(0, 160),
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = await prisma.service.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      faqs: true,
    },
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4 flex items-center space-x-2 text-sm text-slate-500 font-medium">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/services" className="hover:text-primary">Services</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900">{service.name}</span>
        </div>
      </div>

      <section className="bg-slate-900 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl lg:text-6xl font-bold font-outfit mb-6">{service.name}</h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {service.description}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12">
          
          <div className="lg:w-2/3 space-y-12">
            
            {/* Process */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold font-outfit text-slate-900 mb-6">How It Works</h2>
              <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-600">
                {service.process || "Contact us to learn more about our step-by-step process for this service."}
              </div>
            </div>

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold font-outfit text-slate-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {service.faqs.map(faq => (
                    <div key={faq.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-2 flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5 shrink-0" />
                        {faq.question}
                      </h4>
                      <p className="text-slate-600 pl-8">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-24 bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <h3 className="text-xl font-bold font-outfit text-slate-900 mb-2">{service.ctaText || "Get Started"}</h3>
              <p className="text-sm text-slate-500 mb-6">Fill out the form below and our experts will guide you through the process.</p>
              <QuickEnquiryForm sourcePage={`Service: ${service.name}`} />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
