/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "node_modules/preline/preline.js"],
  darkMode: "class",
  theme: {
    extend: {
      zIndex: {
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
      fontSize: {
        xxs: ".625rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("preline/plugin")],
};
