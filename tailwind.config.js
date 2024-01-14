const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', ...defaultTheme.fontFamily.sans],
        heading: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: '#67E8F9',
        primaryButton: '#0E7490',      
        accent: '#333333',       // Deep Steel Gray
        white: '#FFFFFF',        // White
      },
      typography: {
        // Define your font styles for various HTML elements
        DEFAULT: {
          css: {
            fontFamily: 'Lato, sans-serif',
          },
        },
        heading: {
          css: {
            fontFamily: 'Playfair Display, serif',
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [require('@tailwindcss/typography'), require('flowbite/plugin')],
}
