const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = env => {
  const isProduction = env === 'prod';

  return {
    mode: isProduction ? 'production' : 'development',
    devtool: !isProduction && 'cheap-module-source-map',

    entry: './src/index',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'assets/js/[name].[contenthash:8].js',
      publicPath: '/',
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    module: {
      rules: [
        {
          test: /\.(tsx?)|(js)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        },
        {
          test: /\.s?css$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-modules-typescript-loader' },
            { loader: 'css-loader', options: { modules: true } },
            { loader: 'sass-loader' },
          ]
        },
      ]
    },

    plugins: [
      isProduction && new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[contenthash:8].css',
        chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css'
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        inject: true,
      })
    ].filter(Boolean),

    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            compress: {
              comparisons: false
            },
            mangle: {
              safari10: true
            },
            output: {
              comments: false,
              ascii_only: true
            },
            warnings: false
          }
        }),
        new OptimizeCssAssetsPlugin()
      ]
    },

    devServer: {
      compress: true,
      historyApiFallback: true,
      open: true,
      overlay: true
    }
  }
};
