var path = require("path");
const webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var VueLoaderPlugin = require("vue-loader/lib/plugin");

var config = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname + "/dist"), //打包生成文件地址
    filename: "[name].build.js", //生成文件ming
    publicPath: "/dist/", //文件输出的公共路径
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        include: path.resolve(__dirname + "/src"),
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["env"],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        include: path.resolve(__dirname + "/src/"),
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: "url-loader",
        include: path.resolve(__dirname + "/src/"),
        exclude: /node_modules/,
      },
      { test: /\.vue$/, loader: "vue-loader" },
      { test: /\.vue\.html$/, loader: "vue-loader" },
      {
        test: /\.sass$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname + "/src/"),
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".json", ".css"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "src"),
      components: path.resolve(__dirname, "/src/components"),
      utils: path.resolve(__dirname + "/src/utils"),
    },
    modules: ["node_modules"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      chunks: ["main"],
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
module.exports = config;
