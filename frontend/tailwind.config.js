/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      flexBasis: {
        20: "20%", // flexbasis for the side menu
        80: "80%", // flexbasis for the body
      },
      height: {
        90: "90%",
        96: "24rem", // 24rem equals 384px
      },
      colors: {
        sideMenuBg: "#181818",
        bodyBg: "#ffff",
        titleColor: "#2b2b2b",
        hoverColor: "#262626",
        textColor: "#e2e2e2",
        colorOne: "#f6eff4",
        colorTwo: "#fbf0ef",
        colorThree: "#f1fcf0",
        colorFour: "#fcf8ef",
        gradient: "linear-gradient(rgb(56, 194, 166), rgb(124, 83, 151))",
      },
    },
  },
  plugins: [],
};
