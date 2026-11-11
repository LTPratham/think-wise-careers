"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Map, 
  Globe, 
  BookOpen, 
  Settings, 
  UserPlus, 
  Menu, 
  X,
  Building2
} from "lucide-react";
import { SignOutButton } from "./SignOutButton";

interface AdminSidebarProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isAdmin = user.role === "ADMIN";
  const isCounsellor = user.role === "COUNSELLOR";

  const closeMenu = () => setIsOpen(false);

  const navLinks = isCounsellor ? (
    <>
      <Link
        href="/admin/meetings"
        onClick={closeMenu}
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          pathname.startsWith("/admin/meetings")
            ? "bg-slate-800 text-white"
            : "hover:bg-slate-800 hover:text-white"
        }`}
      >
        <Calendar className="w-5 h-5 mr-3 text-primary" /> My Calls & Meetings
      </Link>
      <Link
        href="/admin/leads"
        onClick={closeMenu}
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          pathname.startsWith("/admin/leads")
            ? "bg-slate-800 text-white"
            : "hover:bg-slate-800 hover:text-white"
        }`}
      >
        <Users className="w-5 h-5 mr-3 text-primary" /> My Assigned Leads
      </Link>
    </>
  ) : (
    <>
      <Link
        href="/admin"
        onClick={closeMenu}
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          pathname === "/admin"
            ? "bg-slate-800 text-white"
            : "hover:bg-slate-800 hover:text-white"
        }`}
      >
        <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
      </Link>
      <Link
        href="/admin/meetings"
        onClick={closeMenu}
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          pathname.startsWith("/admin/meetings")
            ? "bg-slate-800 text-white"
            : "hover:bg-slate-800 hover:text-white"
        }`}
      >
        <Calendar className="w-5 h-5 mr-3" /> Meetings & Calls
      </Link>
      <Link
        href="/admin/leads"
        onClick={closeMenu}
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          pathname.startsWith("/admin/leads")
            ? "bg-slate-800 text-white"
            : "hover:bg-slate-800 hover:text-white"
        }`}
      >
        <Users className="w-5 h-5 mr-3" /> Leads & CRM
      </Link>

      {isAdmin && (
        <Link
          href="/admin/team"
          onClick={closeMenu}
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
            pathname.startsWith("/admin/team")
              ? "bg-slate-800 text-white"
              : "hover:bg-slate-800 hover:text-white"
          }`}
        >
          <UserPlus className="w-5 h-5 mr-3" /> Team & Staff
        </Link>
      )}

      <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        Website Content
      </div>

      <Link
        href="/admin/countries"
        onClick={closeMenu}
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          pathname.startsWith("/admin/countries")
            ? "bg-slate-800 text-white"
            : "hover:bg-slate-800 hover:text-white"
        }`}
      >
        <Globe className="w-5 h-5 mr-3 text-indigo-400" /> Study Abroad
      </Link>
      <Link
        href="/admin/universities"
        onClick={closeMenu}
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          pathname.startsWith("/admin/universities")
            ? "bg-slate-800 text-white"
            : "hover:bg-slate-800 hover:text-white"
        }`}
      >
        <Building2 className="w-5 h-5 mr-3 text-blue-400" /> Universities
      </Link>
      <Link
        href="/admin/services"
        onClick={closeMenu}
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          pathname.startsWith("/admin/services")
            ? "bg-slate-800 text-white"
            : "hover:bg-slate-800 hover:text-white"
        }`}
      >
        <Map className="w-5 h-5 mr-3 text-emerald-400" /> Services
      </Link>
      <Link
        href="/admin/blog"
        onClick={closeMenu}
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          pathname.startsWith("/admin/blog")
            ? "bg-slate-800 text-white"
            : "hover:bg-slate-800 hover:text-white"
        }`}
      >
        <BookOpen className="w-5 h-5 mr-3 text-purple-400" /> Blog CMS
      </Link>

      {isAdmin && (
        <Link
          href="/admin/settings"
          onClick={closeMenu}
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors mt-4 ${
            pathname.startsWith("/admin/settings")
              ? "bg-slate-800 text-white"
              : "hover:bg-slate-800 hover:text-white"
          }`}
        >
          <Settings className="w-5 h-5 mr-3" /> Settings (Admin)
        </Link>
      )}
    </>
  );

  return (
    <>
      {/* Mobile Top Navbar with Hamburger */}
      <div className="lg:hidden bg-slate-900 text-white px-4 h-16 flex items-center justify-between sticky top-0 z-40 border-b border-slate-800">
        <span className="text-lg font-bold font-outfit text-white">
          {isCounsellor ? "TWC Counsellor" : "TWC Admin"}
        </span>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-slate-950/70 z-40 lg:hidden backdrop-blur-xs animate-in fade-in duration-150"
        />
      )}

      {/* Sidebar (Desktop persistent, Mobile slide-out drawer) */}
      <aside
        className={`
          fixed lg:static top-0 bottom-0 left-0 z-50
          w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col justify-between
          transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="overflow-y-auto flex-1">
          <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">
            <span className="text-xl font-bold text-white font-outfit">
              {isCounsellor ? "TWC Counsellor" : "TWC Admin"}
            </span>
            <button
              type="button"
              onClick={closeMenu}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-6">
            <nav className="space-y-1 px-4">{navLinks}</nav>
          </div>
        </div>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-3 shrink-0 bg-slate-900">
          <div className="flex items-center px-3 py-2 bg-slate-800 rounded-lg">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-3 shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-slate-400 truncate">{user.role}</p>
            </div>
          </div>

          <SignOutButton
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-slate-800"
          />
        </div>
      </aside>
    </>
  );
}
