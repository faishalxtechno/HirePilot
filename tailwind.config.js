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
          background: "#080B14",
          primary: "#ffffff",
          muted: "#9AA4B7",
          dark: "#0D1220",
          secondary: "#c8c8c8",
          obsidian: "#080B14",
          card: "#121827",
          cardBorder: "#1E2638",
          accent: "#36D6FF",
          emerald: "#36D399",
          violet: "#7657FF"
        },
        surface: {
          DEFAULT: "#080B14",
          secondary: "#0D1220",
          card: "#121827",
          overlay: "#171F33",
          subdued: "#181B25",
          highlight: "#272A34",
          border: "#1E2638",
          borderStrong: "#2D374E",
        },
        'primary-container': "#7657FF",
        'secondary-container': "#00c3eb",
        'tertiary-container': "#00865d",
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
