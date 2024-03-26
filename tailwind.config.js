/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors:{
      'sheffield-red-deep':'#981FC0',
      'sheffield-gold':'white',
      'sheffield-red-shallow':'#891CAD',
      'premier-dark':'#3F1052',
      'premier-normal':'#981FC0'
    }
  },
  plugins: [],
}
