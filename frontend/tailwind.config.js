/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: {
          100: '#2F80ED',
          200: '#2C6FDB',
          300: '#2B5FC9',
          400: '#243DB0',
          500: '#1D2599',
        },
      },
    },
  },
  plugins: [],
}