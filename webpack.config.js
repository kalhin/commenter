const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    bundle: "./src/index.js",
    bundle: "./src/scss/main.scss"
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
      // {
      //   test: /\.(sass|scss)$/,
      //   include: path.resolve(__dirname, "src/scss"),
      //   use: ExtractTextPlugin.extract({
      //     use: [
      //       {
      //         loader: "css-loader",
      //         options: {
      //           sourceMap: true,
      //           minimize: true,
      //           url: false
      //         }
      //       },
      //       {
      //         loader: "sass-loader",
      //         options: {
      //           sourceMap: true
      //         }
      //       }
      //     ]
      //   })
      // }
    ]
  },
  devServer: {
    overlay: true
  },
  // plugins: [
  //   new ExtractTextPlugin({
  //     filename: "./css/style.bundle.css",
  //     allChunks: true
  //   })
  // ]
};
