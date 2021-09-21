module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      white: '#FFFFFF',
      black: '#000000',

      ice900: '#FCFDFF',
      ice800: '#E8F8E8',

      gray900: '#787880',
      gray800: '#414141',
      gray700: '#5A5A66',
      gray600: '#BFBFCC',
      gray500: '#F0F2F5',

      orange900: '#F1972C',

      green900: '#36B236',

      red900: '#EB3B35'

    },
    fontFamily: {
      ibm: ['IBM Plex Sans', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
