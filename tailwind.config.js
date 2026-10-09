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
      },
      transitionTimingFunction: {
        'expressive-fast-spatial': 'var(--motion-expressive-fast-spatial)',
        'expressive-default-spatial': 'var(--motion-expressive-default-spatial)',
        'expressive-slow-spatial': 'var(--motion-expressive-slow-spatial)',
        'expressive-fast-effects': 'var(--motion-expressive-fast-effects)',
        'expressive-default-effects': 'var(--motion-expressive-default-effects)',
        'expressive-slow-effects': 'var(--motion-expressive-slow-effects)',
        'standard-spatial': 'var(--motion-standard-spatial)',
        'standard-fast-effects': 'var(--motion-standard-fast-effects)',
        'standard-default-effects': 'var(--motion-standard-default-effects)',
        'standard-slow-effects': 'var(--motion-standard-slow-effects)',
      },
      transitionDuration: {
        'expressive-fast-spatial': 'var(--duration-expressive-fast-spatial)',
        'expressive-default-spatial': 'var(--duration-expressive-default-spatial)',
        'expressive-slow-spatial': 'var(--duration-expressive-slow-spatial)',
        'expressive-fast-effects': 'var(--duration-expressive-fast-effects)',
        'expressive-default-effects': 'var(--duration-expressive-default-effects)',
        'expressive-slow-effects': 'var(--duration-expressive-slow-effects)',
        'standard-fast-spatial': 'var(--duration-standard-fast-spatial)',
        'standard-default-spatial': 'var(--duration-standard-default-spatial)',
        'standard-slow-spatial': 'var(--duration-standard-slow-spatial)',
        'standard-fast-effects': 'var(--duration-standard-fast-effects)',
        'standard-default-effects': 'var(--duration-standard-default-effects)',
        'standard-slow-effects': 'var(--duration-standard-slow-effects)',
      }
    },
  },
  plugins: [],
}
