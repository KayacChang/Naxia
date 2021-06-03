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
        "25": "0.25",
        "40": "0.40",
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
        "1/4": `${100 / 4}%`,
        "1/6": `${100 / 6}%`,
        "1/8": `${100 / 8}%`,
        "1/10": `${100 / 10}%`,
        "1/12": `${100 / 12}%`,
        "1/16": `${100 / 16}%`,
        "1/24": `${100 / 24}%`,
        "2px": "2px",
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
