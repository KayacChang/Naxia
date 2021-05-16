module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
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
        115: "1.15",
        120: "1.2",
      },
      fontFamily: {
        noto: ["Noto Serif TC", "serif"],
        kai: ["kai", "serif"],
      },
      spacing: {
        17: "4.25rem",
        18: "4.5rem",
      },
      keyframes: {
        ping: {
          "75%, 100%": { transform: "scale(1.4)", opacity: "0" },
        },
      },
      animation: {
        ping: "ping 1s cubic-bezier(0, 0, 0.2, 1)",
        "ping-loop": "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        spin: "spin 10s linear infinite",
      },
      width: {
        54: "13.5rem",
        126: "31.5rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-textshadow"),
    require("@whiterussianstudio/tailwind-easing"),
  ],
};
