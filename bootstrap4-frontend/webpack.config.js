const path = require('path');
//const webpack = require('webpack'); //to access built-in plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production'


module.exports = {
  mode: 'development',
  entry: [
     path.join(__dirname, 'src/index.js'),
     path.join(__dirname, 'styles/main.scss'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js' //  FIXME: Was:  filename: './dist/output.bundle.js'
  },
  module: {
    rules: [{
      test: /\.(scss)$/,
      use: [
      {
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader', // translates CSS into CommonJS modules
      }, {
        loader: 'postcss-loader', // Run post css actions
        options: {
          plugins: function () { // post css plugins, can be exported to postcss.config.js
            return [
              require('precss'),
              require('autoprefixer')('last 2 version')
            ];
          }
        }
      }, {
        loader: 'sass-loader' // compiles Sass to CSS
      }]

    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};