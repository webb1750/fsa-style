var webpack = require('webpack');
var path = require('path');
var $ = require("jquery");
var WebpackDevServer = require('webpack-dev-server');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

var ENV = process.env.NODE_ENV;
// Create multiple instances ???
//const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
//const extractSCSS = new ExtractTextPlugin('stylesheets/[name]-two.css');


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
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { 
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /jquery/,
        use: [
          {
            loader: require("imports-loader?$=jquery")
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract(
          {
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true
                }
              },{
                loader: 'style-loader'
              }
            ],
            fallback: 'style-loader'
          }
        )
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'sass-loader'
            }            
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './img/',
              name: '[name].[ext]',
              limit: 50000
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './img/',
              name: '[name].[ext]',
              limit: 50000
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './fonts/',
              name: '[name].[ext]',
              limit: 50000
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new HTMLWebpackPlugin({
      template: 'src/index.html'
    }),
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
