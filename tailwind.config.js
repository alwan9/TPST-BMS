/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
    "./index.html",
     "./**/*.js",
     "./**/**/*.js",
    "./pages/*.html"
  ],
  theme: {
    extend: {},
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },

  },
  plugins: [
    // require('flowbite/plugin')
  ],
}