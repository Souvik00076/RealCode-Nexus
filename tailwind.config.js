/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'lt-sm': '(max-width: 768px)', // Define a breakpoint for less than 728px
      },
    },
  },
  plugins: [],
}