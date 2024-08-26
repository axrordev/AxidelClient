
module.exports = {
  mode: 'jit',
	darkMode: "class",
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      display: ['group-hover'], // 'group-focus' ni 'group-hover' bilan almashtiring
    },
  },
  plugins: [],
};
