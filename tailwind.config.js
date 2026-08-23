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
          dark: "#28282a",
          secondary: "#c8c8c8"
        }
      },
      fontFamily: {
        inter: ["Inter", "Segoe UI", "system-ui", "sans-serif"],
        display: ["BubbledotICG-FinePos", "Geist Pixel Circle", "monospace"],
      }
    },
  },
  plugins: [],
}
