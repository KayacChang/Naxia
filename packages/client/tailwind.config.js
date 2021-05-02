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
        "-100": "-1",
        "115": "1.15",
        "120": "1.2",
      },
      fontFamily: {
        noto: ["Noto Serif TC", "serif"],
      },
      spacing: {
        17: "4.25rem",
        18: "4.5rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
