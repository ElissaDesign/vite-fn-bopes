/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          300: "#363636",
          200: "#7B7B7B",
          100: "#D9D9D9",
        },
      },
    },
  },
  plugins: [],
};
