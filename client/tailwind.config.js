/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5f6FFF",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(200px, 1fr))", // Fixed "auto-full" to "auto-fill"
      },
    },

    animation: {
      // adjust speed according to your need
      marquee: "marquee 1s linear infinite",
    },
    keyframes: {
      marquee: {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(-100%)" },
      },
    },

    variants: {
      extend: {
        animation: ["hover", "focus"],
      },
    },
  },
  plugins: [],
};
