'use strict';
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin") // 压缩css代码
const webpack = require('webpack')

const path = require('path')
const resolve = dir => path.resolve(__dirname, dir);
module.exports = {
  entry: {
    index: './src/index.js',
    seacher: './src/seach.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader'
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.less$/,
        use: ExtractTextPlugin.extract( [
            'css-loader',
            'less-loader'
          ]
        )
      },
      {
        test: /.(png|jpeg|jpg|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240
          }
        }]
      },
    ]
  },
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/seach.html',
      filename: 'index.html', //打包后的文件名
      chunks: ['index']  //只引入index js 不写的话就会把所有打包的js引入
    }),
    new HtmlWebpackPlugin({
      template: './public/seach.html',
      filename: 'search.html', //打包后的文件名
      chunks: ['seacher']
    }),
    new ExtractTextPlugin ({
      filename: 'css/[name].css',
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
}