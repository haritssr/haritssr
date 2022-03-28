// const { urlObjectKeys } = require('next/dist/next-server/lib/utils')
// const colors = require('tailwindcss/colors');

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
    fill: theme => ({
      blue: theme('colors.blue.400'),
      gray: theme('colors.gray.400'),
    }),
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
      colors: {
        harislab: '#007AFF',
      },
      strokeWidth: {
        1.5: '1.5',
        2: '2',
      },
      zIndex: {
        90: '90',
      },
      animation: {
        'background-spin': 'halfSpin 10s ease-in-out infinite',
      },
      fontFamily: {
        inter: ['Inter'],
        mw: ['Merriweather'],
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
    require('@tailwindcss/forms'),
  ],
};
