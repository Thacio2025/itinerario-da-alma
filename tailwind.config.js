import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        scriptorium: {
          bg: "#1A1610",
          surface: "#242019",
          border: "#3D3629",
          gold: "#A8956E",
          "gold-muted": "#8A7A5C",
          cream: "#E8E0D4",
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
        "hero-itinerario":
          "radial-gradient(ellipse 90% 60% at 50% -30%, rgba(168,149,110,0.22), transparent 55%), radial-gradient(ellipse 70% 45% at 100% 0%, rgba(120,90,50,0.12), transparent 50%), linear-gradient(180deg, #14110d 0%, #1a1610 45%, #12100c 100%)",
      },
      boxShadow: {
        "card-lift": "0 22px 50px -12px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)",
        "gold-glow": "0 0 40px -8px rgba(168,149,110,0.35)",
      },
    },
  },
  plugins: [typography],
};
