var webpack = require('webpack');
var path = require('path');
var WebpackDevServer = require('webpack-dev-server');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

var ENV = process.env.NODE_ENV;

var baseConfig = {
  entry:  {
    'fsa-style': './src/index.js'
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve('./dist')
  },

  devtool: "source-map",
  
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
          {
            use: [  
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              }
            ],
            fallback: 'style-loader'
          }
        )
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          {
            use: [
              { loader: 'css-loader' },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  url: false
                }
              }
            ],
            fallback: 'style-loader'
          }
        )
      },
      {
        test: /\.svg$/,
        use: [
          {
             loader: 'url-loader',
             query: { limit : 10000 }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new HTMLWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    })
  ]
};

if (process.env.NODE_ENV === 'development') {
  console.warn('This warning will dissapear on production build!');
}

if (ENV === 'production') {
  baseConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = baseConfig;
