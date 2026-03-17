"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Play, BookOpen, Users, TrendingUp, CheckCircle, ArrowRight, Mic, Globe, Award } from "lucide-react";

const FEATURED_TUTORS = [
  { id:"t1", name:"Sarah M.",   flag:"🇺🇸", rating:4.98, avatar:"https://randomuser.me/api/portraits/women/44.jpg", specialty:"IELTS · Business", rate:"₹1,200" },
  { id:"t2", name:"James O.",   flag:"🇬🇧", rating:4.95, avatar:"https://randomuser.me/api/portraits/men/32.jpg",   specialty:"TOEFL · Academic", rate:"₹1,400" },
  { id:"t3", name:"Emily C.",   flag:"🇨🇦", rating:4.99, avatar:"https://randomuser.me/api/portraits/women/68.jpg", specialty:"Kids · Beginners",  rate:"₹900"   },
  { id:"t4", name:"David T.",   flag:"🇦🇺", rating:4.88, avatar:"https://randomuser.me/api/portraits/men/75.jpg",   specialty:"Spoken · Accent",   rate:"₹800"   },
  { id:"t5", name:"Priya W.",   flag:"🇬🇧", rating:4.93, avatar:"https://randomuser.me/api/portraits/women/26.jpg", specialty:"IELTS · Writing",   rate:"₹1,100" },
  { id:"t6", name:"Michael R.", flag:"🇺🇸", rating:4.91, avatar:"https://randomuser.me/api/portraits/men/52.jpg",   specialty:"Business · C-Suite", rate:"₹1,800" },
];

const CATEGORIES = [
  { icon:"📊", label:"Business English", color:"bg-[#FBE85F] text-[#78350f]" },
  { icon:"🎓", label:"IELTS / TOEFL",    color:"bg-[#AFF035] text-[#166534]" },
  { icon:"👶", label:"Kids English",     color:"bg-[#49D1FD] text-[#0369a1]" },
  { icon:"💬", label:"Conversation",     color:"bg-[#F35555] text-white"      },
  { icon:"✍️", label:"Academic Writing", color:"bg-[#FAB657] text-[#7c2d12]"  },
  { icon:"🎤", label:"Pronunciation",    color:"bg-[#8774DB] text-white"      },
];

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="min-h-screen bg-white">

      {/* ═══════════════════════════════════════════
          HERO — FluentWay dark purple style
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0D0A1E] min-h-[88vh] flex items-center">

        {/* Purple radial glow behind left text */}
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#5B21B6]/40 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[120px] pointer-events-none" />
        {/* Right glow */}
        <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-[#7C3AED]/20 rounded-full -translate-y-1/2 blur-[100px] pointer-events-none" />

        {/* Big decorative fuzzy letter E — left */}
        <div className="absolute left-[28%] top-1/2 -translate-y-1/2 text-[360px] font-black text-[#EC4899]/20 select-none pointer-events-none leading-none blur-[2px] hidden lg:block" style={{fontStyle:"italic"}}>E</div>
        {/* Big decorative fuzzy letter N — bottom right */}
        <div className="absolute right-4 bottom-8 text-[180px] font-black text-[#EC4899]/25 select-none pointer-events-none leading-none blur-[1px] hidden lg:block" style={{fontStyle:"italic"}}>N</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid lg:grid-cols-2 gap-8 items-center relative z-10 w-full">

          {/* Left — copy */}
          <div className="space-y-6">
            {/* Intake badge */}
            <div className="inline-flex items-center gap-2 bg-[#8774DB]/30 border border-[#8774DB]/50 rounded-full px-4 py-1.5 text-sm font-semibold text-[#C4B5FD]">
              ✨ Enrol now — limited spots
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
              Unlock Your<br />
              Future with<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F472B6] to-[#A78BFA]">
                Fluent English
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-[#94A3B8] text-lg leading-relaxed max-w-md">
              Join our vibrant community and master English for academic, professional, and personal growth — starting from <strong className="text-white">₹700/hr</strong>.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/tutors">
                <Button size="lg" className="bg-[#8774DB] hover:bg-[#7261C8] text-white px-8 py-4 text-base rounded-full font-bold shadow-lg shadow-[#8774DB]/40 w-full sm:w-auto">
                  Book a Free Trial
                </Button>
              </Link>
              <Link href="/tutors">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-base rounded-full font-semibold w-full sm:w-auto backdrop-blur-sm">
                  Explore Tutors
                </Button>
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {FEATURED_TUTORS.slice(0,4).map(tr => (
                  <img key={tr.id} src={tr.avatar} alt={tr.name}
                    className="w-9 h-9 rounded-full border-2 border-[#0D0A1E] object-cover" />
                ))}
              </div>
              <p className="text-sm text-[#94A3B8]">
                <span className="text-white font-bold">12,000+</span> students are already speaking confidently
              </p>
            </div>
          </div>

          {/* Right — character + floating cards */}
          <div className="relative hidden lg:flex items-center justify-center h-[520px]">

            {/* "Top Rated" floating badge — top left of card */}
            <div className="absolute top-8 left-8 bg-[#1E1040]/80 backdrop-blur border border-[#8774DB]/40 rounded-2xl px-4 py-3 z-30 shadow-xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🇬🇧</span>
                <span className="text-4xl font-black text-white">2025</span>
              </div>
              <p className="text-[#C4B5FD] text-xs font-semibold">Top Rated Course</p>
            </div>

            {/* Main tutor showcase card */}
            <div className="relative w-[280px] bg-[#1A1035]/80 backdrop-blur border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-20">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah"
                className="w-full h-52 object-cover object-top" />
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-white text-sm">🇺🇸 Sarah Mitchell</p>
                    <p className="text-[#94A3B8] text-xs">Business English · IELTS</p>
                  </div>
                  <span className="bg-[#AFF035] text-[#166534] text-xs font-black px-2 py-1 rounded-full">4.98 ★</span>
                </div>
                <div className="flex gap-1.5 flex-wrap mb-3">
                  {["IELTS","Business","Speaking"].map(s => (
                    <span key={s} className="bg-[#8774DB]/20 text-[#C4B5FD] text-xs px-2 py-0.5 rounded-full border border-[#8774DB]/30">{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">₹1,200<span className="text-xs font-normal text-[#64748b]">/50min</span></span>
                  <Link href="/tutors/t1">
                    <Button size="sm" className="bg-[#8774DB] text-white text-xs px-4 rounded-xl">Book Now</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Floating stat pill — active lessons */}
            <div className="absolute top-16 right-4 bg-[#FBE85F] rounded-2xl px-4 py-2.5 shadow-xl z-30">
              <p className="text-xs text-[#78350f] font-semibold">Active now</p>
              <p className="text-2xl font-black text-[#78350f]">2,841 🎉</p>
            </div>

            {/* Floating pill — free trial */}
            <div className="absolute bottom-20 right-0 bg-[#F35555] rounded-2xl px-4 py-2.5 shadow-xl z-30 text-white">
              <p className="text-xs font-semibold opacity-80">First lesson</p>
              <p className="text-xl font-black">FREE ✨</p>
            </div>

            {/* Bottom floating card — IELTS success */}
            <div className="absolute bottom-4 left-4 bg-[#1A1035]/90 backdrop-blur border border-white/10 rounded-2xl px-4 py-3 shadow-xl z-30">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏆</span>
                <div>
                  <p className="text-xs text-[#94A3B8]">This month</p>
                  <p className="text-sm font-bold text-white">840 scored IELTS 7.0+</p>
                </div>
              </div>
            </div>

            {/* Purple dot chat bubble — bottom right */}
            <div className="absolute bottom-8 right-[-8px] w-10 h-10 bg-[#8774DB] rounded-full flex items-center justify-center shadow-lg z-30">
              <span className="text-white text-xs font-bold">💬</span>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ═══════════════════════════════
          STATS BAR
      ═══════════════════════════════ */}
      <section className="border-y border-[#f0f0f0] bg-[#fafafa] py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { v:"2.8M+", l:"Lessons delivered",  color:"text-[#F35555]", bg:"bg-[#fff1f0]" },
            { v:"500+",  l:"Verified tutors",     color:"text-[#8774DB]", bg:"bg-[#f5f3ff]" },
            { v:"4.96★", l:"Average rating",      color:"text-[#FAB657]", bg:"bg-[#fff8ee]" },
            { v:"₹700",  l:"Starting price/hr",   color:"text-[#05b86b]", bg:"bg-[#f0fdf4]" },
          ].map(s => (
            <div key={s.l} className={`${s.bg} rounded-2xl p-4 text-center`}>
              <div className={`text-3xl font-black ${s.color}`}>{s.v}</div>
              <div className="text-xs text-[#64748b] mt-1 font-medium">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════
          CATEGORIES
      ═══════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] mb-2">What do you want to learn?</h2>
          <p className="text-[#64748b]">Pick your goal — we have an expert tutor for every need</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map(c => (
            <Link key={c.label} href="/tutors">
              <div className={`${c.color} rounded-2xl p-4 text-center cursor-pointer hover:scale-105 transition-transform`}>
                <div className="text-3xl mb-2">{c.icon}</div>
                <div className="text-xs font-bold leading-tight">{c.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════
          FEATURED TUTORS
      ═══════════════════════════════ */}
      <section className="bg-[#fafafa] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-[#0f172a]">Top-rated tutors</h2>
              <p className="text-[#64748b] mt-1">Hand-picked, verified, loved by students</p>
            </div>
            <Link href="/tutors" className="text-[#8774DB] font-bold text-sm hover:underline hidden sm:flex items-center gap-1">
              View all 500+ <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED_TUTORS.map((tr, i) => {
              const cardColors = [
                "border-[#FBE85F]/60 hover:shadow-[#FBE85F]/40",
                "border-[#AFF035]/60 hover:shadow-[#AFF035]/40",
                "border-[#49D1FD]/60 hover:shadow-[#49D1FD]/40",
                "border-[#F35555]/60 hover:shadow-[#F35555]/40",
                "border-[#FAB657]/60 hover:shadow-[#FAB657]/40",
                "border-[#8774DB]/60 hover:shadow-[#8774DB]/40",
              ];
              return (
                <div key={tr.id} className={`bg-white rounded-2xl border-2 ${cardColors[i]} p-5 hover:shadow-lg transition-all`}>
                  <div className="flex items-center gap-3 mb-4">
                    <img src={tr.avatar} alt={tr.name} className="w-14 h-14 rounded-2xl object-cover" />
                    <div className="flex-1">
                      <div className="font-bold text-[#0f172a]">{tr.flag} {tr.name}</div>
                      <div className="text-xs text-[#64748b]">{tr.specialty}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-[#0f172a]">{tr.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-[#8774DB] text-sm">{tr.rate}</div>
                      <div className="text-xs text-[#64748b]">/50min</div>
                    </div>
                  </div>
                  <Link href={`/tutors/${tr.id}`}>
                    <Button className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-xl text-sm font-bold">
                      View Profile
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] mb-2">Start in 3 simple steps</h2>
          <p className="text-[#64748b]">From zero to fluent — faster than you think</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line desktop */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-gradient-to-r from-[#FBE85F] via-[#AFF035] to-[#49D1FD]" />
          {[
            { n:"01", icon:"🔍", title:"Browse tutors", desc:"Filter by goal, budget, language, rating — find your perfect match in minutes.", color:"bg-[#FBE85F]", text:"text-[#78350f]" },
            { n:"02", icon:"📅", title:"Book a session", desc:"Pick any available slot. Pay with UPI, Paytm, net banking or card — instant confirmation.", color:"bg-[#AFF035]", text:"text-[#166534]" },
            { n:"03", icon:"🎓", title:"Learn & improve", desc:"Join your live 1-on-1 video lesson in-browser. Track your progress after every session.", color:"bg-[#49D1FD]", text:"text-[#0369a1]" },
          ].map(step => (
            <div key={step.n} className="text-center relative z-10">
              <div className={`w-20 h-20 ${step.color} rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-md`}>
                <span className="text-4xl">{step.icon}</span>
              </div>
              <div className={`text-xs font-black ${step.text} uppercase tracking-widest mb-1`}>{step.n}</div>
              <h3 className="font-black text-[#0f172a] text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-[#64748b] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════ */}
      <section className="bg-[#0f172a] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-10">What students say 💬</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name:"Rahul G.",   city:"Mumbai",    text:"My IELTS went from 6.5 to 8.0 in 3 months! Sarah is incredible — she knew exactly what I needed.", avatar:"https://randomuser.me/api/portraits/men/32.jpg",   color:"bg-[#FBE85F]", tc:"text-[#78350f]" },
              { name:"Anita P.",   city:"Bangalore", text:"My daughter loves every single lesson with Emily. She's patient, fun, and super effective with kids.", avatar:"https://randomuser.me/api/portraits/women/68.jpg", color:"bg-[#AFF035]", tc:"text-[#166534]" },
              { name:"Vikram S.",  city:"Delhi",     text:"Got promoted to Senior Manager after 3 months of Business English coaching. Best investment ever.", avatar:"https://randomuser.me/api/portraits/men/75.jpg",   color:"bg-[#49D1FD]", tc:"text-[#0369a1]" },
            ].map(r => (
              <div key={r.name} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className={`${r.color} rounded-2xl p-4 mb-4`}>
                  <p className={`${r.tc} font-medium text-sm leading-relaxed`}>"{r.text}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-white font-semibold text-sm">{r.name}</p>
                    <p className="text-white/50 text-xs">{r.city}</p>
                  </div>
                  <div className="ml-auto flex">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          CTA BAND
      ═══════════════════════════════ */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#FBE85F] via-[#FAB657] to-[#F35555]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-[#0f172a] mb-4 leading-tight">
            Your first lesson<br />is completely FREE 🎁
          </h2>
          <p className="text-[#0f172a]/70 mb-8 text-lg">No credit card. No commitment. Just great English.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/tutors">
              <Button size="lg" className="bg-[#0f172a] hover:bg-[#1e293b] text-white px-10 py-4 text-base rounded-2xl font-black shadow-xl">
                Find My Tutor — FREE →
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="border-2 border-[#0f172a] text-[#0f172a] px-8 py-4 text-base rounded-2xl font-bold">
                Create free account
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
