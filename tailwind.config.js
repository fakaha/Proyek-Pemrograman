/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "0px",
        tablet: "425px",
        desktop: "1024px",
        desktopfull: "1400px",
      },
      colors: {
        primary: "#6148FF",
        secondary: "#1C144B",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("daisyui")],
};
