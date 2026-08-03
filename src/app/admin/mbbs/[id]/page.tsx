import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { MBBSForm } from "@/components/admin/MBBSForm";

export default async function AdminMBBSEditorPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  
  let country = null;
  if (!isNew) {
    country = await prisma.mBBSCountry.findUnique({
      where: { id: params.id },
    });
    if (!country) notFound();
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/admin/mbbs" className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold font-outfit text-slate-900">
            {isNew ? "Add New MBBS Destination" : `Edit ${country?.name}`}
          </h2>
          <p className="text-sm text-slate-500 mt-1">Medical Study Destination</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <MBBSForm initialData={country} />
      </div>
    </div>
  );
}
