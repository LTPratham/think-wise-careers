import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { Toaster as SonnerToaster } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { PageLoader } from "@/components/ui/PageLoader";

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
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://thinkwisecareers.com"),
  title: "Think Wise Careers | Premium International Education Consulting",
  description: "Expert guidance for Study Abroad admissions, Education Loans, Student Accommodation, and TOEFL exam vouchers for top global universities.",
  applicationName: "Think Wise Careers",
  authors: [{ name: "Think Wise Careers" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Think Wise Careers | Premium International Education Consulting",
    description: "Expert guidance for Study Abroad admissions, Education Loans, Student Accommodation, and TOEFL exam vouchers for top global universities.",
    url: "https://thinkwisecareers.com",
    siteName: "Think Wise Careers",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Think Wise Careers - Your Journey, Our Guidance",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Think Wise Careers | Premium International Education Consulting",
    description: "Expert guidance for Study Abroad admissions, Education Loans, Student Accommodation, and TOEFL vouchers.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen flex flex-col bg-slate-50`}
      >
        <PageLoader />
        <Header />
        <main className="flex-grow relative z-10">
          {children}
        </main>
        <WhatsAppButton />
        <Footer />
        <Toaster />
        <SonnerToaster position="top-center" richColors />
      </body>
    </html>
  );
}
