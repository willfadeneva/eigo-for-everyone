import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, BookOpen, Clock, CheckCircle, MessageCircle } from "lucide-react";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // TODO: fetch real tutor name
  return {
    title: `Tutor Profile | Eigo for Everyone`,
    description: "Book a 1-on-1 English lesson with a verified native tutor.",
  };
}

// TODO: replace with prisma query
const MOCK_TUTOR = {
  id: "t1", displayName: "Sarah Mitchell", tagline: "Business English & IELTS specialist",
  bio: `Hi! I'm Sarah, a native English teacher from New York with 8+ years of experience helping students achieve their English goals.

I specialize in Business English for working professionals and IELTS coaching. My students have consistently scored 7.0–8.5 on IELTS. I use a conversational, structured approach — real-world practice first, grammar second.

Whether you need to ace an exam, lead meetings in English, or just speak confidently, I'll build a plan around your goals. Let's start with a free consultation trial!`,
  hourlyRate: 1200, trialRate: 0, currency: "INR",
  avgRating: 4.98, totalReviews: 312, totalLessons: 2840,
  specialties: ["Business","IELTS","Conversation","Writing","Presentations"],
  certifications: ["CELTA","TESOL","IELTS Examiner (retired)"],
  yearsExperience: 8, responseTimeHours: 1,
  nativeLang: "English", teachingLangs: ["English"],
};

const MOCK_REVIEWS = [
  { author: "Rahul G.", city: "Mumbai",    rating: 5, date: "March 2026",  comment: "Sarah is incredible. My IELTS went from 6.5 to 8.0 in 3 months of lessons with her. Highly structured, always on time, super patient." },
  { author: "Priya S.", city: "Delhi",     rating: 5, date: "Feb 2026",    comment: "Best business English tutor I've found. She helped me prepare for a client presentation and I got compliments on my English for the first time." },
  { author: "Anil K.",  city: "Bangalore", rating: 5, date: "Jan 2026",    comment: "Very professional and patient. She understood my weak areas immediately and we worked on them systematically. 10/10 would recommend." },
];

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const SLOTS = ["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];
const AVAILABLE = new Set(["Mon-09:00","Mon-10:00","Mon-15:00","Mon-16:00","Tue-09:00","Tue-10:00","Tue-11:00","Wed-14:00","Wed-15:00","Thu-09:00","Thu-10:00","Fri-09:00","Fri-10:00","Fri-11:00","Fri-15:00","Sat-10:00","Sat-11:00"]);

export default function TutorProfilePage({ params }: { params: { id: string } }) {
  const t = MOCK_TUTOR;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0 space-y-8">

          {/* Hero */}
          <div className="flex gap-5 items-start">
            <div className="w-20 h-20 rounded-full bg-[#3730a3] flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
              {t.displayName.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900">{t.displayName}</h1>
              <p className="text-slate-500 mt-0.5">{t.tagline}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <strong className="text-slate-800">{t.avgRating}</strong> ({t.totalReviews} reviews)
                </span>
                <span className="flex items-center gap-1"><BookOpen size={14} /> {t.totalLessons.toLocaleString()} lessons</span>
                <span className="flex items-center gap-1"><Clock size={14} /> Replies in {t.responseTimeHours}h</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {t.specialties.map(s => (
                  <Badge key={s} className="bg-[#eef2ff] text-[#3730a3] text-xs">{s}</Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* About */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">About me</h2>
            {t.bio.split("\n\n").map((p, i) => (
              <p key={i} className="text-slate-600 leading-relaxed mb-3">{p}</p>
            ))}
          </div>

          <Separator />

          {/* Credentials */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Certifications</h2>
            <div className="flex flex-wrap gap-2">
              {t.certifications.map(c => (
                <span key={c} className="flex items-center gap-1.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
                  <CheckCircle size={13} className="text-green-500" /> {c}
                </span>
              ))}
            </div>
          </div>

          <Separator />

          {/* Availability */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Weekly availability <span className="text-sm font-normal text-slate-400">(IST)</span></h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr>
                    <th className="w-16 text-left text-slate-400 font-normal pb-2">Time</th>
                    {DAYS.map(d => <th key={d} className="text-center text-slate-500 font-medium pb-2 px-1">{d}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {SLOTS.map(slot => (
                    <tr key={slot}>
                      <td className="text-slate-400 py-0.5 pr-2 whitespace-nowrap">{slot}</td>
                      {DAYS.map(d => (
                        <td key={d} className="px-1 py-0.5 text-center">
                          {AVAILABLE.has(`${d}-${slot}`) ? (
                            <span className="inline-block w-6 h-5 rounded bg-[#3730a3]/10 border border-[#3730a3]/20" title="Available" />
                          ) : (
                            <span className="inline-block w-6 h-5 rounded bg-slate-50" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-2">■ = Available slot · Select a time when booking</p>
          </div>

          <Separator />

          {/* Reviews */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Reviews <span className="text-slate-400 font-normal text-sm">({t.totalReviews})</span>
            </h2>
            <div className="space-y-4">
              {MOCK_REVIEWS.map((r, i) => (
                <div key={i} className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#3730a3] text-white text-xs font-bold flex items-center justify-center">
                        {r.author.charAt(0)}
                      </div>
                      <span className="font-medium text-sm text-slate-800">{r.author}</span>
                      <span className="text-xs text-slate-400">{r.city}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({length: r.rating}).map((_,j) => <Star key={j} size={11} className="fill-amber-400 text-amber-400" />)}
                      <span className="text-xs text-slate-400 ml-1">{r.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Sticky sidebar ── */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-24">
            <Card className="border-2 border-[#3730a3]/10 shadow-lg">
              <CardContent className="p-5 space-y-4">
                <div>
                  <div className="text-2xl font-bold text-[#3730a3]">₹{t.hourlyRate.toLocaleString()}</div>
                  <div className="text-xs text-slate-400">per 50-min lesson</div>
                </div>
                {t.trialRate && (
                  <div className="bg-[#fdf2f8] border border-[#f9a8d4] rounded-lg p-3">
                    <div className="text-sm font-semibold text-[#831843]">Trial lesson — FREE 🎉</div>
                    <div className="text-xs text-[#9f1239] mt-0.5">25 min · One per student</div>
                  </div>
                )}

                <Link href={`/book/${t.id}?type=trial`} className="block">
                  <Button className="w-full bg-[#f9a8d4] hover:bg-[#f472b6] text-[#831843] font-semibold">
                    Book Free Trial
                  </Button>
                </Link>
                <Link href={`/book/${t.id}`} className="block">
                  <Button variant="outline" className="w-full border-[#3730a3] text-[#3730a3] hover:bg-[#eef2ff]">
                    Book 50-min lesson
                  </Button>
                </Link>
                <Link href={`/messages?tutor=${t.id}`} className="block">
                  <Button variant="ghost" className="w-full text-slate-500 text-sm flex items-center gap-2">
                    <MessageCircle size={15} /> Message tutor
                  </Button>
                </Link>

                <Separator />

                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Experience</span>
                    <span className="font-medium">{t.yearsExperience} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Response time</span>
                    <span className="font-medium">~{t.responseTimeHours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Lessons taught</span>
                    <span className="font-medium">{t.totalLessons.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
