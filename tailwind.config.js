/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        reflect: {
          void: '#030014',
          midnight: '#060317',
          indigo: '#10093a',
          lilac: '#f4f0ff',
          pearl: '#ffffff',
          ash: '#a8a6b7',
          fog: '#918ea0',
          steel: '#54525f',
          mercury: '#cdccd0',
          dusk: '#72707b',
          lavender: '#9382ff',
          iris: '#5046e4',
        },
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#38abf8',
          500: '#0e8ee9',
          600: '#0270c7',
          700: '#0359a1',
          800: '#074c84',
          900: '#0c406e',
          950: '#082849',
        },
        slate: {
          850: '#151f32',
          950: '#090d16',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'reflect-button': '5px',
        'reflect-card': '16px',
        'reflect-badge': '32px',
        'reflect-block': '24px',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'glow': '0 0 25px -5px rgba(14, 142, 233, 0.25)',
        'reflect-rim': 'rgba(255, 255, 255, 0.04) 0px 0px 24px 0px inset',
        'reflect-rim-bright': 'rgba(255, 255, 255, 0.06) 0px 0px 24px 0px inset',
        'reflect-badge': 'rgba(164, 143, 255, 0.12) 0px -7px 11px 0px inset',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-subtle': 'pulseSubtle 2.5s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
}
