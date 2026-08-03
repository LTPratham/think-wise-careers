'use client';

import { GraduationCap, Plane, Globe2, BookOpen, Award } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FloatingBackgroundCards() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px) rotate(var(--tw-rotate)); }
          50% { transform: translateY(-20px) rotate(var(--tw-rotate)); }
          100% { transform: translateY(0px) rotate(var(--tw-rotate)); }
        }
        .animate-float-1 { animation: float 6s ease-in-out infinite; }
        .animate-float-2 { animation: float 8s ease-in-out infinite; animation-delay: 1s; }
        .animate-float-3 { animation: float 7s ease-in-out infinite; animation-delay: 2s; }
        .animate-float-4 { animation: float 9s ease-in-out infinite; animation-delay: 0.5s; }
        .animate-float-5 { animation: float 5s ease-in-out infinite; animation-delay: 1.5s; }
      `}} />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Card 1 */}
        <div className="absolute top-[15%] left-[5%] lg:left-[35%] w-64 p-6 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.05)] animate-float-1 transform -rotate-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-500/20 rounded-2xl">
              <GraduationCap className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-indigo-900/60 font-medium">Top Universities</p>
              <p className="text-lg font-bold text-indigo-950">500+ Partners</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="absolute top-[60%] left-[10%] lg:left-[5%] w-72 p-6 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.05)] animate-float-2 transform rotate-3">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-500/20 rounded-2xl">
              <Globe2 className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-purple-900/60 font-medium">Global Reach</p>
              <p className="text-lg font-bold text-purple-950">15+ Countries</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="absolute top-[20%] right-[5%] lg:right-[15%] w-60 p-6 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.05)] animate-float-3 transform rotate-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-2xl">
              <Plane className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-900/60 font-medium">Study Abroad</p>
              <p className="text-lg font-bold text-blue-950">100% Visa Success</p>
            </div>
          </div>
        </div>

        {/* Additional Decorative Elements */}
        <div className="absolute top-[75%] right-[20%] p-4 bg-white/30 backdrop-blur-md rounded-full border border-white/50 shadow-xl animate-float-4 transform -rotate-12">
          <Award className="w-6 h-6 text-pink-600" />
        </div>
        
        <div className="absolute top-[40%] left-[20%] p-4 bg-white/30 backdrop-blur-md rounded-full border border-white/50 shadow-xl animate-float-5 transform rotate-12">
          <BookOpen className="w-6 h-6 text-emerald-600" />
        </div>
      </div>
    </>
  );
}
