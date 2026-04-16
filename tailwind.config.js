/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
      },
      colors: {
        mac: {
          red: '#FF5F57',
          yellow: '#FEBC2E',
          green: '#28C840',
          bg: '#1c1c1e',
          surface: 'rgba(40,40,42,0.85)',
          border: 'rgba(255,255,255,0.1)',
          text: '#f5f5f7',
          muted: 'rgba(235,235,245,0.6)',
          sidebar: 'rgba(30,30,32,0.9)',
        }
      },
      backdropBlur: {
        mac: '20px',
      },
      keyframes: {
        bounce_dock: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      },
      animation: {
        bounce_dock: 'bounce_dock 0.5s ease-in-out 3',
      }
    }
  },
  plugins: [],
}
