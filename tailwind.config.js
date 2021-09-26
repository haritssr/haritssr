// const { urlObjectKeys } = require('next/dist/next-server/lib/utils')
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.tsx',
    './components/**/*.tsx',
    './components/*.tsx',
    './components/List/*.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
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
    colors: {
      harislab: '#007AFF',
      black: '#262626',
      white: '#FFFFFF',
      gray: colors.gray,
      red: colors.red,
      orange: colors.orange,
      lime: colors.lime,
      rose: colors.rose,
      yellow: colors.yellow,
      amber: colors.amber,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      sky: colors.sky,
      cyan: colors.cyan,
      blue: colors.blue,
      pink: colors.pink,
      purple: colors.purple,
      indigo: colors.indigo,
      fuschsia: colors.fuchsia,
      violet: colors.violet,
    },
    extend: {
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
      animation: {
        tilt: 'tilt 2s infinite linear',
        blob: 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(20px, -20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, -0px) scale(1)',
          },
        },
        tilt: {
          '0%,50%,100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(1deg)',
          },
          '75&': {
            transform: 'rotate(-1deg)',
          },
        },
        halfSpin: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '50%': {
            transform: 'rotate(150deg)',
          },
          to: {
            transform: 'rotate(0deg)',
          },
        },
      },
    },
  },
  variants: {
    extend: {
      fill: ['hover', 'focus'],
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-text-indent')()],
};
