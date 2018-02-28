//
//
//
const path = require('path');
const merge = require('webpack-merge');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  
  devtool: 'source-map',
  
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    watchContentBase: true,
    publicPath: '/',
    port: 8888,
    hot: true,
    inline: true,
    open: true
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader','css-loader']
      },
    ]
  },

  plugins: [
    new StyleLintPlugin({
      context: '../src/stylesheets/fsa-style.scss'
    }),
    new CopyWebpackPlugin([
      {
        from: './src/js',
        to: './js/'
      }
    ]),
  ]
});