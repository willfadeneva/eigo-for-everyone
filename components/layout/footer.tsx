import { Link } from "@/i18n/navigation";
import { Star, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0D0A1E] text-white">

      {/* Top grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#8774DB] to-[#F472B6] rounded-xl flex items-center justify-center">
              <span className="text-white font-black">英</span>
            </div>
            <span className="font-bold text-white">Eigo for Everyone</span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-5">
            India's premier English tutoring platform. 500+ verified native tutors, starting ₹700/hr.
          </p>
          <div className="flex items-center gap-1.5 bg-white/5 rounded-full px-4 py-2 w-fit border border-white/10">
            {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
            <span className="text-white text-xs font-bold ml-1">4.96</span>
            <span className="text-white/40 text-xs">· 50k+ reviews</span>
          </div>
        </div>

        {/* Learn */}
        <div>
          <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">Learn</h4>
          <ul className="space-y-2.5">
            {[
              ["Business English", "/tutors"],
              ["IELTS Preparation", "/tutors"],
              ["Kids English", "/tutors"],
              ["Conversation", "/tutors"],
              ["Academic Writing", "/tutors"],
            ].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="text-white/50 hover:text-white text-sm transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Platform */}
        <div>
          <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">Platform</h4>
          <ul className="space-y-2.5">
            {[
              ["Find a Tutor",    "/tutors"],
              ["How it Works",   "/how-it-works"],
              ["Become a Tutor", "/auth/login"],
              ["Sign In",        "/auth/login"],
              ["Sign Up Free",   "/auth/login"],
            ].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="text-white/50 hover:text-white text-sm transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Stats / Social proof */}
        <div>
          <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">By the numbers</h4>
          <div className="space-y-3">
            {[
              { v: "2.8M+", l: "Lessons delivered", c: "text-[#FBE85F]" },
              { v: "500+",  l: "Verified tutors",    c: "text-[#AFF035]" },
              { v: "42",    l: "Countries served",   c: "text-[#49D1FD]" },
              { v: "₹700",  l: "Starting price/hr",  c: "text-[#F472B6]" },
            ].map(s => (
              <div key={s.l} className="flex items-center gap-3">
                <span className={`text-xl font-black ${s.c}`}>{s.v}</span>
                <span className="text-white/40 text-xs">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-white/30 text-xs">
          © {new Date().getFullYear()} Eigo for Everyone · Built with <Heart size={10} className="inline text-[#F35555] fill-[#F35555]" /> for India's English learners
        </p>
        <div className="flex items-center gap-4">
          {[["Terms", "/terms"], ["Privacy", "/privacy"]].map(([l, h]) => (
            <Link key={l} href={h} className="text-white/30 hover:text-white/70 text-xs transition-colors">{l}</Link>
          ))}
          <span className="text-white/20 text-xs">🇮🇳 India</span>
        </div>
      </div>
    </footer>
  );
}
