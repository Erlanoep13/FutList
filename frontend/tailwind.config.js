/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        futlist: {
          dark: '#121214',
          card: '#202024',
          green: '#00B37E',
          red: '#F75A68',
          text: '#E1E1E6',
          muted: '#7C7C8A'
        }
      }
    },
  },
  plugins: [],
}