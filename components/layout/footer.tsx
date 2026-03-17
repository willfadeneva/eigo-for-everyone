import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-white">英語</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">{t("tagline")}</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">{t("students")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tutors" className="hover:text-white transition-colors">{t("findTutors")}</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">{t("howItWorks")}</Link></li>
              <li><Link href="/auth/register" className="hover:text-white transition-colors">{t("signUpFree")}</Link></li>
              <li><Link href="/auth/login" className="hover:text-white transition-colors">{t("logIn")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">{t("tutors")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tutors" className="hover:text-white transition-colors">{t("browseAllTutors")}</Link></li>
              <li><Link href="/auth/register" className="hover:text-white transition-colors">{t("becomeATutor")}</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">{t("howItWorks")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">{t("company")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">{t("aboutEigo")}</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">{t("faq")}</Link></li>
              <li><Link href="/auth/register" className="hover:text-white transition-colors">{t("getStarted")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Eigo for Everyone. {t("rights")}
          </p>
          <p className="text-sm text-slate-500">🇮🇳 {t("madeFor")}</p>
        </div>
      </div>
    </footer>
  );
}
