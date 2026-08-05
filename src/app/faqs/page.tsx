import { prisma } from "@/lib/prisma";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export default async function GlobalFaqsPage() {
  const faqs = await prisma.fAQ.findMany({
    where: { scope: "GLOBAL" }, // Fetch only global FAQs
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="min-h-screen bg-slate-50 py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <HelpCircle className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl lg:text-5xl font-bold font-outfit text-slate-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-lg text-slate-600">
            Find answers to common questions about studying abroad, admissions, and our services.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          {faqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left font-semibold text-slate-800 text-lg hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <p>FAQs are currently being updated. Please check back later or contact us directly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
