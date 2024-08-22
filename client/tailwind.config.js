<<<<<<< HEAD
module.exports = {
  mode: 'jit',
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
=======
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

>>>>>>> a81eee48cd041d920d23f99580395acb0113de80
