"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, Users, GraduationCap, BookOpen, Tag, Settings, ChevronRight, LogOut } from "lucide-react";

const NAV = [
  { href: "/admin",              label: "Dashboard",   icon: LayoutDashboard },
  { href: "/admin/tutors",       label: "Tutors",      icon: GraduationCap   },
  { href: "/admin/students",     label: "Students",    icon: Users            },
  { href: "/admin/lessons",      label: "Lessons",     icon: BookOpen         },
  { href: "/admin/promo-codes",  label: "Promo Codes", icon: Tag              },
  { href: "/admin/settings",     label: "Settings",    icon: Settings         },
];

const ADMIN_USER = "admin";
const ADMIN_PASS = "pass123";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setAuthed(sessionStorage.getItem("eigo_admin") === "1");
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem("eigo_admin", "1");
      setAuthed(true);
      setError("");
    } else {
      setError("Invalid username or password.");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("eigo_admin");
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1e1b4b]">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-[#3730a3]">英語 Eigo</div>
            <div className="text-slate-500 text-sm mt-1">Admin Console</div>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Username</label>
              <input
                type="text" value={user} onChange={e => setUser(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3730a3]"
                placeholder="admin" autoComplete="username"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Password</label>
              <input
                type="password" value={pass} onChange={e => setPass(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3730a3]"
                placeholder="••••••••" autoComplete="current-password"
              />
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button type="submit"
              className="w-full bg-[#3730a3] hover:bg-[#312e81] text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#fafafa]">
      <aside className="w-full md:w-56 bg-[#1e1b4b] text-white flex flex-col flex-shrink-0">
        <div className="px-5 py-5 border-b border-white/10">
          <Link href="/" className="text-xl font-bold text-white">英語 Eigo</Link>
          <div className="text-xs text-indigo-300 mt-0.5">Admin Console</div>
        </div>
        <nav className="flex-1 py-2 md:py-4 flex flex-row md:flex-col flex-wrap md:flex-nowrap gap-0.5 px-3 overflow-x-auto md:overflow-visible">
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
        <div className="px-5 py-3 md:py-4 border-t border-white/10 flex items-center justify-between md:block">
          <div>
            <div className="text-xs text-indigo-400">Logged in as</div>
            <div className="text-sm font-medium text-white">admin</div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-xs text-indigo-300 hover:text-white transition-colors mt-0 md:mt-2">
            <LogOut size={12}/> Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
