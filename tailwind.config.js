/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryTextColor: "#EAEAEA",
        primaryPurple: "#5E2E53",
        secondaryPurple: "#E1A1E9",
        itemTextColor: "#000000",
      },
      fontFamily: {
        primaryFont: ["Ubuntu", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        racing: ["Racing Sans One", "sans-serif"],
      },
      backgroundImage: {
        splashImage: "url('/src/assets/splash-image.jpg')",
      },
    },
  },
  plugins: [],
};
