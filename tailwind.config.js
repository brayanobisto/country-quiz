/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      gray: '#F2F2F2',
      blue: {
        100: '#2F527B',
        200: '#1D355D',
      },
      violet: '#6066D0',
      yellow: '#F9A826',
      red: '#EA8282',
      green: {
        100: '#6FCF97',
        200: '#60BF88',
      },
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        background: "url('/src/assets/img/background.png')",
      },
      width: {
        card: '29rem',
      },
      maxWidth: {
        card: '29rem',
      },
    },
  },
  plugins: [],
}
