import { NextAuthProvider } from "@/providers/NextAuthProvider";
import { requireTeamMember } from "@/lib/rbac";
import { NextResponse } from "next/server";
import Link from "next/link";
import { LayoutDashboard, Users, Calendar, Map, Globe, Shield, BookOpen, Settings, UserPlus, LogOut } from "lucide-react";
import { redirect } from "next/navigation";
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
  const isAdmin = user.role === "ADMIN";
  const isCounsellor = user.role === "COUNSELLOR";

  return (
    <NextAuthProvider>
      <div className="min-h-screen bg-slate-50 flex">
        
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col justify-between">
          <div>
            <div className="h-20 flex items-center px-6 border-b border-slate-800">
              <span className="text-xl font-bold text-white font-outfit">
                {isCounsellor ? "TWC Counsellor" : "TWC Admin"}
              </span>
            </div>
            
            <div className="py-6">
              <nav className="space-y-1 px-4">
                
                {/* Counsellor Portal Links */}
                {isCounsellor ? (
                  <>
                    <Link href="/admin/meetings" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
                      <Calendar className="w-5 h-5 mr-3 text-primary" /> My Calls & Meetings
                    </Link>
                    <Link href="/admin/leads" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
                      <Users className="w-5 h-5 mr-3 text-primary" /> My Assigned Leads
                    </Link>
                  </>
                ) : (
                  <>
                    {/* Admin / Editor Links */}
                    <Link href="/admin" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
                      <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
                    </Link>
                    <Link href="/admin/meetings" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
                      <Calendar className="w-5 h-5 mr-3" /> Meetings & Calls
                    </Link>
                    <Link href="/admin/leads" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
                      <Users className="w-5 h-5 mr-3" /> Leads & CRM
                    </Link>

                    {isAdmin && (
                      <Link href="/admin/team" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
                        <UserPlus className="w-5 h-5 mr-3" /> Team & Staff
                      </Link>
                    )}

                    <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Website Content
                    </div>

                    <Link href="/admin/countries" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
                      <Globe className="w-5 h-5 mr-3" /> Study Abroad
                    </Link>
                    <Link href="/admin/mbbs" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
                      <Shield className="w-5 h-5 mr-3" /> MBBS Abroad
                    </Link>
                    <Link href="/admin/universities" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
                      <BookOpen className="w-5 h-5 mr-3" /> Universities
                    </Link>
                    <Link href="/admin/services" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
                      <Map className="w-5 h-5 mr-3" /> Services
                    </Link>
                    <Link href="/admin/blog" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
                      <BookOpen className="w-5 h-5 mr-3" /> Blog CMS
                    </Link>

                    {isAdmin && (
                      <Link href="/admin/settings" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors mt-4">
                        <Settings className="w-5 h-5 mr-3" /> Settings (Admin)
                      </Link>
                    )}
                  </>
                )}

              </nav>
            </div>
          </div>
          
          {/* User Profile & Logout */}
          <div className="p-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center px-3 py-2 bg-slate-800 rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-3 shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-slate-400 truncate">{user.role}</p>
              </div>
            </div>

            <SignOutButton variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-slate-800" />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="h-20 bg-white border-b flex items-center justify-between px-8 shadow-sm z-10">
            <h1 className="text-xl font-semibold text-slate-800 font-outfit">
              {isCounsellor ? "Think Wise Careers — Counsellor Calling Portal" : "Think Wise Careers CMS & Executive CRM"}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-500 font-medium">Logged in as: <strong className="text-slate-800">{user.email}</strong></span>
              <SignOutButton variant="outline" />
            </div>
          </header>
          <div className="flex-1 overflow-y-auto p-8">
            {children}
          </div>
        </main>

      </div>
    </NextAuthProvider>
  );
}
