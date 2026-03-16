"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, GraduationCap, BookOpen, Tag, Settings, ChevronRight } from "lucide-react";

const NAV = [
  { href: "/admin",              label: "Dashboard",   icon: LayoutDashboard },
  { href: "/admin/tutors",       label: "Tutors",      icon: GraduationCap   },
  { href: "/admin/students",     label: "Students",    icon: Users            },
  { href: "/admin/lessons",      label: "Lessons",     icon: BookOpen         },
  { href: "/admin/promo-codes",  label: "Promo Codes", icon: Tag              },
  { href: "/admin/settings",     label: "Settings",    icon: Settings         },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    // TODO: Add admin session guard in Phase 2 auth wiring
    <div className="min-h-screen flex bg-[#fafafa]">
      {/* Sidebar */}
      <aside className="w-56 bg-[#1e1b4b] text-white flex flex-col flex-shrink-0 min-h-screen">
        <div className="px-5 py-5 border-b border-white/10">
          <Link href="/" className="text-xl font-bold text-white">英語 Eigo</Link>
          <div className="text-xs text-indigo-300 mt-0.5">Admin Console</div>
        </div>
        <nav className="flex-1 py-4 space-y-0.5 px-3">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = path === href || (href !== "/admin" && path.startsWith(href));
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-[#3730a3] text-white" : "text-indigo-200 hover:bg-white/10 hover:text-white"
                }`}>
                <Icon size={16}/>
                {label}
                {active && <ChevronRight size={12} className="ml-auto"/>}
              </Link>
            );
          })}
        </nav>
        <div className="px-5 py-4 border-t border-white/10">
          <div className="text-xs text-indigo-400">Logged in as</div>
          <div className="text-sm font-medium text-white">Admin</div>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
