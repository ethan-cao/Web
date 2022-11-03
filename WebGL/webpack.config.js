const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: './src/index.js',
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.js",
    assetModuleFilename: 'assets/[hash][ext][query]'
    // publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        use: [
          'raw-loader',
          'glslify-loader'
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webGL',
      template: 'src/index.html',
      filename: 'index.html'
    }),
  ],
  devtool: "inline-source-map",
  devServer: {
    port: 9000,
    static: "./dist",
    hot: true,
  },
  experiments: {
    topLevelAwait: true,
  },
  optimization: {
    runtimeChunk: "single",
  },
};
