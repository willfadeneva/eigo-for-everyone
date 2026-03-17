import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { TutorCard } from "@/components/tutors/tutor-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tutors" });
  return { title: `${t("title")} | Eigo for Everyone` };
}

const MOCK_TUTORS = [
  { id:"t1", displayName:"Sarah Mitchell",  avatarUrl:"https://randomuser.me/api/portraits/women/44.jpg", tagline:"Business English & IELTS specialist",      hourlyRate:1200, avgRating:4.98, totalReviews:312,  totalLessons:2840, specialties:["Business","IELTS","Conversation"],  isFeatured:true,  responseTimeHours:1 },
  { id:"t2", displayName:"James O'Brien",   avatarUrl:"https://randomuser.me/api/portraits/men/32.jpg",   tagline:"Oxford grad · Academic writing & TOEFL",   hourlyRate:1400, avgRating:4.95, totalReviews:189,  totalLessons:1560, specialties:["Academic","TOEFL","Grammar"],       isFeatured:true,  responseTimeHours:2 },
  { id:"t3", displayName:"Emily Chen",      avatarUrl:"https://randomuser.me/api/portraits/women/68.jpg", tagline:"Kids & teens English · Patient & fun!",    hourlyRate:900,  avgRating:4.99, totalReviews:421,  totalLessons:3200, specialties:["Kids","Beginners","Speaking"],      isFeatured:true,  responseTimeHours:1 },
  { id:"t4", displayName:"David Thompson",  avatarUrl:"https://randomuser.me/api/portraits/men/75.jpg",   tagline:"Spoken English · Accent reduction",        hourlyRate:800,  avgRating:4.88, totalReviews:98,   totalLessons:820,  specialties:["Conversation","Pronunciation"],    isFeatured:false, responseTimeHours:3 },
  { id:"t5", displayName:"Priya Williams",  avatarUrl:"https://randomuser.me/api/portraits/women/26.jpg", tagline:"IELTS 8.5 scorer · 5 years coaching",     hourlyRate:1100, avgRating:4.93, totalReviews:156,  totalLessons:1340, specialties:["IELTS","Academic","Writing"],       isFeatured:false, responseTimeHours:2 },
  { id:"t6", displayName:"Michael Ross",    avatarUrl:"https://randomuser.me/api/portraits/men/52.jpg",   tagline:"Corporate trainer · C-suite presentations",hourlyRate:1800, avgRating:4.91, totalReviews:74,   totalLessons:590,  specialties:["Business","Presentations"],        isFeatured:false, responseTimeHours:4 },
  { id:"t7", displayName:"Anna Kowalski",   avatarUrl:"https://randomuser.me/api/portraits/women/14.jpg", tagline:"Grammar focus · Beginners welcome",        hourlyRate:700,  avgRating:4.85, totalReviews:63,   totalLessons:510,  specialties:["Grammar","Beginners"],             isFeatured:false, responseTimeHours:2 },
  { id:"t8", displayName:"Tom Nakamura",    avatarUrl:"https://randomuser.me/api/portraits/men/18.jpg",   tagline:"TOEFL 118 · Test prep specialist",         hourlyRate:1300, avgRating:4.96, totalReviews:201,  totalLessons:1750, specialties:["TOEFL","Academic","IELTS"],        isFeatured:false, responseTimeHours:1 },
  { id:"t9", displayName:"Lisa Fernandez",  avatarUrl:"https://randomuser.me/api/portraits/women/57.jpg", tagline:"Fun conversational English for all ages",  hourlyRate:850,  avgRating:4.90, totalReviews:118,  totalLessons:980,  specialties:["Conversation","Kids","Speaking"],  isFeatured:false, responseTimeHours:2 },
];

const SPECIALTIES = ["All","Business","IELTS","TOEFL","Kids","Academic","Conversation","Grammar","Pronunciation","Writing","Speaking","Beginners"];

export default async function TutorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tutors" });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1e1b4b] mb-1">{t("title")}</h1>
        <p className="text-[#7c6f9e] text-sm sm:text-base">500+ verified tutors · Trial lessons are FREE</p>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <Input placeholder={t("searchPlaceholder")} className="pl-9" />
        </div>
        <Select defaultValue="rating">
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Highest rated</SelectItem>
            <SelectItem value="price_asc">Price: Low → High</SelectItem>
            <SelectItem value="price_desc">Price: High → Low</SelectItem>
            <SelectItem value="lessons">Most lessons</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="flex items-center justify-center gap-2">
          <SlidersHorizontal size={15} /> {t("filterSpecialty")}
        </Button>
      </div>

      {/* Mobile chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 lg:hidden scrollbar-none -mx-4 px-4">
        {SPECIALTIES.map(s => (
          <Badge key={s} variant={s === "All" ? "default" : "secondary"}
            className={`cursor-pointer text-xs whitespace-nowrap flex-shrink-0 py-1.5 px-3 ${s === "All" ? "bg-[#818cf8] text-white" : "hover:bg-[#ede9fe] hover:text-[#6366f1]"}`}>
            {s}
          </Badge>
        ))}
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div>
              <h3 className="font-semibold text-[#1e1b4b] mb-3">{t("filterSpecialty")}</h3>
              <div className="flex flex-wrap gap-2">
                {SPECIALTIES.map(s => (
                  <Badge key={s} variant={s === "All" ? "default" : "secondary"}
                    className={`cursor-pointer text-xs ${s === "All" ? "bg-[#818cf8] text-white" : "hover:bg-[#ede9fe] hover:text-[#6366f1]"}`}>
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[#1e1b4b] mb-3">{t("filterPrice")} (₹/50min)</h3>
              <div className="flex gap-2 items-center text-sm text-[#5b5389]">
                <Input placeholder="₹500" className="h-8 text-xs" />
                <span>–</span>
                <Input placeholder="₹5000" className="h-8 text-xs" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[#1e1b4b] mb-3">{t("filterRating")}</h3>
              <Select defaultValue="any">
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="4">4.0+</SelectItem>
                  <SelectItem value="4.5">4.5+</SelectItem>
                  <SelectItem value="4.8">4.8+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-[#818cf8] hover:bg-[#6366f1] text-white text-sm">Apply</Button>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[#7c6f9e] mb-4">{MOCK_TUTORS.length} tutors found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {MOCK_TUTORS.map(tutor => (
              <TutorCard key={tutor.id} {...tutor} currency="INR"
                viewProfileLabel={t("viewProfile")}
                bookTrialLabel={t("bookTrial")} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-10">
            <Button variant="outline" size="sm" disabled>← Prev</Button>
            {[1,2,3].map(p => (
              <Button key={p} variant={p === 1 ? "default" : "outline"} size="sm"
                className={p === 1 ? "bg-[#818cf8] text-white" : ""}>{p}</Button>
            ))}
            <Button variant="outline" size="sm">Next →</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
