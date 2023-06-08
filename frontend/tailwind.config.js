/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': "radial-gradient(circle at top right, #1E3A8A 0%, rgba(0,0,0,0.1) 70%), radial-gradient(circle at bottom left, #ffffff 0%, rgba(0,0,0,0.2) 70%), linear-gradient(to right, #1E3A8A 0%, #ffffff 100%)"
      }
    },
  },
  plugins: [],
}