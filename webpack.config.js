const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const phase = process.env.NODE_ENV;

const PATH = {
  src: path.resolve(__dirname, 'src'),
  node_modules: path.resolve(__dirname, 'node_modules'),
  dist: path.resolve(__dirname, 'dist')
}

module.exports = {
  mode: 'development',
  entry: {
    'jstash': PATH.src
  },
  output: {
    path: PATH.dist,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.hbs$/i,
        use: [
          {
            loader: 'handlebars-loader'
          },
          {
            loader: 'html-minifier-loader',
            options: {
              ignoreCustomFragments: [/\{\{\{[^}]+\}\}\}/, /\{\{[^}]+\}\}/]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Ui Console Demo',
      template: 'public/index.html',
      inject: true,
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.json', '.css']
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    hot: true,
    historyApiFallback: true
  }
}