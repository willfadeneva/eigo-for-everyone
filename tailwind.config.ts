import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        indigo: {
          900: "#1e1b4b",
          800: "#312e81",
          700: "#3730a3",
          600: "#4338ca",
          500: "#4f46e5",
          400: "#6366f1",
          100: "#e0e7ff",
          50:  "#eef2ff",
        },
        sakura: {
          400: "#f9a8d4",
          300: "#fbc8e0",
          100: "#fce7f3",
          50:  "#fdf2f8",
        },
        brand: {
          primary:    "#3730a3",
          accent:     "#f9a8d4",
          background: "#fafafa",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-noto-sans-jp)", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
