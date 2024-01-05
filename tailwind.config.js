/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Manrope", "Arial", "sans-serif"],
    },
    extend: {
      screens: {
        sm: "375px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        primary: "#3359DF",
        secondary: "#173B3F",
        "light-bg": "#F9F9FB",
        "light-text": "#111827",
        "header-text": "#173B3F",
        "dark-text-fill": "#F3F4F6",
        "dark-bg": "#1F2A37",
        "dark-frame-bg": "#262E3D",
        "dark-tertiary": "#374151",
        "divider-bg": "#E5E7EB",
        "dark-45": "#00000073",
        "border-dark": "#5f5b5b80",

        // background
        "bg-primary": "#E6E6E6",
        "bg-white": "#FFF",

        // font colors
        gray: {
          100: "#555555",
          300: "#606060",
          600: "#363636",
        },
        // border color
        "border-color": "#B4C7DB",
      },
    },
  },
  plugins: [],
};
