const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const isDev = process.env.NODE_ENV !== "production";

const config = {
  mode: isDev ? "development" : "production",
  entry: "./src/game/app.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: "src/index.html", to: "index.html" }],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8889,
    hot: true,
  },
  optimization: {
    minimize: !isDev,
  },
};

module.exports = config;
