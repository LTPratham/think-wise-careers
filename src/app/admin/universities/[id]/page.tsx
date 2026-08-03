import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { UniversityForm } from "@/components/admin/UniversityForm";

export default async function AdminUniversityEditorPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  
  let uni = null;
  if (!isNew) {
    uni = await prisma.university.findUnique({
      where: { id: params.id },
    });
    if (!uni) notFound();
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/admin/universities" className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold font-outfit text-slate-900">
            {isNew ? "Add New University" : `Edit ${uni?.name}`}
          </h2>
          <p className="text-sm text-slate-500 mt-1">Institution Database</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <UniversityForm initialData={uni} />
      </div>
    </div>
  );
}
