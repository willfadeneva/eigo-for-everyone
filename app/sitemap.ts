import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "https://eigo-for-everyone.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                       lastModified: new Date(), priority: 1.0,  changeFrequency: "weekly"  },
    { url: `${BASE}/tutors`,           lastModified: new Date(), priority: 0.9,  changeFrequency: "daily"   },
    { url: `${BASE}/how-it-works`,     lastModified: new Date(), priority: 0.7,  changeFrequency: "monthly" },
    { url: `${BASE}/pricing`,          lastModified: new Date(), priority: 0.7,  changeFrequency: "monthly" },
    { url: `${BASE}/about`,            lastModified: new Date(), priority: 0.5,  changeFrequency: "monthly" },
    { url: `${BASE}/auth/login`,       lastModified: new Date(), priority: 0.4,  changeFrequency: "monthly" },
    { url: `${BASE}/auth/register`,    lastModified: new Date(), priority: 0.6,  changeFrequency: "monthly" },
  ];
}
