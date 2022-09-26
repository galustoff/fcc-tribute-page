const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

module.exports = {
  context: path.join(__dirname, "src"),
  entry: {
    index: "./index.js",
  },
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerWebpackPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    port: 4200,
  },
};
