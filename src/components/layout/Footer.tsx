import Link from "next/link";
import Image from "next/image";
import MorphingParticles from "@/components/3d/MorphingParticles";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
      <MorphingParticles className="absolute inset-0 z-0" />
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <div className="bg-white px-4 py-3 rounded-xl inline-block shadow-md">
              <Image src="/tw-logo.png" alt="Think Wise Careers Logo" width={180} height={50} className="object-contain" />
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Premium international education consulting. We guide students to the world's best universities with transparency and expert support.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Study Destinations</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/study-abroad/uk" className="hover:text-white transition-colors">Study in UK</Link></li>
            <li><Link href="/study-abroad/canada" className="hover:text-white transition-colors">Study in Canada</Link></li>
            <li><Link href="/study-abroad/australia" className="hover:text-white transition-colors">Study in Australia</Link></li>
            <li><Link href="/mbbs-abroad/georgia" className="hover:text-white transition-colors">MBBS in Georgia</Link></li>
            <li><Link href="/mbbs-abroad/russia" className="hover:text-white transition-colors">MBBS in Russia</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Services</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/services/admissions" className="hover:text-white transition-colors">University Admissions</Link></li>
            <li><Link href="/services/career-counselling" className="hover:text-white transition-colors">Career Counselling</Link></li>
            <li><Link href="/services/visa-assistance" className="hover:text-white transition-colors">Visa Assistance</Link></li>
            <li><Link href="/services/scholarships" className="hover:text-white transition-colors">Scholarship Guidance</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start space-x-3">
              <span className="text-slate-500">📍</span>
              <span>
                2nd floor, Chopra Complex, I-51<br/>
                Narayan Sagar, Mansarovar<br/>
                Jaipur, Rajasthan (302026)
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-slate-500">📞</span>
              <a href="tel:+917300036507" className="hover:text-white transition-colors">+91 73000 36507</a>
            </li>
            <li className="flex items-start space-x-3 text-sm">
              <span className="text-slate-500 mt-1">✉️</span>
              <div className="flex flex-col space-y-1">
                <a href="mailto:counselling@thinkwisecareers.com" className="hover:text-white transition-colors">counselling@thinkwisecareers.com</a>
                <a href="mailto:admissions@thinkwisecareers.com" className="hover:text-white transition-colors">admissions@thinkwisecareers.com</a>
                <a href="mailto:partnerships@thinkwisecareers.com" className="hover:text-white transition-colors">partnerships@thinkwisecareers.com</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center relative z-10">
        <p>&copy; {new Date().getFullYear()} Think Wise Careers. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
