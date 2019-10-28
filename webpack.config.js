const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    bundle: "./src/index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      },
    //   {
    //     test: /\.css$/,
    //     use: ["css-loader", MiniCssExtractPlugin.loader]
    //   }
    ]
  },
  devServer: {
    overlay: true
  },
//   plugins: [
//     new MiniCssExtractPlugin({
//       filename: "[name].css"
//     })
//   ]
};
