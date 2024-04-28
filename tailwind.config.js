/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
	darkMode: "class",
	future: {
		hoverOnlyWhenSupported: true,
	},
	important: false,
	content: [
		"./pages/*.tsx",
		"./pages/**/*.tsx",
		"./pages/**/**/*.tsx",
		"./components/*.tsx",
		"./components/**/*.tsx",
		"./app/**/*.{ts,tsx}",
		"./content/**/*.mdx",
	],
	theme: {
		textIndent: (theme, { negative }) => ({
			...{
				no: "0rem",
				sm: "2rem",
				md: "3rem",
				lg: "4rem",
			},
		}),
		screens: {
			xs: "450px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},

		extend: {
			colors: {
				action: "#2563eb",
			},
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
				101: "1.01",
				98: "0.98",
			},
		},
	},

	plugins: [
		require("@tailwindcss/typography"),
		require("tailwindcss-radix")({
			variantPrefix: "rdx",
		}),
		require("tailwindcss-text-indent")(),
		require("@tailwindcss/forms")({
			strategy: "classop",
		}),
	],
};
