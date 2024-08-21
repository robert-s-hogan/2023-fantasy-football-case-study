const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // Disable linting during build
  configureWebpack: {
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm-bundler.js", // Use the esm-bundler build of Vue
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true), // Enable or disable Options API
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false), // Disable devtools in production
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // Fix hydration mismatch warning
      }),
    ],
  },
});
