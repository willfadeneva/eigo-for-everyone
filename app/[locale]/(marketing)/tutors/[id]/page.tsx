import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, BookOpen, Clock, CheckCircle, MessageCircle } from "lucide-react";

// ── Tutor registry — MUST be defined before generateMetadata ─────────────────
const ALL_TUTORS: Record<string, any> = {
  t1: {
    id:"t1", displayName:"Sarah Mitchell", flag:"🇺🇸",
    tagline:"Business English & IELTS specialist",
    avatarUrl:"https://randomuser.me/api/portraits/women/44.jpg",
    hourlyRate:1200, trialRate:0, currency:"INR",
    avgRating:4.98, totalReviews:312, totalLessons:2840,
    specialties:["Business","IELTS","Conversation","Writing","Presentations"],
    certifications:["CELTA","TESOL","IELTS Examiner (retired)"],
    yearsExperience:8, responseTimeHours:1,
    bio:`Hi! I'm Sarah, a native English teacher from New York with 8+ years of experience. I specialize in Business English and IELTS coaching — my students have consistently scored 7.0–8.5. Real-world practice first, grammar second. Let's start with a free trial!`,
    reviews:[
      { author:"Rahul G.", city:"Mumbai",    rating:5, date:"March 2026", comment:"My IELTS went from 6.5 to 8.0 in 3 months. Highly structured, always on time, super patient." },
      { author:"Priya S.", city:"Delhi",     rating:5, date:"Feb 2026",   comment:"Best business English tutor I've found. Got compliments on my English for the first time!" },
      { author:"Anil K.",  city:"Bangalore", rating:5, date:"Jan 2026",   comment:"Very professional. She understood my weak areas immediately. 10/10 would recommend." },
    ],
  },
  t2: {
    id:"t2", displayName:"James O'Brien", flag:"🇬🇧",
    tagline:"Oxford grad · Academic writing & TOEFL",
    avatarUrl:"https://randomuser.me/api/portraits/men/32.jpg",
    hourlyRate:1400, trialRate:0, currency:"INR",
    avgRating:4.95, totalReviews:189, totalLessons:1560,
    specialties:["Academic","TOEFL","Grammar","Writing","Research"],
    certifications:["Oxford DELTA","CELTA","TOEFL Certified Trainer"],
    yearsExperience:10, responseTimeHours:2,
    bio:`Hi, I'm James — Oxford graduate and experienced English trainer based in London. I specialize in academic writing, TOEFL prep, and advanced grammar. I've helped 1,500+ students from India, Japan, and China achieve top scores. Structured, detailed, and results-focused.`,
    reviews:[
      { author:"Meera N.", city:"Chennai",   rating:5, date:"March 2026", comment:"James helped me score 112 on TOEFL. His academic writing sessions are incredibly structured." },
      { author:"Karan M.", city:"Pune",      rating:5, date:"Feb 2026",   comment:"Best grammar explanations I've ever had. Finally understood complex tenses after years of confusion." },
      { author:"Sita R.",  city:"Hyderabad", rating:5, date:"Jan 2026",   comment:"Top-notch tutor. Very patient and thorough. My university essay got accepted!" },
    ],
  },
  t3: {
    id:"t3", displayName:"Emily Chen", flag:"🇨🇦",
    tagline:"Kids & teens English · Patient & fun!",
    avatarUrl:"https://randomuser.me/api/portraits/women/68.jpg",
    hourlyRate:900, trialRate:0, currency:"INR",
    avgRating:4.99, totalReviews:421, totalLessons:3200,
    specialties:["Kids","Beginners","Speaking","Phonics","Teens"],
    certifications:["TEYL (Young Learners)","CELTA","Child Psychology Certificate"],
    yearsExperience:7, responseTimeHours:1,
    bio:`Hi! I'm Emily, a Canadian English teacher who loves working with kids and teens. I use games, stories, and interactive activities to make learning fun. My students go from shy beginners to confident speakers. Ages 5–17 welcome!`,
    reviews:[
      { author:"Anita P.", city:"Mumbai",    rating:5, date:"March 2026", comment:"My 8-year-old daughter looks forward to every lesson. Emily makes it so much fun!" },
      { author:"Raj K.",   city:"Delhi",     rating:5, date:"Feb 2026",   comment:"My son went from hating English to loving it after just 2 months with Emily." },
      { author:"Divya M.", city:"Bangalore", rating:5, date:"Jan 2026",   comment:"The most patient teacher I've seen. My teenager is actually engaged now!" },
    ],
  },
  t4: {
    id:"t4", displayName:"David Thompson", flag:"🇦🇺",
    tagline:"Spoken English · Accent reduction",
    avatarUrl:"https://randomuser.me/api/portraits/men/75.jpg",
    hourlyRate:800, trialRate:0, currency:"INR",
    avgRating:4.88, totalReviews:98, totalLessons:820,
    specialties:["Conversation","Pronunciation","Accent","Speaking","Fluency"],
    certifications:["CELTA","Speech & Pronunciation Diploma"],
    yearsExperience:5, responseTimeHours:3,
    bio:`G'day! I'm David from Melbourne. I focus on spoken English and accent reduction — helping professionals sound clear and confident in meetings, presentations, and daily life. If you want to speak English the way natives do, I'm your guy.`,
    reviews:[
      { author:"Vikram S.", city:"Bangalore", rating:5, date:"March 2026", comment:"My accent improved dramatically. Colleagues actually notice the difference!" },
      { author:"Pooja K.",  city:"Mumbai",    rating:5, date:"Feb 2026",   comment:"Very practical sessions — no boring theory, just real conversation practice." },
      { author:"Arjun T.",  city:"Pune",      rating:4, date:"Jan 2026",   comment:"Great teacher, very encouraging. Helped me feel less nervous speaking in meetings." },
    ],
  },
  t5: {
    id:"t5", displayName:"Priya Williams", flag:"🇬🇧",
    tagline:"IELTS 8.5 scorer · 5 years coaching",
    avatarUrl:"https://randomuser.me/api/portraits/women/26.jpg",
    hourlyRate:1100, trialRate:0, currency:"INR",
    avgRating:4.93, totalReviews:156, totalLessons:1340,
    specialties:["IELTS","Academic","Writing","Reading","Listening"],
    certifications:["CELTA","IELTS Band 8.5","British Council Certified"],
    yearsExperience:5, responseTimeHours:2,
    bio:`Hi! I'm Priya — I scored 8.5 on IELTS and have been coaching students for 5 years. I know exactly what examiners look for and how to get you there. Writing and Reading are my specialties. Average student improvement: +1.5 bands.`,
    reviews:[
      { author:"Suresh M.", city:"Chennai",  rating:5, date:"March 2026", comment:"Went from 6.0 to 7.5 in 8 weeks! Priya's writing templates are gold." },
      { author:"Neha R.",   city:"Delhi",    rating:5, date:"Feb 2026",   comment:"Best IELTS coach. She predicted 3 of my actual exam topics." },
      { author:"Amit P.",   city:"Mumbai",   rating:5, date:"Jan 2026",   comment:"Very systematic approach. I finally understand academic writing structure." },
    ],
  },
  t6: {
    id:"t6", displayName:"Michael Ross", flag:"🇺🇸",
    tagline:"Corporate trainer · C-suite presentations",
    avatarUrl:"https://randomuser.me/api/portraits/men/52.jpg",
    hourlyRate:1800, trialRate:0, currency:"INR",
    avgRating:4.91, totalReviews:74, totalLessons:590,
    specialties:["Business","Presentations","Negotiation","Leadership","Executive"],
    certifications:["MBA (Finance)","Executive Communication Coach","CELTA"],
    yearsExperience:12, responseTimeHours:4,
    bio:`Former Wall Street analyst turned executive English coach. I've trained C-suite leaders at Fortune 500 companies. If you need to command a boardroom, negotiate deals, or pitch investors — this is your course. Premium, results-driven, no fluff.`,
    reviews:[
      { author:"Rohit A.", city:"Mumbai",    rating:5, date:"March 2026", comment:"Michael transformed my presentation skills. Got promoted 3 months later." },
      { author:"Sana K.",  city:"Bangalore", rating:5, date:"Feb 2026",   comment:"Worth every rupee. His negotiation English module is unlike anything else." },
      { author:"Dev P.",   city:"Delhi",     rating:5, date:"Jan 2026",   comment:"I now lead international calls with full confidence. Incredible coach." },
    ],
  },
  t7: {
    id:"t7", displayName:"Anna Kowalski", flag:"🇵🇱",
    tagline:"Grammar focus · Beginners welcome",
    avatarUrl:"https://randomuser.me/api/portraits/women/14.jpg",
    hourlyRate:700, trialRate:0, currency:"INR",
    avgRating:4.85, totalReviews:63, totalLessons:510,
    specialties:["Grammar","Beginners","Foundation","Writing","ESL"],
    certifications:["CELTA","MA in English Linguistics"],
    yearsExperience:4, responseTimeHours:2,
    bio:`Hi! I'm Anna from Poland — I know exactly how hard it is to learn English because I did it myself! I specialize in grammar fundamentals and am super patient with beginners. No judgment, just progress.`,
    reviews:[
      { author:"Geeta R.", city:"Pune",    rating:5, date:"March 2026", comment:"Anna is so patient! I was embarrassed about my English but she made me feel comfortable immediately." },
      { author:"Raj M.",   city:"Delhi",   rating:5, date:"Feb 2026",   comment:"Finally understand grammar rules that confused me for years. Very clear explanations." },
      { author:"Lata S.",  city:"Chennai", rating:4, date:"Jan 2026",   comment:"Good teacher, very encouraging. Highly recommend for absolute beginners." },
    ],
  },
  t8: {
    id:"t8", displayName:"Tom Nakamura", flag:"🇺🇸",
    tagline:"TOEFL 118 · Test prep specialist",
    avatarUrl:"https://randomuser.me/api/portraits/men/18.jpg",
    hourlyRate:1300, trialRate:0, currency:"INR",
    avgRating:4.96, totalReviews:201, totalLessons:1750,
    specialties:["TOEFL","Academic","IELTS","Reading","Speaking"],
    certifications:["TOEFL Score 118/120","CELTA","Stanford TESOL"],
    yearsExperience:9, responseTimeHours:1,
    bio:`Hi! I'm Tom — I scored 118/120 on TOEFL and have helped 200+ students crack 100+. I grew up bilingual (English/Japanese) so I understand the challenges Asian learners face. My approach is test-strategy-first: work smarter, not harder.`,
    reviews:[
      { author:"Hiroshi K.", city:"Bangalore", rating:5, date:"March 2026", comment:"Tom knows exactly what the test wants. I scored 108 on my first attempt!" },
      { author:"Anjali S.",  city:"Mumbai",    rating:5, date:"Feb 2026",   comment:"His speaking templates alone are worth the price. Amazing TOEFL prep." },
      { author:"Ravi P.",    city:"Hyderabad", rating:5, date:"Jan 2026",   comment:"Best TOEFL tutor on the platform. Very focused and no time wasted." },
    ],
  },
  t9: {
    id:"t9", displayName:"Lisa Fernandez", flag:"🇵🇭",
    tagline:"Fun conversational English for all ages",
    avatarUrl:"https://randomuser.me/api/portraits/women/57.jpg",
    hourlyRate:850, trialRate:0, currency:"INR",
    avgRating:4.90, totalReviews:118, totalLessons:980,
    specialties:["Conversation","Kids","Speaking","Fluency","Confidence"],
    certifications:["CELTA","Early Childhood Education Diploma"],
    yearsExperience:6, responseTimeHours:2,
    bio:`Hi! I'm Lisa from Manila — warm, fun, and passionate about English. I believe the best way to learn is through real conversation, laughter, and topics you actually care about. Whether you're 8 or 80, let's talk!`,
    reviews:[
      { author:"Pooja T.", city:"Mumbai",  rating:5, date:"March 2026", comment:"Lisa is so warm and encouraging. My confidence in speaking has skyrocketed!" },
      { author:"Rohan S.", city:"Pune",    rating:5, date:"Feb 2026",   comment:"My daughter loves her sessions. Super fun and engaging for kids." },
      { author:"Asha M.",  city:"Chennai", rating:5, date:"Jan 2026",   comment:"I used to freeze when speaking English. Not anymore! Thank you Lisa." },
    ],
  },
};

// ── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
  const { id } = await params;
  const t = ALL_TUTORS[id] ?? ALL_TUTORS["t1"];
  return {
    title: `${t.displayName} | Eigo for Everyone`,
    description: t.tagline,
  };
}

const DAYS  = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const SLOTS = ["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];
const AVAILABLE = new Set(["Mon-09:00","Mon-10:00","Mon-15:00","Mon-16:00","Tue-09:00","Tue-10:00","Tue-11:00","Wed-14:00","Wed-15:00","Thu-09:00","Thu-10:00","Fri-09:00","Fri-10:00","Fri-11:00","Fri-15:00","Sat-10:00","Sat-11:00"]);

export default async function TutorProfilePage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;
  const t = ALL_TUTORS[id] ?? ALL_TUTORS["t1"];
  const reviews = t.reviews ?? [];
  const tr = await getTranslations({ locale, namespace: "profile" });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0 space-y-8">

          {/* Hero */}
          <div className="flex gap-5 items-start">
            <img src={t.avatarUrl} alt={t.displayName} className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-2 border-[#fbcfe8]" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-[#0f172a]">{t.flag} {t.displayName}</h1>
              <p className="text-[#64748b] mt-0.5">{t.tagline}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 text-sm text-[#475569]">
                <span className="flex items-center gap-1">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <strong className="text-slate-800">{t.avgRating}</strong> ({t.totalReviews} reviews)
                </span>
                <span className="flex items-center gap-1"><BookOpen size={14} /> {t.totalLessons.toLocaleString()} lessons</span>
                <span className="flex items-center gap-1"><Clock size={14} /> Replies in {t.responseTimeHours}h</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {t.specialties.map((s: string) => (
                  <Badge key={s} className="bg-[#fce7f3] text-[#D946EF] text-xs">{s}</Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* About */}
          <div>
            <h2 className="text-lg font-semibold text-[#0f172a] mb-3">{ tr("aboutMe") }</h2>
            {t.bio.split("\n\n").map((p: string, i: number) => (
              <p key={i} className="text-[#475569] leading-relaxed mb-3">{p}</p>
            ))}
          </div>

          <Separator />

          {/* Certifications */}
          <div>
            <h2 className="text-lg font-semibold text-[#0f172a] mb-3">{ tr("certifications") }</h2>
            <div className="flex flex-wrap gap-2">
              {t.certifications.map((c: string) => (
                <span key={c} className="flex items-center gap-1.5 text-sm text-slate-700 bg-[#fafafa] border border-[#fce7f3] px-3 py-1.5 rounded-full">
                  <CheckCircle size={13} className="text-green-500" /> {c}
                </span>
              ))}
            </div>
          </div>

          <Separator />

          {/* Availability */}
          <div>
            <h2 className="text-lg font-semibold text-[#0f172a] mb-4">{ tr("availability") } <span className="text-sm font-normal text-slate-400">(IST)</span></h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr>
                    <th className="w-16 text-left text-slate-400 font-normal pb-2">Time</th>
                    {DAYS.map(d => <th key={d} className="text-center text-[#64748b] font-medium pb-2 px-1">{d}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {SLOTS.map(slot => (
                    <tr key={slot}>
                      <td className="text-slate-400 py-0.5 pr-2 whitespace-nowrap">{slot}</td>
                      {DAYS.map(d => (
                        <td key={d} className="px-1 py-0.5 text-center">
                          {AVAILABLE.has(`${d}-${slot}`) ? (
                            <span className="inline-block w-6 h-5 rounded bg-[#38BDF8]/10 border border-[#D946EF]/20" />
                          ) : (
                            <span className="inline-block w-6 h-5 rounded bg-[#fafafa]" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-2">{ tr("availabilityNote") }</p>
          </div>

          <Separator />

          {/* Reviews */}
          <div>
            <h2 className="text-lg font-semibold text-[#0f172a] mb-4">
              Reviews <span className="text-slate-400 font-normal text-sm">({t.totalReviews})</span>
            </h2>
            <div className="space-y-4">
              {reviews.map((r: any, i: number) => (
                <div key={i} className="bg-[#fafafa] rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <img src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${20 + i * 7}.jpg`} alt={r.author} className="w-7 h-7 rounded-full object-cover" />
                      <span className="font-medium text-sm text-slate-800">{r.author}</span>
                      <span className="text-xs text-slate-400">{r.city}</span>
                    </div>
                    <div className="flex items-center gap-1 pl-9 sm:pl-0">
                      {Array.from({length: r.rating}).map((_,j) => <Star key={j} size={11} className="fill-amber-400 text-amber-400" />)}
                      <span className="text-xs text-slate-400 ml-1">{r.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#475569]">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Sticky sidebar ── */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-24">
            <Card className="border-2 border-[#D946EF]/10 shadow-lg">
              <CardContent className="p-5 space-y-4">
                <div>
                  <div className="text-2xl font-bold text-[#D946EF]">₹{t.hourlyRate.toLocaleString()}</div>
                  <div className="text-xs text-slate-400">{ tr("perLesson") }</div>
                </div>
                <div className="bg-[#fdf2f8] border border-[#f9a8d4] rounded-lg p-3">
                  <div className="text-sm font-semibold text-[#9d174d]">{ tr("trialLabel") }</div>
                  <div className="text-xs text-[#9f1239] mt-0.5">{ tr("trialNote") }</div>
                </div>
                <Link href={`/book/${t.id}?type=trial`} className="block">
                  <Button className="w-full bg-[#f9a8d4] hover:bg-[#f472b6] text-[#9d174d] font-semibold">
                    Book Free Trial
                  </Button>
                </Link>
                <Link href={`/book/${t.id}`} className="block">
                  <Button variant="outline" className="w-full border-[#D946EF] text-[#D946EF] hover:bg-[#fce7f3]">
                    Book 50-min lesson
                  </Button>
                </Link>
                <Link href={`/messages?tutor=${t.id}`} className="block">
                  <Button variant="ghost" className="w-full text-[#64748b] text-sm flex items-center gap-2">
                    <MessageCircle size={15} /> Message tutor
                  </Button>
                </Link>
                <Separator />
                <div className="space-y-2 text-sm">
                  {[
                    ["Experience", `${t.yearsExperience} years`],
                    ["Response time", `~${t.responseTimeHours}h`],
                    ["Lessons taught", t.totalLessons.toLocaleString()],
                    ["Avg rating", `⭐ ${t.avgRating} / 5.0`],
                  ].map(([label, value]) => (
                    <div key={label as string} className="flex justify-between">
                      <span className="text-slate-400">{label}</span>
                      <span className="font-medium text-slate-700">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
