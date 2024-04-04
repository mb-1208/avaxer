/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "998px",
      xl: "1200px",
    },
    colors: {
      red: "#E31C23",
      gray: "#7A7773",
      white: "#fff",
      black: "#000",
      gray: "#7A7773",
      "dark-black": "##010203",
    },
    fontFamily: {
      primary: ["Poppins", "sans-serif"],
      secondary: ["Roboto Flex", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
