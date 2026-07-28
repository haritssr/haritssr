/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  future: {
    hoverOnlyWhenSupported: true,
  },
  important: false,
  theme: {
    screens: {
      xs: "450px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      zIndex: {
        90: "90",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      fontSize: {
        tiny: ".900rem",
        landingPage: "2.7rem",
      },
      scale: {
        98: "0.98",
        101: "1.01",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },

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
};
