/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}"], // Specify content files for Tailwind CSS
  theme: {
    extend: {
      flexBasis: {
        20: "20%", // flex-basis for the side menu
        80: "80%", // flex-basis for the body
      },
      height: {
        90: "90%", // 90% height
        96: "24rem", // 24rem equals 384px
      },
      colors: {
        sideMenuBg: "#181818", // Background color for side menu
        bodyBg: "#ffff", // Background color for body
        titleColor: "#2b2b2b", // Color for titles
        hoverColor: "#262626", // Color for hover states
        textColor: "#e2e2e2", // Color for text
        colorOne: "#f6eff4", // Custom color
        colorTwo: "#fbf0ef", // Custom color
        colorThree: "#f1fcf0", // Custom color
        colorFour: "#fcf8ef", // Custom color
        gradient: "linear-gradient(rgb(56, 194, 166), rgb(124, 83, 151))", // Gradient color
      },
    },
  },
  plugins: [],
};
