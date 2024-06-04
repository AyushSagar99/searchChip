/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'back-rgba': 'rgba(250,251,250,255)',
        "search-rgba":"rgba(242,242,242,255)",
      },
  },
  },
  plugins: [],
}

