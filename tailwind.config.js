/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Roboto", "Arial", "sans-serif"],
    },
    extend: {
      screens: {
        sm: "375px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        primary: "#148FB6",
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

        // dark: {
        //   100: "#272627",
        //   // 200: "#FFEAB3",
        //   300: "#171617",
        //   // ...
        // },
      },
    },
  },
  plugins: [],
};
