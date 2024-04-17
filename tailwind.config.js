/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      "darkGreen": "#32B6AB",
      "gray": "#424444" ,
      "lightGray": "#A5C2BF",
      "red":" #EE4B2B",
    },
    extend: {},
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [],
}
