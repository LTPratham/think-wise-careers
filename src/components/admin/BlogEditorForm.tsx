'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from './RichTextEditor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Eye, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
  'STUDY_ABROAD',
  'MBBS_ABROAD',
  'VISA',
  'CAREER',
  'SCHOLARSHIPS',
  'COUNTRY_GUIDES'
];

interface BlogEditorFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export function BlogEditorForm({ initialData, isEdit }: BlogEditorFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || '',
    featuredImageUrl: initialData?.featuredImageUrl || '',
    publishStatus: initialData?.publishStatus || 'DRAFT',
    body: initialData?.body || '',
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData({ ...formData, title, ...(isEdit ? {} : { slug }) });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = isEdit ? `/api/admin/blog/${initialData.id}` : '/api/admin/blog';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save post');

      alert(`Success! Post successfully ${isEdit ? 'updated' : 'created'}.`);

      router.push('/admin/blog');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error: Failed to save the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button type="button" variant="ghost" asChild>
            <Link href="/admin/blog"><ArrowLeft className="w-4 h-4 mr-2"/> Back</Link>
          </Button>
          <h1 className="text-3xl font-bold font-outfit text-slate-900">
            {isEdit ? 'Edit Post' : 'New Post'}
          </h1>
        </div>
        <div className="flex space-x-3">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => setFormData({...formData, publishStatus: 'DRAFT'})}
            className={formData.publishStatus === 'DRAFT' ? 'border-indigo-600 text-indigo-600 bg-indigo-50' : ''}
          >
            Draft
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => setFormData({...formData, publishStatus: 'PUBLISHED'})}
            className={formData.publishStatus === 'PUBLISHED' ? 'border-emerald-600 text-emerald-600 bg-emerald-50' : ''}
          >
            Published
          </Button>
          <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input 
              required
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Enter post title..."
              className="text-lg font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label>Post Content</Label>
            <RichTextEditor 
              content={formData.body}
              onChange={(body) => setFormData({...formData, body})}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <Label>URL Slug</Label>
              <Input 
                required
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                placeholder="post-url-slug"
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select required value={formData.category} onValueChange={(val) => setFormData({...formData, category: val})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat.replace('_', ' ')}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Featured Image URL (Optional)</Label>
              <Input 
                value={formData.featuredImageUrl}
                onChange={(e) => setFormData({...formData, featuredImageUrl: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
              {formData.featuredImageUrl && (
                <div className="mt-2 rounded-lg overflow-hidden border border-slate-200">
                  <img src={formData.featuredImageUrl} alt="Featured Preview" className="w-full h-32 object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
