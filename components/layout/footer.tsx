import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-white">英語</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              India&apos;s English tutoring marketplace. Learn with verified native tutors, from ₹700/hr.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Students</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tutors" className="hover:text-white transition-colors">Find Tutors</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/auth/register" className="hover:text-white transition-colors">Sign Up Free</Link></li>
              <li><Link href="/auth/login" className="hover:text-white transition-colors">Log In</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Tutors</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tutors" className="hover:text-white transition-colors">Browse All Tutors</Link></li>
              <li><Link href="/auth/register" className="hover:text-white transition-colors">Become a Tutor</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">About Eigo</Link></li>
              <li><Link href="/how-it-works#faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/auth/register" className="hover:text-white transition-colors">Get Started</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Eigo for Everyone. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            🇮🇳 Built for India&apos;s English learners
          </p>
        </div>
      </div>
    </footer>
  );
}
