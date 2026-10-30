import type { Config } from "tailwindcss";

// צבעי המותג – נלקחו מהאתר הקיים ומהלוגו
// teal  #30ADBE – צבע הלוגו
// navy  #03253A / #122D40 – רקעים כהים באתר הקיים
// gold  #EDB548 – צבע ההדגשה באתר הקיים
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" }, screens: { "2xl": "1240px" } },
    extend: {
      colors: {
        ink: { DEFAULT: "#020a10", 900: "#02080d", 800: "#051622" },
        navy: { DEFAULT: "#03253A", 700: "#122D40", 600: "#1b3d55" },
        teal: { DEFAULT: "#30ADBE", 300: "#7ad6e3", 400: "#4fc3d3", 600: "#22899a" },
        gold: { DEFAULT: "#EDB548", 300: "#f6d68f", 600: "#c9922a" },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "sans-serif"],
        brand: ["var(--font-brand)", "sans-serif"],
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(50%)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        aurora: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(6%,-8%) scale(1.15)" },
          "66%": { transform: "translate(-6%,6%) scale(.92)" },
        },
        shine: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        pulseRing: { "0%": { transform: "scale(.9)", opacity: ".7" }, "100%": { transform: "scale(1.6)", opacity: "0" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        aurora: "aurora 18s ease-in-out infinite",
        shine: "shine 6s linear infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        "pulse-ring": "pulseRing 2s cubic-bezier(.2,.6,.4,1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
