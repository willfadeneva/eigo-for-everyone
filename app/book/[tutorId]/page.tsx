"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, Clock, ChevronRight, CalendarDays, CreditCard } from "lucide-react";

type LessonType = { id: string; label: string; duration: number; price: number; badge?: string };
const LESSON_TYPES: LessonType[] = [
  { id: "trial",  label: "Trial lesson",    duration: 25, price:  400, badge: "First lesson discount" },
  { id: "50min",  label: "Regular lesson",  duration: 50, price: 1200 },
  { id: "80min",  label: "Extended lesson", duration: 80, price: 1800 },
];

const DAYS = ["Mon 17","Tue 18","Wed 19","Thu 20","Fri 21","Sat 22","Sun 23"];
const TIMES = ["09:00","10:00","11:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];
const FREE_SLOTS = new Set(["Mon 17-09:00","Mon 17-15:00","Tue 18-10:00","Tue 18-11:00","Wed 19-14:00","Wed 19-15:00","Thu 20-09:00","Fri 21-10:00","Sat 22-10:00","Sat 22-11:00"]);

const STEPS = ["Lesson type","Date & time","Review","Payment"];

export default function BookPage({ params }: { params: { tutorId: string } }) {
  const [step, setStep] = useState(0);
  const [lessonType, setLessonType] = useState<LessonType>(LESSON_TYPES[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  function confirm() { setBooked(true); }

  if (booked) return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Booking confirmed! (Demo)</h1>
        <p className="text-slate-500 mb-6">Your lesson with Sarah Mitchell is scheduled. Payment will be collected via Razorpay — coming soon.</p>
        <Link href="/dashboard/student"><Button className="bg-[#3730a3] text-white">Go to dashboard</Button></Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href={`/tutors/${params.tutorId}`} className="text-sm text-[#3730a3] hover:underline mb-6 block">
          ← Back to profile
        </Link>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Book a lesson with Sarah Mitchell</h1>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8 text-sm">
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

            {/* Step 0: Lesson type */}
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
                      <div className="text-xl font-bold text-[#3730a3]">₹{lt.price}</div>
                    </div>
                  </div>
                ))}
                <Button onClick={() => setStep(1)} className="w-full bg-[#3730a3] text-white mt-2">
                  Continue <ChevronRight size={16} className="ml-1"/>
                </Button>
              </div>
            )}

            {/* Step 1: Date & time */}
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

            {/* Step 2: Review */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-slate-800">Review your booking</h2>
                <div className="bg-slate-50 rounded-lg p-4 space-y-3 text-sm">
                  {[
                    ["Tutor", "Sarah Mitchell"],
                    ["Lesson", `${lessonType.label} (${lessonType.duration} min)`],
                    ["Date & time", `${selectedSlot} IST`],
                    ["Price", `₹${lessonType.price}`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-slate-500">{label}</span>
                      <span className="font-medium text-slate-800">{value}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between font-bold text-base">
                    <span>Total</span><span className="text-[#3730a3]">₹{lessonType.price}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                  <Button onClick={() => setStep(3)} className="flex-1 bg-[#3730a3] text-white">Confirm & Pay</Button>
                </div>
              </div>
            )}

            {/* Step 3: Payment stub */}
            {step === 3 && (
              <div className="space-y-5 text-center">
                <div className="w-14 h-14 rounded-full bg-[#eef2ff] flex items-center justify-center mx-auto">
                  <CreditCard size={28} className="text-[#3730a3]"/>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Payment coming soon</h2>
                  <p className="text-slate-500 text-sm mt-2">
                    Razorpay UPI, cards, net banking & Paytm will be enabled shortly.<br/>
                    For now, confirm your booking as a demo reservation.
                  </p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                  💳 Razorpay integration in progress — no payment will be charged
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
