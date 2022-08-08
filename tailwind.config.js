/** @type {import('tailwindcss').Config} */

module.exports = {
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
        inter: ['Inter'],
      },
      fontSize: {
        tiny: '.900rem',
        landingPage: '2.7rem',
      },
      scale: {
        101: '1.01',
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
