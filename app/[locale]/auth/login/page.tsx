"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Star, BookOpen, GraduationCap } from "lucide-react";

type Tab  = "signin" | "signup";
type Role = "student" | "tutor";

const TESTIMONIALS = [
  { name: "Rahul G.", city: "Mumbai",    text: "My IELTS went from 6.5 to 8.0 in 3 months!", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Priya S.", city: "Delhi",     text: "Best business English tutor I've ever had.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Anita P.", city: "Bangalore", text: "My daughter loves every single lesson!", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
];

export default function AuthPage() {
  const [tab,       setTab]       = useState<Tab>("signin");
  const [role,      setRole]      = useState<Role>("student");
  const [showPw,    setShowPw]    = useState(false);
  const [showCpw,   setShowCpw]   = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [password,  setPassword]  = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwError,   setPwError]   = useState("");

  function switchTab(t: Tab) {
    setTab(t);
    setPwError("");
    setPassword("");
    setConfirmPw("");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (tab === "signup" && password !== confirmPw) { setPwError("Passwords do not match"); return; }
    setPwError("");
    setLoading(true);
    setTimeout(() => setLoading(false), 1400);
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel — hero ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#F35555] via-[#FAB657] to-[#8774DB] flex-col justify-between p-12 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-0 w-72 h-72 bg-[#f9a8d4]/10 rounded-full blur-3xl" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 relative z-10">
          <span className="text-3xl font-bold text-white">英語</span>
          <span className="text-white/80 font-medium text-lg">Eigo for Everyone</span>
        </Link>

        {/* Middle copy */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-white/80 text-sm font-medium">
              ⭐ Trusted by 50,000+ learners
            </div>
            <h2 className="text-4xl font-bold text-white leading-tight">
              Speak English<br />with confidence
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              1-on-1 lessons with verified native tutors.<br />
              IELTS, Business, Kids & more — from ₹700/hr.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex gap-6">
            {[["500+","Tutors"],["4.96★","Rating"],["2.8M","Lessons"]].map(([v,l]) => (
              <div key={l}>
                <div className="text-2xl font-bold text-white">{v}</div>
                <div className="text-white/60 text-xs">{l}</div>
              </div>
            ))}
          </div>

          {/* Testimonial cards */}
          <div className="space-y-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                <div>
                  <p className="text-white text-sm leading-relaxed">"{t.text}"</p>
                  <p className="text-white/50 text-xs mt-1">{t.name} · {t.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <p className="text-white/40 text-xs relative z-10">🇮🇳 Built for India's English learners</p>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#ffffff]">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link href="/" className="flex items-center justify-center gap-2 mb-8 lg:hidden">
            <span className="text-3xl font-bold text-[#8774DB]">英語</span>
            <span className="text-[#475569] font-medium">Eigo for Everyone</span>
          </Link>

          <div className="bg-white rounded-3xl shadow-xl border border-[#fdf2f8] overflow-hidden">

            {/* ── Sign In / Sign Up sliding toggle ── */}
            <div className="p-3 border-b border-[#fdf2f8]">
              <div className="relative flex bg-slate-100 rounded-2xl p-1 gap-1">
                <div
                  className="absolute top-1 bottom-1 bg-white rounded-xl shadow-md transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ width: "calc(50% - 4px)", left: tab === "signin" ? "4px" : "calc(50%)" }}
                />
                {(["signin","signup"] as Tab[]).map(t => (
                  <button key={t} onClick={() => switchTab(t)}
                    className={`relative z-10 flex-1 py-3 text-sm font-semibold rounded-xl transition-colors duration-200 ${tab === t ? "text-[#8774DB]" : "text-slate-400 hover:text-[#475569]"}`}>
                    {t === "signin" ? "Sign In" : "Sign Up"}
                  </button>
                ))}
              </div>
            </div>

            {/* Form area — slides on tab change */}
            <div className="p-6 space-y-5">

              {/* ── Student / Tutor toggle (signup only) ── */}
              <div className={`overflow-hidden transition-all duration-300 ${tab === "signup" ? "max-h-28 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 text-center">I am a…</p>
                <div className="relative flex bg-slate-100 rounded-2xl p-1 gap-1">
                  <div
                    className="absolute top-1 bottom-1 bg-[#49D1FD] rounded-xl shadow transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{ width: "calc(50% - 4px)", left: role === "student" ? "4px" : "calc(50%)" }}
                  />
                  {([
                    { v:"student" as Role, label:"🎓 Student", icon: GraduationCap },
                    { v:"tutor"   as Role, label:"📚 Tutor",   icon: BookOpen },
                  ]).map(({ v, label }) => (
                    <button key={v} onClick={() => setRole(v)}
                      className={`relative z-10 flex-1 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 ${role === v ? "text-white" : "text-[#64748b] hover:text-slate-700"}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Google */}
              <button onClick={() => alert("Google OAuth — coming soon!")}
                className="w-full flex items-center justify-center gap-3 h-11 rounded-xl border-2 border-[#fce7f3] hover:border-slate-300 hover:bg-[#fafafa] transition-all text-sm font-medium text-slate-700">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <div className="flex-1 h-px bg-slate-200" /> or <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* Fields */}
              <form onSubmit={submit} className="space-y-4">

                {/* Name — signup only */}
                <div className={`overflow-hidden transition-all duration-300 ${tab === "signup" ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
                  <Input placeholder="Your name" className="rounded-xl h-11" />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <Input type="email" placeholder="you@example.com" className="rounded-xl h-11" required />
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-sm font-medium text-slate-700">Password</label>
                    {tab === "signin" && (
                      <Link href="#" className="text-xs text-[#8774DB] hover:underline">Forgot password?</Link>
                    )}
                  </div>
                  <div className="relative">
                    <Input type={showPw ? "text" : "password"} placeholder="Min 8 characters"
                      className="rounded-xl h-11 pr-10" required minLength={8}
                      value={password} onChange={e => { setPassword(e.target.value); setPwError(""); }} />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#475569] transition-colors">
                      {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                    </button>
                  </div>
                </div>

                {/* Confirm password — signup only */}
                <div className={`overflow-hidden transition-all duration-300 ${tab === "signup" ? "max-h-28 opacity-100" : "max-h-0 opacity-0"}`}>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm password</label>
                  <div className="relative">
                    <Input type={showCpw ? "text" : "password"} placeholder="Re-enter password"
                      className={`rounded-xl h-11 pr-10 ${pwError ? "border-red-400 focus:ring-red-300" : ""}`}
                      minLength={8} value={confirmPw}
                      onChange={e => { setConfirmPw(e.target.value); setPwError(""); }} />
                    <button type="button" onClick={() => setShowCpw(!showCpw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#475569] transition-colors">
                      {showCpw ? <EyeOff size={16}/> : <Eye size={16}/>}
                    </button>
                  </div>
                  {pwError && <p className="text-red-500 text-xs mt-1.5">{pwError}</p>}
                </div>

                {/* Tutor note */}
                {tab === "signup" && role === "tutor" && (
                  <div className="bg-[#fdf2f8] border border-[#f9a8d4] rounded-xl p-3 text-sm text-[#9f1239]">
                    🎓 Tutor applications reviewed within 2 business days.
                  </div>
                )}

                {/* CTA button */}
                <Button type="submit" disabled={loading}
                  className="w-full bg-[#49D1FD] hover:bg-[#8774DB] active:scale-[0.98] text-white h-12 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md shadow-pink-200">
                  {loading
                    ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {tab === "signin" ? "Signing in…" : "Creating account…"}</span>
                    : tab === "signin" ? "Sign In" : `Create ${role} account →`
                  }
                </Button>
              </form>

              {/* Bottom switch */}
              <p className="text-center text-sm text-[#64748b]">
                {tab === "signin" ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => switchTab(tab === "signin" ? "signup" : "signin")}
                  className="text-[#8774DB] font-semibold hover:underline transition-colors">
                  {tab === "signin" ? "Sign up free" : "Sign in"}
                </button>
              </p>

              {tab === "signup" && (
                <p className="text-center text-xs text-slate-400">
                  By signing up you agree to our{" "}
                  <Link href="/terms" className="underline hover:text-[#475569]">Terms</Link>{" "}and{" "}
                  <Link href="/privacy" className="underline hover:text-[#475569]">Privacy Policy</Link>
                </p>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
