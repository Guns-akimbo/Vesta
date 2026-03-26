import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      colors: {
        bg: "#F7F6F2",
        surface: {
          DEFAULT: "#FFFFFF",
          alt: "#F2F0EC",
        },
        ink: "#1E1C18",
        secondary: "#6B6860",
        tertiary: "#A09E9B",
        border: {
          DEFAULT: "rgba(30, 28, 24, 0.1)",
          hover: "rgba(30, 28, 24, 0.18)",
        },
        expense: {
          DEFAULT: "#D8563A",
          soft: "#FAEAE6",
          mid: "#F5C2B5",
        },
        savings: {
          DEFAULT: "#2A8C6E",
          soft: "#E3F4EF",
          mid: "#9FD9CA",
        },
        invest: {
          DEFAULT: "#4A63C8",
          soft: "#EAF0FF",
          mid: "#B5C5F5",
        },
        habit: {
          DEFAULT: "#C07A2A",
          soft: "#FEF4E3",
          mid: "#F2CC8A",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.4s ease-out both",
        "fade-in": "fadeIn 0.3s ease-out both",
        "scale-in": "scaleIn 0.2s ease-out both",
        "slide-up": "slideUp 0.25s ease-out both",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
