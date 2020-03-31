const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  devtool: "inline-source-map",
  devServer: {
    publicPath: "/",
    port: 3000,
    contentBase: path.join(process.cwd(), "dist"),
    host: "localhost"
  },
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, "src")],
        loader: "babel-loader",
        test: /\.js$/
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
    chunkFilename: "[name].[hash].js",
    filename: "[name].[hash].js"
  },

  mode: "development",

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new CleanWebpackPlugin()
  ]
};
