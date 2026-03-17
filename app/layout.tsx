import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto-sans-jp", display: "swap", weight: ["400","500","700"] });

export const metadata: Metadata = {
  title: "Eigo for Everyone | Learn English Online",
  description: "India's English tutoring marketplace. Learn 1-on-1 with verified native tutors. IELTS, Business English, Kids classes from ₹700/hr.",
  keywords: ["English tutoring", "IELTS coaching", "learn English India", "online English tutor"],
  openGraph: { title: "Eigo for Everyone", description: "1-on-1 English lessons with verified tutors.", type: "website" },
};

export default function RootLayout({ children, params }: { children: React.ReactNode; params?: any }) {
  return (
    <html className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="min-h-screen bg-[#fdf8ff] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
