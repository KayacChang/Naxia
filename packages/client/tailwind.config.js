module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        xxs: ".625rem",
      },
      zIndex: {
        "-10": "-10",
      },
      scale: {
        "115": "1.15",
        "120": "1.2",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
