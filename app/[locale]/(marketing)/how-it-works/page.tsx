import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Search, CalendarCheck, Video, Star, ArrowRight, CheckCircle } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "howItWorks" });
  return { title: `${t("title")} | Eigo for Everyone` };
}

export default async function HowItWorksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "howItWorks" });

  const STEPS = [
    {
      icon: Search,
      number: "01",
      title: locale === "ja" ? "講師を探す" : "Find your tutor",
      desc: locale === "ja" ? "専門分野・価格・空き状況で絞り込み。インド人学習者のリアルな口コミを読めます。" : "Browse hundreds of verified tutors. Filter by specialty — IELTS, Business, Kids, Conversation — budget, availability, and rating.",
      points: locale === "ja"
        ? ["目標・予算・時間で絞り込み", "インド人学習者の本物の口コミ", "予約前に紹介動画を確認"]
        : ["Filter by goal, budget & time", "Read verified Indian student reviews", "Watch intro videos before booking"],
      color: "bg-[#fce7f3] text-[#8774DB]",
    },
    {
      icon: CalendarCheck,
      number: "02",
      title: locale === "ja" ? "レッスンを予約" : "Book a lesson",
      desc: locale === "ja" ? "都合の良い時間を選んで予約。UPI・Paytm・カード・ネットバンキングで支払い。" : "Pick a time slot that works for you. Pay securely via UPI, Paytm, net banking, or card. No surprises, no hidden fees.",
      points: locale === "ja"
        ? ["無料または割引体験レッスン", "UPI・Paytm・カードで支払い", "即座に予約確定"]
        : ["Free or discounted trial lessons", "Pay via UPI, Paytm, cards", "Instant booking confirmation"],
      color: "bg-[#8774DB]/15 text-[#8774DB]",
    },
    {
      icon: Video,
      number: "03",
      title: locale === "ja" ? "ライブ1対1レッスン" : "Learn live, 1-on-1",
      desc: locale === "ja" ? "HD動画、ブラウザ内完結。ダウンロード不要。レッスン録画付き。" : "Your lesson happens on our built-in video platform — no downloads, no Zoom links, no hassle.",
      points: locale === "ja"
        ? ["HD動画、ブラウザ内 — アプリ不要", "インタラクティブホワイトボード", "レッスン録画で復習可能"]
        : ["HD video, in-browser — no app needed", "Interactive whiteboard & notes", "Lesson recordings for review"],
      color: "bg-[#AFF035]/20 text-[#3a7c11]",
    },
    {
      icon: Star,
      number: "04",
      title: locale === "ja" ? "進歩を記録" : "Track your progress",
      desc: locale === "ja" ? "レッスン後に評価を投稿。ダッシュボードでレッスン数・時間・目標達成を追跡。" : "Rate your tutor after every lesson. Your dashboard tracks lessons completed, hours spent, and goals achieved.",
      points: locale === "ja"
        ? ["目標トラッカーとレッスン履歴", "講師を評価", "週次パッケージで最大20%節約"]
        : ["Goal tracker & lesson history", "Rate & review your tutor", "Weekly packages save up to 20%"],
      color: "bg-[#49D1FD]/20 text-[#0369a1]",
    },
  ];

  const FAQS = locale === "ja" ? [
    { q: "料金はいくらですか？", a: "講師の料金は1時間₹700〜₹1,800です。多くの講師が無料または割引の体験レッスンを提供しています。サブスクリプション不要 — 受けたレッスン分だけ支払い。" },
    { q: "試してから決められますか？", a: "はい！多くの講師が無料20分相談または割引初回レッスン（₹0〜₹300）を提供しています。" },
    { q: "講師が合わなかった場合は？", a: "問題ありません。レッスン開始前にキャンセルすれば全額返金。別の講師を予約するだけです。" },
    { q: "子供でも大丈夫ですか？", a: "もちろんです！5〜17歳の子供専門の講師が多数います。「Kids」専門で絞り込んでください。" },
    { q: "インストールは必要ですか？", a: "不要です。レッスンはブラウザで完結。安定したインターネット接続とカメラ・マイクがあればOK。" },
    { q: "講師はどうやって認定されますか？", a: "全講師が本人確認・資格審査・サンプルレッスン審査を経てからプラットフォームに掲載されます。" },
  ] : [
    { q: "How much does it cost?", a: "Tutor rates vary from ₹700 to ₹1,800 per hour. Many offer a free or discounted trial. No subscription required." },
    { q: "Can I try before committing?", a: "Yes! Most tutors offer a free 20-minute consultation or discounted first lesson at ₹0–₹300." },
    { q: "What if I don't like my tutor?", a: "Cancel before the lesson starts for a full refund. Simply book a different tutor — there's no lock-in." },
    { q: "Is it suitable for kids?", a: "Absolutely. We have tutors specialising in children aged 5–17. Filter by 'Kids' specialty." },
    { q: "Do I need to install anything?", a: "No downloads needed. Lessons run in your browser. A camera and mic are all you need." },
    { q: "How do tutors get verified?", a: "All tutors go through ID check, certification review, and sample lesson review before being listed." },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f0eeff] via-[#ffffff] to-[#fff0f9] py-16 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-[#8774DB]/10 text-[#8774DB] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">{t("tag")}</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0f172a] mb-5 leading-tight">
            {t("title")}
          </h1>
          <p className="text-lg text-[#64748b] max-w-xl mx-auto mb-8">{t("subtitle")}</p>
          <Link href="/tutors">
            <Button className="bg-[#8774DB] hover:bg-[#7B61C9] text-white px-8 py-3 text-base rounded-full">
              {t("findTutor")} <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
        <div className="space-y-12">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isEven = idx % 2 === 1;
            return (
              <div key={step.number} className={`flex flex-col ${isEven ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-12`}>
                <div className="flex-1 flex justify-center">
                  <div className={`w-52 h-52 rounded-3xl ${step.color} flex flex-col items-center justify-center gap-3 shadow-sm`}>
                    <span className="text-5xl font-black opacity-10">{step.number}</span>
                    <Icon size={48} />
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-sm font-bold text-[#8774DB] uppercase tracking-widest">Step {step.number}</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mt-1 mb-3">{step.title}</h2>
                  <p className="text-[#64748b] leading-relaxed mb-4">{step.desc}</p>
                  <ul className="space-y-2">
                    {step.points.map(p => (
                      <li key={p} className="flex items-center gap-2 text-[#475569] text-sm">
                        <CheckCircle size={15} className="text-[#8774DB] flex-shrink-0" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#fafafa] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f172a] text-center mb-10">{t("faqTitle")}</h2>
          <div className="space-y-4">
            {FAQS.map(faq => (
              <div key={faq.q} className="bg-white rounded-xl border border-[#fce7f3] p-5">
                <h3 className="font-semibold text-[#0f172a] mb-2">{faq.q}</h3>
                <p className="text-[#64748b] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-[#0f172a] mb-4">{t("readyTitle")}</h2>
        <p className="text-[#64748b] mb-8 max-w-md mx-auto">{t("readySub")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/tutors">
            <Button className="bg-[#8774DB] hover:bg-[#7B61C9] text-white px-8 py-3 rounded-full text-base">{t("browseTutors")}</Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline" className="border-[#8774DB] text-[#8774DB] px-8 py-3 rounded-full text-base">{t("createAccount")}</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
