import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { PageLoader } from "@/components/ui/PageLoader";
import MorphingParticles from "@/components/3d/MorphingParticles";

// Outfit for modern, premium headings
const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
});

// Inter for clean, readable body text
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Think Wise Careers | Premium International Education Consulting",
  description: "Expert guidance for Study Abroad and MBBS Abroad admissions in top global universities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen flex flex-col bg-slate-50`}
      >
        <PageLoader />
        <MorphingParticles />
        <Header />
        <main className="flex-grow relative z-10">
          {children}
        </main>
        <WhatsAppButton />
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
