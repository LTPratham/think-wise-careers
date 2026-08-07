import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { format } from "date-fns";
import parse from "html-react-parser";
import { getPostBySlug } from "@/lib/blog";
import MorphingParticles from "@/components/3d/MorphingParticles";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug: resolvedParams.slug },
  });
  if (!post) return { title: "Not Found" };
  
  return {
    title: `${post.title} | Think Wise Careers Blog`,
    description: post.body.replace(/<[^>]+>/g, '').substring(0, 160),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug: resolvedParams.slug, publishStatus: "PUBLISHED" },
    include: { author: { select: { name: true } } },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Breadcrumb */}
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4 flex items-center space-x-2 text-sm text-slate-500 font-medium">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/blog" className="hover:text-indigo-600">Blog</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 truncate max-w-xs">{post.title}</span>
        </div>
      </div>

      <article className="container mx-auto px-4 max-w-4xl mt-12">
        <Button asChild variant="ghost" className="mb-8 -ml-4 text-slate-500 hover:text-indigo-600">
          <Link href="/blog">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>
        </Button>

        {/* Header */}
        <header className="mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-6">
            {post.category.replace("_", " ")}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit text-slate-900 mb-8 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between border-y border-slate-200 py-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-slate-600">
                <User className="w-5 h-5 mr-2 text-slate-400" />
                <span className="font-medium">{post.author.name}</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Calendar className="w-5 h-5 mr-2 text-slate-400" />
                <span>{post.publishedAt ? format(new Date(post.publishedAt), 'MMMM d, yyyy') : 'Unknown Date'}</span>
              </div>
            </div>
            
            {/* Social Share mock */}
            <div className="flex items-center space-x-3 text-slate-400">
              <button className="hover:text-indigo-600 transition-colors"><Share2 className="w-5 h-5" /></button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImageUrl && (
          <div className="rounded-3xl overflow-hidden shadow-xl mb-12 bg-slate-200 aspect-[21/9]">
            <img src={post.featuredImageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Article Body */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="prose prose-lg lg:prose-xl max-w-none prose-indigo">
            {parse(post.body)}
          </div>
        </div>

        {/* CTA Footer */}
        <div className="mt-16 bg-indigo-900 text-white rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
          <MorphingParticles className="absolute inset-0 z-0" />
          <div className="relative z-10">
            <h3 className="text-3xl font-bold font-outfit mb-4">Ready to start your journey?</h3>
            <p className="text-indigo-200 mb-8 max-w-xl mx-auto">
              Our experts are ready to help you navigate your international education. Book a free counselling session today.
            </p>
            <Button asChild size="lg" className="rounded-full bg-white text-indigo-900 hover:bg-slate-100 font-bold px-8">
              <Link href="/contact">Book Free Consultation</Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
