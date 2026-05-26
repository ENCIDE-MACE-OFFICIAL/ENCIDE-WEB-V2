/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["IBM Plex Sans", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        sans: ["IBM Plex Sans", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        mono: ["IBM Plex Mono", "SFMono-Regular", "monospace"],
      },
      colors: {
        practicebg: "rgba(239, 68, 68, 0.3)",
        faqbg: "rgba(239, 68, 68, 0.25)",
        cardbg: "rgba(42, 0, 49, 0.7)",
        cardshadow: "rgba(220, 38, 38, 0.81)",
      },
      boxShadow: {
        cardshadow: "0px 0px 6px 0px rgba(220, 38, 38, 0.21)",
      },
    },
  },
  plugins: [],
};
