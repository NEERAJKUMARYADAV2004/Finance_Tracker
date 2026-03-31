/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        card: 'var(--card)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        gold: 'var(--gold)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        brand: '#D4AF37',
        glass: {
          dark: 'rgba(18, 18, 18, 0.7)',
          light: 'rgba(255, 255, 255, 0.6)',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
