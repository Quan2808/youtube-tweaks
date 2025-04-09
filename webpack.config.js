const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ZipPlugin = require("zip-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: argv.mode || "development",
    devtool: isProduction ? false : "inline-source-map",
    entry: {
      background: "./src/background/background.js",
      content: "./src/content/content.js",
      popup: ["./src/popup/popup.js", "./src/popup/popup.css"],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults",
                    useBuiltIns: "usage",
                    corejs: "3.21",
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: "./src/manifest.json", to: "./" },
          { from: "./src/assets", to: "./assets", noErrorOnMissing: true },
          { from: "./src/_locales", to: "./_locales", noErrorOnMissing: true },
        ],
      }),
      new HtmlWebpackPlugin({
        template: "./src/popup/popup.html",
        filename: "popup.html",
        chunks: ["popup"],
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      ...(isProduction
        ? [
            new ZipPlugin({
              filename:
                "youtube-tweaks-v" + require("./package.json").version + ".zip",
            }),
          ]
        : []),
    ],
    resolve: {
      extensions: [".js"],
    },
  };
};
