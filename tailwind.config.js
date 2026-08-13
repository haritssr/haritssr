/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  future: {
    hoverOnlyWhenSupported: true,
  },
  important: false,

  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-radix")({
      variantPrefix: "rdx",
    }),
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("tailwindcss-animate"),
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      fontSize: {
        landingPage: "2.7rem",
        tiny: ".900rem",
      },
      scale: {
        98: "0.98",
        101: "1.01",
      },
      zIndex: {
        90: "90",
      },
    },
    screens: {
      "2xl": "1536px",
      lg: "1024px",
      md: "768px",
      sm: "640px",
      xl: "1280px",
      xs: "450px",
    },
  },
};
