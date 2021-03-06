const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/pages/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },

      {
        test: /\.(png|svg|jpg|gif|woff2|woff)$/,
        loader: 'file-loader'
      },

      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
          test: /\.css$/i,
          loader:  [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader']
      }
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin()
  ]
};