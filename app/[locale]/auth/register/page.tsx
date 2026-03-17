"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, BookOpen } from "lucide-react";

type Role = "STUDENT" | "TUTOR";

export default function RegisterPage() {
  const [role, setRole] = useState<Role>("STUDENT");
  const [loading, setLoading] = useState(false);

  // Read ?role=tutor from URL on mount
  // TODO: wire to Supabase Auth

  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwError, setPwError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPw) {
      setPwError("Passwords do not match");
      return;
    }
    setPwError("");
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="text-3xl font-bold text-[#3730a3]">英語</span>
          <span className="text-slate-600 font-medium">Eigo for Everyone</span>
        </Link>

        <Card className="shadow-lg border border-slate-100">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-slate-900">Create your account</CardTitle>
            <CardDescription>Join 15,000+ learners and tutors</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-5">

            {/* Role toggle */}
            <div>
              <p className="text-sm font-medium text-slate-700 mb-3 text-center">I want to…</p>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { value: "STUDENT", label: "Learn English", sub: "Find a tutor", Icon: GraduationCap },
                  { value: "TUTOR",   label: "Teach English", sub: "Earn money",   Icon: BookOpen },
                ] as { value: Role; label: string; sub: string; Icon: React.FC<{ size: number; className?: string }> }[]).map(({ value, label, sub, Icon }) => (
                  <button key={value} onClick={() => setRole(value)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      role === value
                        ? "border-[#3730a3] bg-[#eef2ff]"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}>
                    <Icon size={22} className={role === value ? "text-[#3730a3] mx-auto mb-1" : "text-slate-400 mx-auto mb-1"} />
                    <div className={`font-semibold text-sm ${role === value ? "text-[#3730a3]" : "text-slate-700"}`}>{label}</div>
                    <div className="text-xs text-slate-400">{sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Google OAuth */}
            <Button variant="outline" className="w-full flex items-center gap-3 h-11"
              onClick={() => alert("Google OAuth — coming soon!")}>
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </Button>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="flex-1 h-px bg-slate-200" />or<div className="flex-1 h-px bg-slate-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" placeholder="Your name" className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Min 8 characters" className="mt-1" required minLength={8}
                  value={password} onChange={e => { setPassword(e.target.value); setPwError(""); }} />
              </div>
              <div>
                <Label htmlFor="confirmPw">Confirm password</Label>
                <Input id="confirmPw" type="password" placeholder="Re-enter password" className="mt-1" required minLength={8}
                  value={confirmPw} onChange={e => { setConfirmPw(e.target.value); setPwError(""); }} />
                {pwError && <p className="text-red-500 text-xs mt-1">{pwError}</p>}
              </div>
              {role === "TUTOR" && (
                <div className="bg-[#fdf2f8] border border-[#f9a8d4] rounded-lg p-3 text-sm text-[#9f1239]">
                  🎓 Tutor applications are reviewed within 2 business days. You&apos;ll receive an email once approved.
                </div>
              )}
              <Button type="submit" disabled={loading}
                className="w-full bg-[#3730a3] hover:bg-[#312e81] text-white h-11">
                {loading ? "Creating account…" : `Create ${role === "TUTOR" ? "tutor" : "student"} account`}
              </Button>
            </form>

            <p className="text-center text-xs text-slate-400">
              By signing up you agree to our{" "}
              <Link href="/terms" className="underline">Terms</Link> and{" "}
              <Link href="/privacy" className="underline">Privacy Policy</Link>
            </p>
            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-[#3730a3] font-medium hover:underline">Sign in</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
