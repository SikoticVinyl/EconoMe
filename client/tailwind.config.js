/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        slowping: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      fontFamily: {
        'nebula': ['Nabla', 'sans-serif'],
      },
      colors: {
        'color1': '#d7d4db',
        'color2': '#447093',
        'color3': '#184461',
        'color4': '#1c5d3b',
        'color5': '#044c26',
      },
      
      backgroundImage: {
        'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
     },
    },
  },
  plugins: [],
}
