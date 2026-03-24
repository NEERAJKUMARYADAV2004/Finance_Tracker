/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0D0D0D',
        gold: '#D4AF37',
        card: '#1A1A1A',
        surface: '#262626',
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
