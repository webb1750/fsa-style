//
//
//
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {

  mode: 'production',

  output: {
    path: path.resolve('./dist'),
    filename: '[name].bundle.js'    
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {minimize: true}
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [autoprefixer(
                  {
                    grid: true
                  }
                )];
              },
              sourceMap: true
            }
          },
          'sass-loader'           
        ]
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CleanWebpackPlugin(['./dist/']),
  ]
});