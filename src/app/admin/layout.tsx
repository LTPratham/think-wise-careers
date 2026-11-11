import { NextAuthProvider } from "@/providers/NextAuthProvider";
import { requireTeamMember } from "@/lib/rbac";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SignOutButton } from "@/components/admin/SignOutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await requireTeamMember();
  if (auth instanceof NextResponse) {
    redirect("/login");
  }

  const { user } = auth;
  const isCounsellor = user.role === "COUNSELLOR";

  return (
    <NextAuthProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
        
        {/* Responsive Sidebar (Persistent on Desktop, Slide-over Drawer on Mobile) */}
        <AdminSidebar user={user} />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Bar on Desktop */}
          <header className="hidden lg:flex h-20 bg-white border-b items-center justify-between px-8 shadow-xs z-10 shrink-0">
            <h1 className="text-xl font-semibold text-slate-800 font-outfit truncate">
              {isCounsellor ? "Think Wise Careers — Counsellor Calling Portal" : "Think Wise Careers CMS & Executive CRM"}
            </h1>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-xs text-slate-500 font-medium">
                Logged in as: <strong className="text-slate-800">{user.email}</strong>
              </span>
              <SignOutButton variant="outline" />
            </div>
          </header>

          {/* Page Body with Mobile Responsive Padding */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>

      </div>
    </NextAuthProvider>
  );
}
