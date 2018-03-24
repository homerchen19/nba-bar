const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const baseConfig = require('./webpack.config.base');

const config = merge(baseConfig, {
  mode: 'development',

  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    path.resolve(__dirname, 'src/index.js'),
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080/dist/'
        : '/dist/',
    filename: 'bundle.js',
  },

  plugins: [
    new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    hot: true,
    historyApiFallback: true,
    inline: true,
  },
});

module.exports = config;
