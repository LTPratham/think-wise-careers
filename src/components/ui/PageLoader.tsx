'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Simulate initial load and start fade out
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => setIsLoading(false), 500); // match fade duration
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      <div className="animate-pulse flex flex-col items-center">
        <Image src="/tw-logo.png" alt="Think Wise Careers Logo" width={250} height={80} className="object-contain mb-8" priority />
        <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 animate-slide"></div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0); }
          100% { width: 100%; transform: translateX(100%); }
        }
        .animate-slide {
          animation: slide 1.5s infinite ease-in-out;
        }
      `}} />
    </div>
  );
}
