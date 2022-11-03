/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  important: false,
  mode: 'jit',
  content: [
    './pages/*.tsx',
    './pages/**/*.tsx',
    './pages/**/**/*.tsx',
    './components/*.tsx',
    './components/**/*.tsx',
    './components/**/**/*.tsx',
    './components/**/**/**/*.tsx',
  ],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    // fill: theme => ({
    //   blue: theme('colors.blue.400'),
    //   gray: theme('colors.gray.400'),
    // }),

    textIndent: (theme, { negative }) => ({
      ...{
        no: '0rem',
        sm: '2rem',
        md: '3rem',
        lg: '4rem',
      },
    }),
    screens: {
      xs: '450px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },

    extend: {
      zIndex: {
        90: '90',
      },
      fontFamily: {
        // inter: ['Inter'],
        sans: ['Inter', ...fontFamily.sans],
      },
      fontSize: {
        tiny: '.900rem',
        landingPage: '2.7rem',
      },
      scale: {
        101: '1.01',
      },
      colors: {
        apple: {
          gray1: '#8e8e93',
          gray2: '#aeaeb2',
          gray3: '#c7c7cc',
          gray4: '#d1d1d6',
          gray5: '#e5e5ea',
          gray6: '#f2f2f7',
        },
      },
    },
  },

  //this variants can be deleted
  variants: {
    extend: {
      fill: ['hover', 'focus'],
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-radix')({
      variantPrefix: 'rdx',
    }),
    require('tailwindcss-text-indent')(),
    require('@tailwindcss/forms')({
      strategy: 'classop',
    }),
  ],
};
