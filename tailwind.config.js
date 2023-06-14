/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "Arial", "sans-serif"],
    },
    extend: {
      colors: {
        gray: {
          300: "#363636",
          200: "#7B7B7B",
          100: "#D9D9D9",
        },
        white: {
          100: "#B4C7DB",
          200: "#B4C7DB",
          300: "#FFFFFF",
        },
        blue: "#3359DF",
        primary: {
          100: "#E6F6FF",
          200: "#B3E0FF",
          300: "#80C9FF",
          // ...
        },
        secondary: {
          100: "#FFF9E6",
          200: "#FFEAB3",
          300: "#FFD680",
          // ...
        },
        dark: {
          100: "#272627",
          // 200: "#FFEAB3",
          300: "#171617",
          // ...
        },
      },
    },
  },
  plugins: [],
};
