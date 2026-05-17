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
        display: ["var(--font-display)", "Georgia", "serif"],
        body:    ["var(--font-body)", "sans-serif"],
      },
      colors: {
        cream:  "#fdf6f0",
        blush:  "#fceef3",
        mauve:  "#d4a0b5",
        rose: {
          DEFAULT: "#f5e6ea",
          mid:     "#e8c4ce",
          dark:    "#c4859a",
          deep:    "#8d4a61",
        },
        silver: {
          DEFAULT: "#f8f7f5",
          mid:     "#e2ddd8",
          dark:    "#9e9b96",
        },
        ink: {
          DEFAULT: "#1e1414",
          light:   "#5a4848",
          muted:   "#8a7070",
        },
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee:  "marquee 22s linear infinite",
        "fade-up": "fadeUp 0.5s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
