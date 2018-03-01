//
//
//
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  
  entry:  {
    'fsa-style': './src/index.js'
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
    new ExtractTextPlugin({ filename: 'css/[name].css' }),
    new HTMLWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      options:{
        title: 'FSA Style'
      }
    }),
    new CopyWebpackPlugin([
      {
        from: './src/js',
        to: './js/'
      },
      {
        from: './src/img',
        to: './img/'
      }
    ]),
  ]
};