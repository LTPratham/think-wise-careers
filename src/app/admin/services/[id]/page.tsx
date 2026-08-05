import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ServiceForm } from "@/components/admin/ServiceForm";

export default async function AdminServiceEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const isNew = (await params).id === "new";
  
  let service = null;
  if (!isNew) {
    service = await prisma.service.findUnique({
      where: { id: (await params).id },
    });
    if (!service) notFound();
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/admin/services" className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold font-outfit text-slate-900">
            {isNew ? "Add New Service" : `Edit ${service?.name}`}
          </h2>
          <p className="text-sm text-slate-500 mt-1">Service Offering</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <ServiceForm initialData={service} />
      </div>
    </div>
  );
}
