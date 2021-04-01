module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    objectPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
     'left-bottom': 'left bottom',
     'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
     'center-bottom': 'center bottom',
     'center-top': 'center top',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
