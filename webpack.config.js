const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './src/index.js',

  devServer: {
    contentBase: './public',
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new CopyWebpackPlugin([{ from: './public/models', to: 'models' }]),
  ],
};
