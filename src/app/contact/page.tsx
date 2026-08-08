import { QuickEnquiryForm } from "@/components/forms/QuickEnquiryForm";
import { Mail, MapPin, Phone, Clock, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contact Us | Think Wise Careers",
  description: "Get in touch with Think Wise Careers for study abroad counselling, MBBS abroad guidance, and expert career advice.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 mesh-bg overflow-hidden text-white">
        <div className="absolute inset-0 bg-indigo-950" />
        <img src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop" alt="Contact Us" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90" />
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <h1 className="text-5xl lg:text-7xl font-bold font-outfit mb-6 tracking-tight">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Touch</span>
          </h1>
          <p className="text-xl text-indigo-100/90 leading-relaxed mx-auto max-w-2xl">
            Have questions about studying abroad? Our expert counsellors are here to help you navigate your journey. Reach out to us today.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Contact Details Grid */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {/* Office Address */}
              <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 sm:col-span-2 group hover:border-indigo-200 transition-colors">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-outfit text-slate-900 mb-3">Visit Our Office</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  123 Education Hub, Global Tech Park<br />
                  Sector 62, Noida, Uttar Pradesh 201301<br />
                  India
                </p>
                <a href="#" className="text-indigo-600 font-semibold text-sm hover:underline flex items-center">
                  Get Directions <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 group hover:border-indigo-200 transition-colors">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-outfit text-slate-900 mb-2">Call Us</h3>
                <p className="text-slate-500 text-sm mb-4">Mon-Sat from 10am to 7pm.</p>
                <p className="text-lg font-semibold text-slate-900">+91 73000 36507</p>
              </div>

              {/* WhatsApp */}
              <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 group hover:border-green-200 transition-colors">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-outfit text-slate-900 mb-2">WhatsApp</h3>
                <p className="text-slate-500 text-sm mb-4">Instant chat support available.</p>
                <p className="text-lg font-semibold text-slate-900">+91 73000 36507</p>
              </div>

              {/* Email */}
              <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 group hover:border-purple-200 transition-colors">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-outfit text-slate-900 mb-2">Email</h3>
                <p className="text-slate-500 text-sm mb-4">We'll respond within 24 hours.</p>
                <p className="text-lg font-semibold text-slate-900">counselling@thinkwisecareers.com</p>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 group hover:border-orange-200 transition-colors">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-outfit text-slate-900 mb-2">Working Hours</h3>
                <p className="text-slate-500 text-sm mb-4">Drop by our office.</p>
                <p className="text-lg font-semibold text-slate-900 text-sm">Mon-Sat: 10:00 AM - 7:00 PM</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-2xl border border-slate-200/50 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold font-outfit text-slate-900 mb-2">Send us a Message</h2>
                  <p className="text-slate-500 mb-8">Fill out the form below and our admissions team will get back to you promptly.</p>
                  <QuickEnquiryForm sourcePage="Contact Page" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="h-[500px] w-full bg-slate-200 mt-12 relative grayscale hover:grayscale-0 transition-all duration-1000">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112000!2d77.2000!3d28.6000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzAwLjAiTiA3N8KwMTInMDAuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          className="absolute inset-0"
        />
      </section>
    </div>
  );
}

// Needed for ChevronRight
import { ChevronRight } from "lucide-react";
