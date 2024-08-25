/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        "9": "900px",
        "950": "950px",
        'xs': '500px',
       'xsm': '420px'
      }
    },
  },
  plugins: [],
}