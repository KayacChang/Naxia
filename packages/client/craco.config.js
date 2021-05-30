module.exports = {
  plugins: [{ plugin: require('craco-esbuild') }],
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
