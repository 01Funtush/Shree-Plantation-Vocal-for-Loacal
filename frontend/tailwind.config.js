/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#2c5f2d',
        'brand-light': '#97bc62',
      }
    },
  },
  plugins: [],
}
