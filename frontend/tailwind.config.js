/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#1b4332',
        'brand-forest': '#228B22',
        'brand-forest-deep': '#2D5A27',
        'brand-forest-ultra': '#0B240B',
        'brand-forest-light': '#32a832', 
        'brand-terracotta': '#E2725B',
        'brand-charcoal': '#1A301A',
        'brand-gold': '#D4AF37',
        'brand-gold-text': '#d3c274',
        'brand-emerald': '#064e3b',
        'brand-nav-bg': '#f0f4ed',
        'brand-header-bg': '#d0dbce',
        'brand-search-bg': '#e8e4d9',
        'brand-nav-btn': '#1a3b1a',
        'brand-earth': '#4D472C',
        'brand-bg': '#eaf7ec',
        'brand-cream': '#fdf6ec',
        'brand-light-bg': '#f8f5f0',
        'brand-muted': '#374151',
        // Keep legacy names mapping to new colors to prevent breaking changes if missed
        'brand-green': '#2D5A27', 
        'brand-light': '#374151', 
        'brand-sage': '#B2C2A2',
        'brand-sage-bg': '#8DA382',
        'brand-terracotta-accent': '#E2725B',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
