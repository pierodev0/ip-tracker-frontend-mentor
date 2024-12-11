/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Rubik', 'sans-serif'],
    },
    extend: {
      colors: {
        'very-dark-gray': 'hsl(0, 0%, 17%)',
        'dark-gray': 'hsl(0, 0%, 59%)',
      },
      backgroundImage: {
        pattern: "url('/pattern-bg-desktop.png')",
      },
    },
    plugins: [],
  },
};
