"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="w-full sticky top-0 z-50 glass-panel border-b-0">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/tw-logo.png" alt="Think Wise Careers Logo" width={160} height={50} className="object-contain" priority />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/study-abroad" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all">Study Abroad</Link>
          <Link href="/mbbs-abroad" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all">MBBS Abroad</Link>
          <Link href="/services" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all">Services</Link>
          <Link href="/about" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all">About Us</Link>
          <Link href="/blog" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all">Blog</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <a href="tel:+919999999999" className="hidden lg:block text-slate-600 font-medium hover:text-indigo-600 transition-colors">
            +91 99999 99999
          </a>
          <Button asChild className="rounded-full px-6 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all bg-gradient-to-r from-indigo-600 to-purple-600 border-0">
            <Link href="/contact">Book Free Counselling</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
