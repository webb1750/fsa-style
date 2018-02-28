//
//
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');


var baseConfig = {
  entry:  {
    'fsa-style': './src/index.js'
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve('./dist')
  },

  plugins:[
    new CleanWebpackPlugin(['./dist/']),
    new HTMLWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      options:{
        title: 'FSA Style'
      }
    })
  ]
};

module.exports = baseConfig;
