import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { BlogCategory, BlogPublishStatus } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { name: true } } }
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.slug || !data.category || !data.body) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get an admin user (in a real app, get from auth session)
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (!adminUser) {
      return NextResponse.json({ error: 'No admin user found to assign as author' }, { status: 400 });
    }

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category as BlogCategory,
        body: data.body,
        featuredImageUrl: data.featuredImageUrl || null,
        publishStatus: data.publishStatus || 'DRAFT',
        authorId: adminUser.id,
        publishedAt: data.publishStatus === 'PUBLISHED' ? new Date() : null,
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
