import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#050816",
        surface: "#0B1120",
        primary: "#7C3AED",
        secondary: "#A78BFA",
        border: "rgba(255,255,255,0.08)",
        muted: "#94A3B8",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"]
      },
      boxShadow: {
        premium: "0 24px 80px rgba(0,0,0,0.45)",
        glow: "0 0 50px rgba(124,58,237,0.35)"
      },
      backgroundImage: {
        "radial-grid": "radial-gradient(circle at 20% 20%, rgba(124,58,237,0.25), transparent 28%), radial-gradient(circle at 80% 0%, rgba(167,139,250,0.18), transparent 24%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)"
      }
    }
  },
  plugins: [animate]
};

export default config;
