import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { BlogCategory, BlogPublishStatus } from '@prisma/client';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const post = await prisma.blogPost.findUnique({
      where: { id: resolvedParams.id }
    });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const data = await request.json();
    
    // Determine publishedAt based on status change
    let publishedAt = undefined;
    if (data.publishStatus === 'PUBLISHED') {
      const existing = await prisma.blogPost.findUnique({ where: { id: resolvedParams.id } });
      if (existing?.publishStatus !== 'PUBLISHED') {
        publishedAt = new Date();
      }
    }

    const post = await prisma.blogPost.update({
      where: { id: resolvedParams.id },
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category as BlogCategory,
        body: data.body,
        featuredImageUrl: data.featuredImageUrl || null,
        publishStatus: data.publishStatus as BlogPublishStatus,
        ...(publishedAt !== undefined && { publishedAt }),
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    await prisma.blogPost.delete({
      where: { id: resolvedParams.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
