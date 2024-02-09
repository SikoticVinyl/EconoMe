/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        slowping: 'ping 10s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      fontFamily: {
        'nebula': ['Nabla', 'sans-serif'],
        'protest-riot': ['Protest Riot', 'sans-serif'],
        'Sixtyfour':  ['Sixtyfour', 'sans-serif'],
        'rubik-doodle': ['Rubik Doodle Shadow', 'system-ui']
      },
      colors: {
        'color1': '#d7d4db', // light grey
        'color2': '#447093', // blue
        'color3': '#184461', // dark blue
        'color4': '#1c5d3b', // green
        'color5': '#044c26', // dark green
      },
      
      backgroundImage: {
        'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
        'blend-luminosity': 'luminosity',
        'blend-mode': 'blend-mode',
     },
    },
  },
  plugins: [],
}
