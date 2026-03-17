import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, CalendarCheck, Video, Star, ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works | Eigo for Everyone",
  description: "Learn how to find, book, and learn with a verified English tutor in 3 simple steps.",
};

const STEPS = [
  {
    icon: Search,
    number: "01",
    title: "Find your tutor",
    desc: "Browse hundreds of verified English tutors. Filter by specialty — IELTS, Business English, Kids, Conversation — budget, availability, and rating. Every tutor profile shows real reviews from Indian learners like you.",
    points: ["Filter by goal, budget & time", "Read verified Indian student reviews", "Watch intro videos before booking"],
    color: "bg-indigo-50 text-[#8774DB]",
  },
  {
    icon: CalendarCheck,
    number: "02",
    title: "Book a trial lesson",
    desc: "Most tutors offer a free or discounted first lesson. Pick a time slot that works for you — mornings, evenings, weekends. Pay securely via UPI, Paytm, net banking, or card. No surprises, no hidden fees.",
    points: ["Free or discounted trial lessons", "Pay via UPI, Paytm, cards", "Instant booking confirmation"],
    color: "bg-pink-50 text-pink-600",
  },
  {
    icon: Video,
    number: "03",
    title: "Learn live, 1-on-1",
    desc: "Your lesson happens on our built-in video platform — no downloads, no Zoom links, no hassle. Just you and your tutor, fully focused. Lessons are recorded so you can review them anytime.",
    points: ["HD video, in-browser — no app needed", "Interactive whiteboard & notes", "Lesson recordings for review"],
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Star,
    number: "04",
    title: "Track your progress",
    desc: "After every lesson, rate your tutor and leave feedback. Your dashboard tracks lessons completed, hours spent, and goals achieved. Subscribe to a weekly package and save up to 20%.",
    points: ["Goal tracker & lesson history", "Rate & review your tutor", "Weekly packages save up to 20%"],
    color: "bg-amber-50 text-amber-600",
  },
];

const FAQS = [
  { q: "How much does it cost?", a: "Tutor rates vary from ₹700 to ₹1,800 per hour. Many tutors offer a free or discounted trial lesson. You only pay for lessons you take — no subscription required." },
  { q: "Can I try before committing?", a: "Yes! Most tutors offer a free 20-minute consultation or a discounted first lesson at ₹0–₹300. Use it to see if the teaching style is right for you." },
  { q: "What if I don't like my tutor?", a: "No problem. You can cancel before the lesson starts and get a full refund. Or simply book a different tutor — there's no lock-in." },
  { q: "Is it suitable for kids?", a: "Absolutely. We have tutors who specialise in children aged 5–17, using games, stories, and activities. Filter by 'Kids' specialty to find them." },
  { q: "Do I need to install anything?", a: "No downloads needed. Lessons run in your browser. A stable internet connection and a camera/mic are all you need." },
  { q: "How do tutors get verified?", a: "All tutors go through an ID check, teaching certification review, and a sample lesson review by our team before being listed on the platform." },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#fce7f3] to-white py-16 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-[#49D1FD]/10 text-[#8774DB] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Simple. Flexible. Effective.</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0f172a] mb-5 leading-tight">
            Learn English in <span className="text-[#8774DB]">4 easy steps</span>
          </h1>
          <p className="text-lg text-[#475569] max-w-xl mx-auto mb-8">
            From finding your perfect tutor to your first lesson — Eigo makes learning English simple, affordable, and personalised for India.
          </p>
          <Link href="/tutors">
            <Button className="bg-[#49D1FD] hover:bg-[#8774DB] text-white px-8 py-3 text-base rounded-full">
              Find a tutor <ArrowRight size={16} className="ml-2" />
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
                {/* Visual */}
                <div className="flex-1 flex justify-center">
                  <div className={`w-52 h-52 rounded-3xl ${step.color} flex flex-col items-center justify-center gap-3 shadow-sm`}>
                    <span className="text-5xl font-black opacity-10">{step.number}</span>
                    <Icon size={48} />
                  </div>
                </div>
                {/* Text */}
                <div className="flex-1">
                  <span className="text-sm font-bold text-[#8774DB] uppercase tracking-widest">Step {step.number}</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mt-1 mb-3">{step.title}</h2>
                  <p className="text-[#475569] leading-relaxed mb-4">{step.desc}</p>
                  <ul className="space-y-2">
                    {step.points.map(p => (
                      <li key={p} className="flex items-center gap-2 text-slate-700 text-sm">
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
          <h2 className="text-3xl font-bold text-[#0f172a] text-center mb-10">Frequently asked questions</h2>
          <div className="space-y-5">
            {FAQS.map(faq => (
              <div key={faq.q} className="bg-white rounded-xl border border-[#fce7f3] p-5">
                <h3 className="font-semibold text-[#0f172a] mb-2">{faq.q}</h3>
                <p className="text-[#475569] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-[#0f172a] mb-4">Ready to start?</h2>
        <p className="text-[#475569] mb-8 max-w-md mx-auto">Join thousands of Indian students who improved their English with a verified tutor on Eigo.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/tutors">
            <Button className="bg-[#49D1FD] hover:bg-[#8774DB] text-white px-8 py-3 rounded-full text-base">Browse tutors</Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="outline" className="border-[#8774DB] text-[#8774DB] px-8 py-3 rounded-full text-base">Create free account</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
