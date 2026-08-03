import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold font-outfit text-slate-900">Our Services</h2>
          <p className="text-slate-500 mt-1">Manage core service offerings.</p>
        </div>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="w-4 h-4 mr-2" /> Add Service
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Service Name</th>
              <th className="px-6 py-4">URL Slug</th>
              <th className="px-6 py-4">Added On</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-900">
                  {service.name}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  /{service.slug}
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {format(new Date(service.createdAt), "MMM d, yyyy")}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/services/${service.id}`}>
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  No services found. Click 'Add Service' to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
