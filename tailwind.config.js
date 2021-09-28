module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      outline: {
        red: '1px solid #eb3b35',
      },
    },
    maxWidth: {
      wild: '1120px',
    },
    maxHeight: {
      profilebox: '556px',
    },
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      hover: '#F1F1F1',

      ice900: '#FCFDFF',

      gray900: '#787880',
      gray800: '#41414C',
      gray700: '#5A5A66',
      gray600: '#BFBFCC',
      gray500: '#E1E3E5',
      gray400: '#F0F2F5',

      border900: '#4F4F5B',

      orange900: '#F1972C',
      orange800: '#FFB45B',

      green900: '#36B236',
      green100: '#E8F8E8',

      red900: '#EB3B35',
      red100: '#FAECEB',
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
