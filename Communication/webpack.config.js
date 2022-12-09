const path = require('path');

module.exports = {
  entry: './RxJS/test.js',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  experiments: {
    asyncWebAssembly: true,
    buildHttp: true,
    layers: true,
    lazyCompilation: true,
    outputModule: true,
    syncWebAssembly: true,
    topLevelAwait: true,
  },
};