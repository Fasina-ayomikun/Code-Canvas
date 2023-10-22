/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: " #C13584",
        pink: "#E1306C",
        orange: "#FD1D1D",
        yellow: "#F56040",
        background_color: "#ededed",
        "dark-gray": "#454444",
        "link-blue": "#3897F0",
      },

      boxShadow: {
        menu: "0px 159px 95px rgba(13,12,34,0.01), 0px 71px 71px rgba(13,12,34,0.02), 0px 18px 39px rgba(13,12,34,0.02), 0px 0px 0px rgba(13,12,34,0.02)",
      },
      screens: {
        xs: "400px",
      },
      maxWidth: {
        "10xl": "1680px",
      },
    },
  },
  plugins: [],
};
