/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          400: "#4caf50",
          500: "#388e3c",
          600: "#2c6b2f",
        },
        pink: {
          600: "#d81b60",
        },
        yellow: {
          300: "#fdd835",
        },
      },
    },
  },
  plugins: [],
};
