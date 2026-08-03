'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import { Bold, Italic, Strikethrough, Heading1, Heading2, List, ListOrdered, Quote, Undo, Redo, Image as ImageIcon, Link as LinkIcon, Video as YoutubeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Image,
      Link.configure({ openOnClick: false }),
      Youtube.configure({ inline: false }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[400px]',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('URL of the image:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL');
    if (url) {
      editor.commands.setYoutubeVideo({ src: url, width: 640, height: 480 });
    }
  };

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap gap-1 items-center sticky top-0 z-10">
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-slate-200' : ''}>
          <Bold className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-slate-200' : ''}>
          <Italic className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'bg-slate-200' : ''}>
          <Strikethrough className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-slate-300 mx-1" />
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'bg-slate-200' : ''}>
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'bg-slate-200' : ''}>
          <Heading2 className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-slate-300 mx-1" />
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-slate-200' : ''}>
          <List className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'bg-slate-200' : ''}>
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'bg-slate-200' : ''}>
          <Quote className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-slate-300 mx-1" />
        <Button type="button" variant="ghost" size="sm" onClick={addImage}>
          <ImageIcon className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={setLink} className={editor.isActive('link') ? 'bg-slate-200' : ''}>
          <LinkIcon className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={addYoutubeVideo}>
          <YoutubeIcon className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-slate-300 mx-1" />
        <input 
          type="color" 
          onInput={event => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()} 
          value={editor.getAttributes('textStyle').color || '#000000'}
          className="w-8 h-8 rounded cursor-pointer border-0 p-0"
        />
        <div className="flex-1" />
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <Undo className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <Redo className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="p-4 bg-white min-h-[400px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
