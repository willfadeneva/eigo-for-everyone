"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const t       = useTranslations("nav");
  const locale  = useLocale();
  const pathname = usePathname();
  const router   = useRouter();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function toggleLocale() {
    router.replace(pathname, { locale: locale === "en" ? "ja" : "en" });
  }

  const isHome = pathname === "/";

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isHome
        ? scrolled ? "bg-[#0D0A1E]/95 backdrop-blur-lg border-b border-white/10 shadow-lg shadow-black/20"
                   : "bg-transparent border-b border-white/5"
        : "bg-white/95 backdrop-blur-lg border-b border-[#f0ebff] shadow-sm"
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-gradient-to-br from-[#8774DB] to-[#F472B6] rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-sm">英</span>
          </div>
          <span className={`text-sm font-bold hidden sm:block transition-colors ${isHome && !scrolled ? "text-white" : "text-[#0f172a]"}`}>
            Eigo for Everyone
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { href: "/tutors",       label: t("findTutors") },
            { href: "/how-it-works", label: t("howItWorks") },
          ].map(item => (
            <Link key={item.href} href={item.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isHome && !scrolled
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-[#475569] hover:text-[#8774DB] hover:bg-[#f5f3ff]"
              }`}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-2">
          <button onClick={toggleLocale}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
              isHome && !scrolled
                ? "border-white/20 text-white/70 hover:bg-white/10"
                : "border-[#e9d8fd] text-[#8774DB] hover:bg-[#f5f3ff]"
            }`}>
            {t("switchLang")}
          </button>
          <Link href="/auth/login">
            <button className={`text-sm font-medium px-4 py-2 rounded-xl transition-all ${
              isHome && !scrolled ? "text-white/80 hover:text-white" : "text-[#475569] hover:text-[#8774DB]"
            }`}>{t("login")}</button>
          </Link>
          <Link href="/auth/login">
            <Button className="bg-[#8774DB] hover:bg-[#7261C8] text-white rounded-full px-5 font-bold shadow-md shadow-[#8774DB]/30 flex items-center gap-1.5">
              <Sparkles size={13} /> {t("signup")}
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className={`md:hidden p-2 rounded-lg transition-colors ${isHome && !scrolled ? "text-white" : "text-[#0f172a]"}`}
          onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={`md:hidden border-t px-4 py-5 space-y-2 ${
          isHome ? "bg-[#0D0A1E] border-white/10" : "bg-white border-[#f0ebff]"
        }`}>
          {[
            { href: "/tutors",       label: t("findTutors") },
            { href: "/how-it-works", label: t("howItWorks") },
          ].map(item => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-2 py-2.5 px-3 rounded-xl font-medium text-sm transition-colors ${
                isHome ? "text-white/80 hover:bg-white/10" : "text-[#475569] hover:bg-[#f5f3ff] hover:text-[#8774DB]"
              }`}
              onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
          ))}
          <button onClick={() => { toggleLocale(); setMobileOpen(false); }}
            className={`w-full text-left py-2.5 px-3 rounded-xl font-medium text-sm ${
              isHome ? "text-[#C4B5FD]" : "text-[#8774DB]"
            }`}>
            {t("switchLang")}
          </button>
          <div className="flex gap-2 pt-2">
            <Link href="/auth/login" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className={`w-full rounded-xl ${isHome ? "border-white/20 text-white bg-white/5" : ""}`}>{t("login")}</Button>
            </Link>
            <Link href="/auth/login" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-[#8774DB] text-white rounded-xl font-bold">{t("signup")}</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
