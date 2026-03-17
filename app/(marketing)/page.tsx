import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search, Star, Video, Calendar, Shield, Globe,
  BookOpen, Users, TrendingUp, ChevronRight
} from "lucide-react";

// ─── Mock featured tutors (replaced by DB query in Phase 2) ──────────────────
const FEATURED_TUTORS = [
  {
    id: "t1", name: "Sarah Mitchell", flag: "🇺🇸", tagline: "Business English & IELTS specialist",
    rating: 4.98, reviews: 312, lessons: 2840, rate: "₹1,200", avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    specialties: ["Business", "IELTS", "Conversation"],
  },
  {
    id: "t2", name: "James O'Brien", flag: "🇬🇧", tagline: "Oxford grad • Academic writing & TOEFL",
    rating: 4.95, reviews: 189, lessons: 1560, rate: "₹1,400", avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    specialties: ["Academic", "TOEFL", "Grammar"],
  },
  {
    id: "t3", name: "Emily Chen", flag: "🇨🇦", tagline: "Kids & teens English • Patient & fun!",
    rating: 4.99, reviews: 421, lessons: 3200, rate: "₹900", avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    specialties: ["Kids", "Beginners", "Speaking"],
  },
];

const HOW_IT_WORKS = [
  { step: "1", icon: Search,   title: "Find your tutor",    desc: "Browse 500+ verified native English tutors. Filter by specialty, price, rating, and availability." },
  { step: "2", icon: Calendar, title: "Book a trial",       desc: "Start with a FREE 25-min trial lesson to make sure it's the right fit — no commitment." },
  { step: "3", icon: Video,    title: "Learn online",       desc: "Join your lesson in the browser via Zoom — no downloads. Chat, whiteboard, share screens." },
];

const STATS = [
  { value: "500+",  label: "Verified tutors" },
  { value: "15K+",  label: "Lessons taught" },
  { value: "4.9★",  label: "Average rating" },
  { value: "98%",   label: "Student satisfaction" },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma", city: "Mumbai", avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    text: "Found an amazing IELTS tutor in 10 minutes. Went from 6.5 to 8.0 in 3 months. Absolutely worth it.",
    rating: 5,
  },
  {
    name: "Rahul Gupta", city: "Bangalore", avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    text: "My business English improved drastically. My manager actually noticed. The tutors here are top-tier.",
    rating: 5,
  },
  {
    name: "Anika Patel", city: "Delhi", avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    text: "My daughter loves her lessons with Emily. She went from dreading English to looking forward to it every week.",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#0f172a] via-[#8774DB] to-[#4338ca] text-white overflow-hidden">
        {/* Sakura decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f9a8d4] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f9a8d4] opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-[#f9a8d4]/20 text-[#f9a8d4] border-[#f9a8d4]/30 hover:bg-[#f9a8d4]/30">
              🇮🇳 India&apos;s #1 English Tutoring Marketplace
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Learn English with{" "}
              <span className="text-[#f9a8d4]">expert tutors</span>
              <br />1-on-1, online
            </h1>

            <p className="text-lg sm:text-xl text-pink-200 mb-8 max-w-2xl">
              Book verified native English tutors for IELTS, business English, conversational skills, and more.
              First trial lesson is FREE.
            </p>

            {/* Search bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by specialty, name…"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-[#f9a8d4] focus:border-transparent"
                />
              </div>
              <Link href="/tutors">
                <Button size="lg" className="bg-[#f9a8d4] hover:bg-[#f472b6] text-[#9d174d] font-semibold w-full sm:w-auto">
                  Find Tutors
                </Button>
              </Link>
            </div>

            <p className="mt-4 text-sm text-indigo-300">
              Popular: <span className="text-white">IELTS · Business English · Kids · Spoken English · TOEFL</span>
            </p>
          </div>
        </div>
      </section>

      {/* ─── Stats bar ────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#fdf2f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-[#8774DB]">{s.value}</div>
                <div className="text-sm text-[#64748b] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─────────────────────────────────────────────── */}
      <section className="py-20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a]">How it works</h2>
            <p className="mt-3 text-[#64748b] text-lg">Start learning in under 5 minutes</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="relative text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#fce7f3] mb-5">
                  <Icon className="text-[#8774DB]" size={26} />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-6 h-6 rounded-full bg-[#8774DB] text-white text-xs font-bold flex items-center justify-center">
                  {step}
                </div>
                <h3 className="text-lg font-semibold text-[#0f172a] mb-2">{title}</h3>
                <p className="text-[#64748b] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/auth/register">
              <Button size="lg" className="bg-[#49D1FD] hover:bg-[#8774DB] text-white">
                Get started free <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Featured Tutors ──────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a]">Featured Tutors</h2>
              <p className="mt-2 text-[#64748b]">Hand-picked, top-rated, and ready to teach</p>
            </div>
            <Link href="/tutors" className="text-[#8774DB] font-medium hover:underline hidden sm:flex items-center gap-1">
              View all <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_TUTORS.map((t) => (
              <Card key={t.id} className="hover:shadow-lg transition-shadow border border-[#fdf2f8] overflow-hidden">
                <div className="bg-[#f9a8d4]/20 px-4 py-1.5 text-xs font-semibold text-[#9d174d]">
                  ⭐ Featured
                </div>
                <CardContent className="p-5">
                  <div className="flex gap-4 mb-4">
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-[#49D1FD] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-[#0f172a]">{t.flag} {t.name}</h3>
                          <p className="text-sm text-[#64748b] line-clamp-1">{t.tagline}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#8774DB]">{t.rate}</div>
                          <div className="text-xs text-slate-400">/50min</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-[#64748b] mb-3">
                    <span className="flex items-center gap-1">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      <span className="font-medium text-slate-700">{t.rating}</span>
                      <span>({t.reviews})</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={13} />
                      {t.lessons.toLocaleString()} lessons
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {t.specialties.map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs bg-[#fce7f3] text-[#8774DB]">
                        {s}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/tutors/${t.id}`} className="flex-1">
                      <Button variant="outline" className="w-full border-[#8774DB] text-[#8774DB] hover:bg-[#fce7f3] text-sm">
                        Profile
                      </Button>
                    </Link>
                    <Link href={`/tutors/${t.id}?book=true`} className="flex-1">
                      <Button className="w-full bg-[#49D1FD] hover:bg-[#8774DB] text-white text-sm">
                        Book Trial
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link href="/tutors">
              <Button variant="outline" className="border-[#8774DB] text-[#8774DB]">
                View all tutors <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Why Eigo ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a]">Why Eigo for Everyone?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield,  title: "Verified tutors",       desc: "Every tutor is background-checked, interview-tested, and reviewed by our team before going live." },
              { icon: Globe,   title: "UPI & all Indian cards", desc: "Pay with UPI, Paytm, PhonePe, net banking, or any card. Fully secure via Razorpay." },
              { icon: Video,   title: "In-browser classroom",  desc: "No downloads needed. Our Zoom-powered classroom works in any browser with whiteboard & file share." },
              { icon: Calendar,title: "Flexible scheduling",   desc: "Book lessons 24/7. Tutors span every timezone — find someone available right now." },
              { icon: Users,   title: "Trial lesson",          desc: "Every tutor offers a FREE 25-min trial. Try before you commit to a package." },
              { icon: TrendingUp, title: "Track progress",     desc: "Lesson notes, vocabulary lists, and progress tracking built right into your student dashboard." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 bg-white rounded-xl border border-[#fdf2f8] hover:shadow-sm transition-shadow">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#fce7f3] flex items-center justify-center">
                  <Icon size={20} className="text-[#8774DB]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0f172a] mb-1">{title}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a]">What students say</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="border border-[#fdf2f8]">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-2">
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#49D1FD] flex items-center justify-center text-white text-xs font-bold">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium text-[#0f172a]">{t.name}</div>
                      <div className="text-xs text-slate-400">{t.city}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-[#8774DB] to-[#4338ca]">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to speak English with confidence?
          </h2>
          <p className="text-pink-200 text-lg mb-8">
            Join 15,000+ students already learning with Eigo for Everyone. First trial is FREE.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-[#f9a8d4] hover:bg-[#f472b6] text-[#9d174d] font-semibold">
                Start for free
              </Button>
            </Link>
            <Link href="/tutors">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Browse tutors
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
