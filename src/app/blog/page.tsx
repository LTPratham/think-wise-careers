import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Search, BookOpen } from "lucide-react";
import { format } from "date-fns";

export const metadata = {
  title: "Blog & Insights | Think Wise Careers",
  description: "Read the latest news, guides, and tips on studying abroad, MBBS admissions, visas, and career planning.",
};

export default async function BlogHubPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams.category;

  // Build Prisma filter
  const whereFilter: any = { publishStatus: "PUBLISHED" };
  if (currentCategory) {
    whereFilter.category = currentCategory;
  }

  const posts = await prisma.blogPost.findMany({
    where: whereFilter,
    include: { author: { select: { name: true } } },
    orderBy: { publishedAt: "desc" },
  });

  const categories = [
    { label: "All", value: "" },
    { label: "Study Abroad", value: "STUDY_ABROAD" },
    { label: "MBBS Abroad", value: "MBBS_ABROAD" },
    { label: "Visa", value: "VISA" },
    { label: "Career", value: "CAREER" },
    { label: "Scholarships", value: "SCHOLARSHIPS" },
    { label: "Country Guides", value: "COUNTRY_GUIDES" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-indigo-900 text-white py-24 relative overflow-hidden mesh-bg">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h1 className="text-5xl lg:text-6xl font-bold font-outfit mb-6">Expert Insights</h1>
          <p className="text-xl text-indigo-100/90 leading-relaxed">
            Your ultimate guide to international education, scholarships, and career success.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 flex-grow">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12">
          
          {/* Blog Feed */}
          <div className="lg:w-3/4">
            
            {/* Category Filter on Mobile (Sidebar on Desktop) */}
            <div className="lg:hidden mb-8 overflow-x-auto pb-4 flex space-x-2">
              {categories.map((cat) => (
                <Link key={cat.label} href={cat.value ? `/blog?category=${cat.value}` : `/blog`}>
                  <div className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    (currentCategory === cat.value) || (!currentCategory && cat.value === "")
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                  }`}>
                    {cat.label}
                  </div>
                </Link>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="group overflow-hidden border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 glass-card flex flex-col">
                  {post.featuredImageUrl ? (
                    <div className="h-48 overflow-hidden relative">
                      <img src={post.featuredImageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-600">
                        {post.category.replace("_", " ")}
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 relative overflow-hidden group-hover:scale-105 transition-transform duration-700 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-indigo-300" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-600">
                        {post.category.replace("_", " ")}
                      </div>
                    </div>
                  )}
                  
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold font-outfit text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-1">
                      {post.body.replace(/<[^>]+>/g, '').substring(0, 150)}...
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500 mt-auto pt-4 border-t border-slate-100">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" /> {post.author.name}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" /> {post.publishedAt ? format(new Date(post.publishedAt), 'MMM d, yyyy') : 'Draft'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {posts.length === 0 && (
                <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                  <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">No Articles Found</h3>
                  <p className="text-slate-500">We're busy writing great content for this category. Check back soon!</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="sticky top-24 space-y-8">
              
              {/* Categories */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold font-outfit text-slate-900 mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((cat) => {
                    const isActive = (currentCategory === cat.value) || (!currentCategory && cat.value === "");
                    return (
                      <li key={cat.label}>
                        <Link href={cat.value ? `/blog?category=${cat.value}` : `/blog`}>
                          <div className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}>
                            {cat.label}
                            {isActive && <ChevronRight className="w-4 h-4" />}
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Newsletter CTA */}
              <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold font-outfit mb-2">Never miss an update</h3>
                <p className="text-indigo-200 text-sm mb-6">Get the latest study abroad news delivered to your inbox.</p>
                <div className="space-y-3">
                  <input type="email" placeholder="Email address" className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm" />
                  <Button className="w-full bg-white text-indigo-900 hover:bg-slate-100 font-bold">Subscribe</Button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

import { ChevronRight } from "lucide-react";
