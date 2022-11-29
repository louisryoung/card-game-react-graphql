/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        courier: ['Courier Prime'],
        alfa: ['Alfa Slab One'],
      },
      borderRadius: {
        button: '14px',
      },
    },
  },
  plugins: [],
}
