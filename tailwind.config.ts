import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6C3AFF",
        accent: "#00C6FF",
        dark: "#0A0A0F",
        light: "#F8F8FF",
      },
      fontFamily: {
        sans: ["var(--font-heebo)", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse at top right, rgba(108,58,255,0.15) 0%, rgba(0,198,255,0.08) 40%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
export default config;
