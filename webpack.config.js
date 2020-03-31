const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  devtool: "inline-source-map",
  devServer: {
    publicPath: "/",
    port: 3000,
    contentBase: path.join(__dirname, "dist"),
    host: "localhost"
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: { loader: "ts-loader" },
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",

            options: {
              importLoaders: 1,
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist")
  },

  mode: "development",

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CleanWebpackPlugin()
  ]
};
