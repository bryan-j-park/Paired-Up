/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
        fontFamily: {
            emblema: 'Emblema One',
            fugaz: 'Fugaz One',
            rubik: 'Rubik 80s Fade'
        },
        colors: {
            'light-blue': '#6EAACE',
            'dark-blue': '#152352',
            'red': '#A80400',
            'green': '#8DA833'
        }
    },
  },
  plugins: [],
}