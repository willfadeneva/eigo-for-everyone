"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function toggleLocale() {
    const next = locale === "en" ? "ja" : "en";
    router.replace(pathname, { locale: next });
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#fdf2f8] shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[#D946EF]">英語</span>
          <span className="text-sm font-medium text-[#475569] hidden sm:block">
            Eigo for Everyone
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/tutors" className="text-[#475569] hover:text-[#D946EF] font-medium transition-colors">
            {t("findTutors")}
          </Link>
          <Link href="/how-it-works" className="text-[#475569] hover:text-[#D946EF] font-medium transition-colors">
            {t("howItWorks")}
          </Link>
        </div>

        {/* Auth + lang switcher */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleLocale}
            className="text-sm font-medium text-[#64748b] hover:text-[#D946EF] border border-[#fce7f3] rounded-full px-3 py-1 transition-colors"
            title="Switch language"
          >
            {t("switchLang")}
          </button>
          <Link href="/auth/login">
            <Button variant="ghost" className="text-slate-700">{t("login")}</Button>
          </Link>
          <Link href="/auth/register">
            <Button className="bg-[#38BDF8] hover:bg-[#D946EF] text-white">{t("signup")}</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#fdf2f8] px-4 py-4 space-y-3">
          <Link href="/tutors" className="block text-slate-700 font-medium py-2" onClick={() => setMobileOpen(false)}>
            {t("findTutors")}
          </Link>
          <Link href="/how-it-works" className="block text-slate-700 font-medium py-2" onClick={() => setMobileOpen(false)}>
            {t("howItWorks")}
          </Link>
          <button
            onClick={() => { toggleLocale(); setMobileOpen(false); }}
            className="block text-[#D946EF] font-medium py-2 w-full text-left"
          >
            {t("switchLang")}
          </button>
          <div className="flex gap-3 pt-2">
            <Link href="/auth/login" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full">{t("login")}</Button>
            </Link>
            <Link href="/auth/register" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-[#D946EF] text-white">{t("signup")}</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
