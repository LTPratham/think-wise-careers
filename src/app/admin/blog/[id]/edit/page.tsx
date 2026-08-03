import { prisma } from '@/lib/prisma';
import { BlogEditorForm } from '@/components/admin/BlogEditorForm';
import { notFound } from 'next/navigation';

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const post = await prisma.blogPost.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!post) {
    notFound();
  }

  return <BlogEditorForm initialData={post} isEdit={true} />;
}
