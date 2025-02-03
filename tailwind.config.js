/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          xl: "75rem", // 1200px
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        custom:
          "0px 0px 2px 0px rgba(28,28,27,0.12), 0px 2px 4px 0px rgba(52,105,137,0.22)",
      },
      colors: {
        neutral: {
          50: "#f8f8f8",
          100: "#f6f8fa",
          300: "#b5bbca",
          600: "#475569",
          700: "#637681",
          900: "#1c1c1b",
        },
        text: {
          primary: "#18181b",
        },
        teal: {
          50: "#ebf8f9",
          500: "#45c9a9",
          700: "#346989",
        },
        purple: {
          50: "#f7f3ff",
          300: "#c7b6ef",
          400: "#c1a1ff",
          450: "#a386e5",
        },
        blue: {
          700: "#346989",
          800: "#314457",
        },
        red: {
          500: "#ff577a",
        },
        cyan: {
          300: "#8acbe5",
        },
        primary: "#3380f6",
        slate: {
          200: "#cbd1d4",
          300: "#99b4c4",
        },
        success: {
          50: "#e8fbed",
        },
        warning: {
          50: "#fff3e8",
        },
      },
    },
  },
  plugins: [],
};
