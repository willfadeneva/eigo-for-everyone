import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Star, Video, Calendar, Shield, BookOpen, Users, TrendingUp, ChevronRight } from "lucide-react";

const FEATURED_TUTORS = [
  { id:"t1", name:"Sarah Mitchell",  flag:"🇺🇸", tagline:"Business English & IELTS specialist",   rating:4.98, reviews:312,  lessons:2840, rate:"₹1,200", avatar:"https://randomuser.me/api/portraits/women/44.jpg", specialties:["Business","IELTS","Conversation"] },
  { id:"t2", name:"James O'Brien",   flag:"🇬🇧", tagline:"Oxford grad · Academic writing & TOEFL", rating:4.95, reviews:189,  lessons:1560, rate:"₹1,400", avatar:"https://randomuser.me/api/portraits/men/32.jpg",   specialties:["Academic","TOEFL","Grammar"] },
  { id:"t3", name:"Emily Chen",      flag:"🇨🇦", tagline:"Kids & teens English · Patient & fun!",  rating:4.99, reviews:421,  lessons:3200, rate:"₹900",   avatar:"https://randomuser.me/api/portraits/women/68.jpg", specialties:["Kids","Beginners","Speaking"] },
];

export default function HomePage() {
  const t = useTranslations("home");

  const HOW_IT_WORKS = [
    { step:"1", icon:Search,   title:t("step1Title"), desc:t("step1Desc") },
    { step:"2", icon:Calendar, title:t("step2Title"), desc:t("step2Desc") },
    { step:"3", icon:Video,    title:t("step3Title"), desc:t("step3Desc") },
  ];

  const STATS = [
    { value:"2.8M+", label:t("statsLessons") },
    { value:"500+",  label:t("statsTutors") },
    { value:"4.96",  label:t("statsRating") },
    { value:"42",    label:t("statsCountries") },
  ];

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-[#eef2ff] via-white to-[#fdf2f8] py-20 sm:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-[#e0e7ff] rounded-full px-4 py-1.5 text-sm text-[#3730a3] font-medium mb-6 shadow-sm">
            <Shield size={14} className="text-[#3730a3]" /> {t("heroTag")}
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 leading-tight mb-6">
            {t("heroTitle")}
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tutors">
              <Button size="lg" className="bg-[#3730a3] hover:bg-[#312e81] text-white px-8 py-4 text-base rounded-full w-full sm:w-auto">
                {t("findTutor")} <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="border-[#3730a3] text-[#3730a3] px-8 py-4 text-base rounded-full w-full sm:w-auto">
                {t("howItWorks")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-[#3730a3] py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {STATS.map(s => (
            <div key={s.label}>
              <div className="text-3xl font-bold">{s.value}</div>
              <div className="text-sm text-indigo-200 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured tutors ── */}
      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">{t("featuredTitle")}</h2>
            <p className="text-slate-500 mt-1">{t("featuredSub")}</p>
          </div>
          <Link href="/tutors" className="text-[#3730a3] font-medium text-sm hidden sm:block hover:underline">
            {t("viewAll")}
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_TUTORS.map(t2 => (
            <Card key={t2.id} className="hover:shadow-lg transition-shadow border border-slate-100">
              <CardContent className="p-5">
                <div className="flex gap-4 mb-4">
                  <img src={t2.avatar} alt={t2.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#e0e7ff]" />
                  <div>
                    <div className="font-semibold text-slate-900">{t2.flag} {t2.name}</div>
                    <div className="text-sm text-slate-500">{t2.tagline}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium text-slate-700">{t2.rating}</span>
                      <span className="text-xs text-slate-400">({t2.reviews})</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {t2.specialties.map(s => (
                    <Badge key={s} className="bg-[#eef2ff] text-[#3730a3] text-xs">{s}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#3730a3]">{t2.rate}<span className="text-xs font-normal text-slate-400"> /50min</span></span>
                  <Link href={`/tutors/${t2.id}`}>
                    <Button size="sm" className="bg-[#3730a3] text-white text-xs">{t("findTutor")}</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-6 sm:hidden">
          <Link href="/tutors" className="text-[#3730a3] font-medium">{t("viewAll")}</Link>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">{t("howTitle")}</h2>
          <p className="text-slate-500 mt-2">{t("howSub")}</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map(step => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#eef2ff] flex items-center justify-center mx-auto mb-4">
                  <Icon size={28} className="text-[#3730a3]" />
                </div>
                <div className="text-xs font-bold text-[#3730a3] uppercase tracking-widest mb-1">Step {step.step}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-[#3730a3] to-[#6366f1]">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t("ctaTitle")}</h2>
        <p className="text-indigo-200 mb-8 max-w-md mx-auto">{t("ctaDesc")}</p>
        <Link href="/tutors">
          <Button size="lg" className="bg-white text-[#3730a3] hover:bg-slate-50 px-10 py-4 text-base rounded-full font-semibold">
            {t("ctaButton")}
          </Button>
        </Link>
      </section>
    </div>
  );
}
