/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1E3A8A",   // deep academic blue
          secondary: "#0F172A", // near-black slate
          accent: "#4F46E5",    // indigo
          accentSoft: "#EEF2FF" // light indigo bg
        },
        surface: {
          light: "#F8FAFC",
          muted: "#F1F5F9"
        },
        text: {
          heading: "#0F172A",
          body: "#334155",
          muted: "#64748B"
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2, 6, 23, 0.08)",
      },
    },
  },
  plugins: [],
};
