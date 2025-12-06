/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#1E1F27",
          primary: "#F6A623",
          cream: "#F5F1E9",
        },
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D8D8D8",
          400: "#A3A3A3",
          500: "#9A9A9A",
          600: "#737373",
          700: "#4F4F4F",
          800: "#262626",
          900: "#0A0A0A",
        },
      },
      fontFamily: {
        display: ["Figtree", "system-ui", "sans-serif"],
        body: ["Nunito Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 40px rgba(0,0,0,0.12)",
        "card-hover": "0 24px 50px rgba(0,0,0,0.18)",
      },
      borderRadius: {
        xl2: "1.5rem",
      },
    },
  },
  plugins: [],
};
