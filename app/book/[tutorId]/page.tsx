"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, Clock, ChevronRight, CalendarDays, CreditCard, User } from "lucide-react";

// ── Tutor registry (same as profile page) ────────────────────────────────────
const ALL_TUTORS: Record<string, { id: string; displayName: string; tagline: string; avatarUrl: string; hourlyRate: number }> = {
  t1: { id:"t1", displayName:"Sarah Mitchell",  tagline:"Business English & IELTS specialist",   avatarUrl:"https://randomuser.me/api/portraits/women/44.jpg", hourlyRate:1200 },
  t2: { id:"t2", displayName:"James O'Brien",   tagline:"Oxford grad · Academic writing & TOEFL", avatarUrl:"https://randomuser.me/api/portraits/men/32.jpg",   hourlyRate:1400 },
  t3: { id:"t3", displayName:"Emily Chen",      tagline:"Kids & teens English · Patient & fun!",  avatarUrl:"https://randomuser.me/api/portraits/women/68.jpg", hourlyRate:900  },
  t4: { id:"t4", displayName:"David Thompson",  tagline:"Spoken English · Accent reduction",      avatarUrl:"https://randomuser.me/api/portraits/men/75.jpg",   hourlyRate:800  },
  t5: { id:"t5", displayName:"Priya Williams",  tagline:"IELTS 8.5 scorer · 5 years coaching",   avatarUrl:"https://randomuser.me/api/portraits/women/26.jpg", hourlyRate:1100 },
  t6: { id:"t6", displayName:"Michael Ross",    tagline:"Corporate trainer · C-suite presentations", avatarUrl:"https://randomuser.me/api/portraits/men/52.jpg", hourlyRate:1800 },
  t7: { id:"t7", displayName:"Anna Kowalski",   tagline:"Grammar focus · Beginners welcome",      avatarUrl:"https://randomuser.me/api/portraits/women/14.jpg", hourlyRate:700  },
  t8: { id:"t8", displayName:"Tom Nakamura",    tagline:"TOEFL 118 · Test prep specialist",       avatarUrl:"https://randomuser.me/api/portraits/men/18.jpg",   hourlyRate:1300 },
  t9: { id:"t9", displayName:"Lisa Fernandez",  tagline:"Fun conversational English for all ages", avatarUrl:"https://randomuser.me/api/portraits/women/57.jpg", hourlyRate:850  },
};
function getTutor(id: string) { return ALL_TUTORS[id] ?? ALL_TUTORS["t1"]; }

type LessonType = { id: string; label: string; duration: number; price: number; badge?: string };

const DAYS  = ["Mon 17","Tue 18","Wed 19","Thu 20","Fri 21","Sat 22","Sun 23"];
const TIMES = ["09:00","10:00","11:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];
const FREE_SLOTS = new Set(["Mon 17-09:00","Mon 17-15:00","Tue 18-10:00","Tue 18-11:00","Wed 19-14:00","Wed 19-15:00","Thu 20-09:00","Fri 21-10:00","Sat 22-10:00","Sat 22-11:00"]);

type ContactForm = {
  firstName: string; middleName: string; lastName: string;
  phone: string; email: string; contactBy: "email" | "phone" | "both";
};

const EMPTY_FORM: ContactForm = { firstName:"", middleName:"", lastName:"", phone:"", email:"", contactBy:"email" };

// Steps: 0=lesson type, 1=date/time, 2=your details, 3=review+pay (paid only)
const ALL_STEPS  = ["Lesson type","Date & time","Your details","Payment"];
const FREE_STEPS = ["Lesson type","Date & time","Your details"];

export default function BookPage({ params }: { params: Promise<{ tutorId: string }> }) {
  const { tutorId } = use(params);
  const tutor = getTutor(tutorId);
  const LESSON_TYPES: LessonType[] = [
    { id: "trial", label: "Trial lesson",    duration: 25, price: 0,                        badge: "FREE — No charge" },
    { id: "50min", label: "Regular lesson",  duration: 50, price: tutor.hourlyRate },
    { id: "80min", label: "Extended lesson", duration: 80, price: Math.round(tutor.hourlyRate * 1.5) },
  ];
  const [step, setStep]             = useState(0);
  const [lessonType, setLessonType] = useState<LessonType>(LESSON_TYPES[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [form, setForm]             = useState<ContactForm>(EMPTY_FORM);
  const [errors, setErrors]         = useState<Partial<ContactForm>>({});
  const [booked, setBooked]         = useState(false);

  const isFree  = lessonType.price === 0;
  const STEPS   = isFree ? FREE_STEPS : ALL_STEPS;

  function setField(k: keyof ContactForm, v: string) {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
  }

  function validateForm(): boolean {
    const e: Partial<ContactForm> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim())  e.lastName  = "Required";
    if (!form.phone.trim() || !/^\+?[0-9\s\-]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleDetailsNext() {
    if (!validateForm()) return;
    if (isFree) setBooked(true);
    else setStep(3);
  }

  function confirm() { setBooked(true); }

  if (booked) return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          {isFree ? "Trial lesson booked! 🎉" : "Booking confirmed! (Demo)"}
        </h1>
        <p className="text-slate-500 mb-2">
          {isFree
            ? `Thanks ${form.firstName}! Your free trial with ${tutor.displayName} is scheduled.`
            : `Your lesson with ${tutor.displayName} is scheduled.`}
        </p>
        <p className="text-slate-400 text-sm mb-6">
          {form.contactBy === "email"
            ? `We'll contact you at ${form.email}.`
            : form.contactBy === "phone"
            ? `We'll contact you at ${form.phone}.`
            : `We'll reach you at ${form.email} or ${form.phone}.`}
        </p>
        <Link href="/dashboard/student">
          <Button className="bg-[#3730a3] text-white">Go to dashboard</Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href={`/tutors/${tutorId}`} className="text-sm text-[#3730a3] hover:underline mb-6 block">
          ← Back to profile
        </Link>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Book a lesson with {tutor.displayName}</h1>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8 text-sm flex-wrap">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                i < step ? "bg-[#3730a3] text-white" : i === step ? "bg-[#3730a3] text-white ring-4 ring-[#3730a3]/20" : "bg-slate-200 text-slate-500"}`}>
                {i < step ? <Check size={12} /> : i + 1}
              </div>
              <span className={i === step ? "font-medium text-slate-800" : "text-slate-400 hidden sm:block"}>{s}</span>
              {i < STEPS.length - 1 && <ChevronRight size={14} className="text-slate-300" />}
            </div>
          ))}
        </div>

        <Card className="shadow-sm border border-slate-100">
          <CardContent className="p-6">

            {/* ── Step 0: Lesson type ─────────────────────────────────── */}
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-slate-800 flex items-center gap-2"><Clock size={16}/> Select lesson type</h2>
                {LESSON_TYPES.map(lt => (
                  <div key={lt.id} onClick={() => setLessonType(lt)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${lessonType.id === lt.id ? "border-[#3730a3] bg-[#eef2ff]" : "border-slate-200 hover:border-slate-300"}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-800">{lt.label}</div>
                        <div className="text-sm text-slate-500">{lt.duration} minutes</div>
                        {lt.badge && <Badge className="mt-1 bg-[#f9a8d4] text-[#831843] text-xs">{lt.badge}</Badge>}
                      </div>
                      <div className="text-xl font-bold text-[#3730a3]">
                        {lt.price === 0 ? "FREE" : `₹${lt.price}`}
                      </div>
                    </div>
                  </div>
                ))}
                <Button onClick={() => setStep(1)} className="w-full bg-[#3730a3] text-white mt-2">
                  Continue <ChevronRight size={16} className="ml-1"/>
                </Button>
              </div>
            )}

            {/* ── Step 1: Date & time ─────────────────────────────────── */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-slate-800 flex items-center gap-2"><CalendarDays size={16}/> Select date & time <span className="text-xs font-normal text-slate-400">(IST)</span></h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr><th className="w-14 text-left text-slate-400 font-normal pb-2">Time</th>
                        {DAYS.map(d => <th key={d} className="text-center text-slate-600 font-medium pb-2 px-1 whitespace-nowrap">{d}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {TIMES.map(t => (
                        <tr key={t}>
                          <td className="text-slate-400 py-0.5 pr-2 whitespace-nowrap">{t}</td>
                          {DAYS.map(d => {
                            const key = `${d}-${t}`;
                            const avail = FREE_SLOTS.has(key);
                            const sel = selectedSlot === key;
                            return (
                              <td key={d} className="px-1 py-0.5 text-center">
                                {avail ? (
                                  <button onClick={() => setSelectedSlot(key)}
                                    className={`w-7 h-6 rounded text-[10px] font-medium transition-all ${sel ? "bg-[#3730a3] text-white" : "bg-[#eef2ff] text-[#3730a3] hover:bg-[#3730a3] hover:text-white"}`}>
                                    {sel ? "✓" : ""}
                                  </button>
                                ) : <span className="inline-block w-7 h-6 rounded bg-slate-50"/>}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {selectedSlot && <p className="text-sm text-[#3730a3] font-medium">Selected: {selectedSlot} IST</p>}
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(0)} className="flex-1">Back</Button>
                  <Button onClick={() => setStep(2)} disabled={!selectedSlot} className="flex-1 bg-[#3730a3] text-white">Continue</Button>
                </div>
              </div>
            )}

            {/* ── Step 2: Your details (ALL lesson types) ─────────────── */}
            {step === 2 && (
              <div className="space-y-5">
                <h2 className="font-semibold text-slate-800 flex items-center gap-2"><User size={16}/> Your details</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* First name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First name <span className="text-red-500">*</span></label>
                    <input value={form.firstName} onChange={e => setField("firstName", e.target.value)}
                      placeholder="e.g. Rahul"
                      className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3730a3] ${errors.firstName ? "border-red-400" : "border-slate-200"}`}/>
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  {/* Middle name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Middle name <span className="text-slate-400 font-normal">(optional)</span></label>
                    <input value={form.middleName} onChange={e => setField("middleName", e.target.value)}
                      placeholder="e.g. Kumar"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3730a3]"/>
                  </div>

                  {/* Last name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last name <span className="text-red-500">*</span></label>
                    <input value={form.lastName} onChange={e => setField("lastName", e.target.value)}
                      placeholder="e.g. Sharma"
                      className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3730a3] ${errors.lastName ? "border-red-400" : "border-slate-200"}`}/>
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone number <span className="text-red-500">*</span></label>
                  <input value={form.phone} onChange={e => setField("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3730a3] ${errors.phone ? "border-red-400" : "border-slate-200"}`}/>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email address <span className="text-red-500">*</span></label>
                  <input type="email" value={form.email} onChange={e => setField("email", e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3730a3] ${errors.email ? "border-red-400" : "border-slate-200"}`}/>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Preferred contact */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Preferred contact method <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-3">
                    {(["email","phone","both"] as const).map(opt => (
                      <button key={opt} onClick={() => setField("contactBy", opt)}
                        className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all capitalize ${
                          form.contactBy === opt ? "border-[#3730a3] bg-[#eef2ff] text-[#3730a3]" : "border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}>
                        {opt === "both" ? "Email & Phone" : opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {isFree && (
                  <div className="bg-[#fdf4ff] border border-pink-100 rounded-lg p-3 text-sm text-slate-600">
                    🎉 <strong>Free trial</strong> — no payment needed. We'll confirm your slot and reach out to you.
                  </div>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                  <Button onClick={handleDetailsNext} className="flex-1 bg-[#3730a3] text-white">
                    {isFree ? "Confirm trial booking" : "Continue to payment"}
                  </Button>
                </div>
              </div>
            )}

            {/* ── Step 3: Review + pay (paid only) ────────────────────── */}
            {step === 3 && (
              <div className="space-y-5">
                <h2 className="font-semibold text-slate-800 flex items-center gap-2"><CreditCard size={16}/> Review & pay</h2>

                <div className="bg-slate-50 rounded-lg p-4 space-y-3 text-sm">
                  {[
                    ["Tutor", tutor.displayName],
                    ["Lesson",     `${lessonType.label} (${lessonType.duration} min)`],
                    ["Date & time",`${selectedSlot} IST`],
                    ["Name",       [form.firstName, form.middleName, form.lastName].filter(Boolean).join(" ")],
                    ["Contact",    form.contactBy === "email" ? form.email : form.contactBy === "phone" ? form.phone : `${form.email} / ${form.phone}`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <span className="text-slate-500 flex-shrink-0">{label}</span>
                      <span className="font-medium text-slate-800 text-right">{value}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span className="text-[#3730a3]">₹{lessonType.price}</span>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                  💳 Razorpay integration in progress — UPI, cards, Paytm & net banking coming soon. No payment will be charged right now.
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">Back</Button>
                  <Button onClick={confirm} className="flex-1 bg-[#3730a3] text-white">Confirm Booking (Demo)</Button>
                </div>
              </div>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
