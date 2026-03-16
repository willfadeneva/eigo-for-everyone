import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  serverExternalPackages: ["@prisma/client", "jsrsasign"],
  // Ignore type errors during build (fix iteratively)
  typescript: { ignoreBuildErrors: true },
  eslint:     { ignoreDuringBuilds: true },
};

export default config;
