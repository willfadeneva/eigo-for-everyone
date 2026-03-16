import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Eigo for Everyone | 英語を学ぼう",
  description:
    "Japan's premier English tutoring marketplace. Learn English 1-on-1 with expert tutors. ネイティブ講師と1対1で英語を学ぼう。",
  keywords: ["英語", "英会話", "オンライン英語", "English tutoring", "Japan"],
  openGraph: {
    title: "Eigo for Everyone",
    description: "Learn English 1-on-1 with expert tutors.",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="min-h-screen bg-[#fafafa] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
