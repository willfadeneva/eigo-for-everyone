"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[#3730a3]">英語</span>
          <span className="text-sm font-medium text-slate-600 hidden sm:block">
            Eigo for Everyone
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/tutors"
            className="text-slate-600 hover:text-[#3730a3] font-medium transition-colors"
          >
            Find Tutors
          </Link>
          <Link
            href="/how-it-works"
            className="text-slate-600 hover:text-[#3730a3] font-medium transition-colors"
          >
            How it works
          </Link>
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login">
            <Button variant="ghost" className="text-slate-700">
              ログイン
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="bg-[#3730a3] hover:bg-[#312e81] text-white">
              無料で始める
            </Button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3">
          <Link
            href="/tutors"
            className="block text-slate-700 font-medium py-2"
            onClick={() => setMobileOpen(false)}
          >
            Find Tutors
          </Link>
          <Link
            href="/how-it-works"
            className="block text-slate-700 font-medium py-2"
            onClick={() => setMobileOpen(false)}
          >
            How it works
          </Link>

          <div className="flex gap-3 pt-2">
            <Link href="/auth/login" className="flex-1">
              <Button variant="outline" className="w-full">
                ログイン
              </Button>
            </Link>
            <Link href="/auth/register" className="flex-1">
              <Button className="w-full bg-[#3730a3] text-white">
                無料で始める
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
