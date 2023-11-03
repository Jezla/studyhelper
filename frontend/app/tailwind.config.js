/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

module.exports = {
  content: ["./src/**/*.{html,js}",
  "./src/components/**/*.{html,js}",
  "./src/pages/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'book': "url(./images/book 1.svg)",
      },
    },
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      orange: colors.orange,
      green: colors.green,
    }
  },
  plugins: [],
}

