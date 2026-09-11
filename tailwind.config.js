/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          background: "#000000",
          primary: "#ffffff",
          muted: "#8e8e8e",
          dark: "#141417",
          secondary: "#c8c8c8",
          obsidian: "#070709",
          card: "#0d0d12",
          cardBorder: "rgba(255, 255, 255, 0.08)",
          accent: "#38bdf8",
          emerald: "#10b981",
          violet: "#a855f7"
        }
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        inter: ["Inter", "Segoe UI", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Menlo", "monospace"],
      }
    },
  },
  plugins: [],
}
