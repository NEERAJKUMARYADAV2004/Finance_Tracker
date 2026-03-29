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
        gold: '#D4AF37',
        card: 'var(--card)',
        surface: 'var(--surface)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Completely removing transition duration and properties for a static feel
      transitionProperty: {
        none: 'none',
        all: 'none',
        default: 'none',
        colors: 'none',
        opacity: 'none',
        shadow: 'none',
        transform: 'none',
      },
      animation: {
        none: 'none',
      }
    },
  },
  plugins: [],
}
