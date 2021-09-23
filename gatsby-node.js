const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [new NodePolyfillPlugin()],
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, 'src/components'),
        "@elements": path.resolve(__dirname, 'src/elements'),
        "@partials": path.resolve(__dirname, 'src/partials'),
        "@images": path.resolve(__dirname, 'src/images'),
        "@styles": path.resolve(__dirname, 'src/styles'),
        "@util": path.resolve(__dirname, 'src/util'),
        "@assets": path.resolve(__dirname, 'src/assets'),
        "@static": path.resolve(__dirname, 'src/static')
      },
    },
  });
};
