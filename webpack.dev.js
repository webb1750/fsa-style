var webpack = require('webpack');
var path = require('path');
var $ = require("jquery");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackDevServer = require('webpack-dev-server');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var ENV = process.env.NODE_ENV;

// Create multiple instances ???
//const extractCSS = new ExtractTextPlugin('css/[name].css');
//const extractJS = new ExtractTextPlugin('js/[name].js');


var baseConfig = {
  entry:  {
    'fsa-style': './src/index.js'
  },

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    watchContentBase: true,
    publicPath: '/',
    port: 8888,
    hot: true,
    open: true
  },

  devtool: 'source-map',

  output: {
    filename: '[name].bundle.js',
    path: path.resolve('./dist')
  },

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
        test: require.resolve("jquery"),
        use: [
          {
            loader: "imports-loader?$=jquery"
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ENV === 'production' ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true
                }
              },
              {
                loader: 'postcss-loader'
              }
            ]
          })            
          : ['style-loader','css-loader']
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: true
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
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: '/img/',
              name: '[name].[ext]',
              limit: 100000
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
              outputPath: '/fonts/',
              name: '[name].[ext]',
              limit: 100000
            }
          }
        ]
      }
    ]
  },

  plugins:[
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),
    new ExtractTextPlugin({ filename: 'css/[name].css' }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      uglifyOptions: {
        ecma: 8,
        warnings: false,
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        },
        output: {
          comments: false,
          beautify: false
        },
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: false,
      },
      sourceMap: true
    }),
    new StyleLintPlugin({
      context: './src/stylesheets/fsa-style.scss'
    }),
    new HTMLWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      options:{
        title: 'FSA Style'
      }
    }),
    new CleanWebpackPlugin(['./dist/']),
    new CopyWebpackPlugin([
      {
        from: './src/js',
        to: './js/'
      }
    ]),   
  ]
};

module.exports = baseConfig;
