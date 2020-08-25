const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');// eslint-disable-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// eslint-disable-line import/no-extraneous-dependencies
const ManifestPlugin = require('webpack-manifest-plugin');// eslint-disable-line import/no-extraneous-dependencies
const WebpackMd5Hash = require('webpack-md5-hash');// eslint-disable-line import/no-extraneous-dependencies
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// eslint-disable-line import/no-extraneous-dependencies
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies

const { prodPath, srcPath } = require('./path');
const { selectedPreprocessor } = require('./loader');

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, srcPath),
  entry: `./${srcPath}/index.tsx`,
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    path: path.resolve(__dirname, prodPath),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      { test: /\.ts?|.tsx?$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.ts?|.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.(png|svg|jpg|gif|jpe?g)$/, exclude: /node_modules/,
        use: [
          {
            options: {
              name: "[name].[ext]",
              outputPath: "images/"
            },
            loader: "file-loader"
          }
        ]
      },
      {
        test: selectedPreprocessor.fileRegexp,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          /* { loader: 'postcss-loader' }, */
          { loader: selectedPreprocessor.loaderName },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist'],
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './public/index.html',
      favicon: './public/favicon.ico',
      filename: 'index.html',
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
      seed: {
        short_name: 'Octa test',
        name: 'Octa test App Sample',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '32x32',
            type: 'image/x-icon',
          },
        ],
        start_url: '.',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#ffffff',
      },
      map: (file) => {
        const lFile = file;
        lFile.name = file.name.replace(/(\.[a-f0-9]{32})(\..*)$/, '$2');
        return lFile;
      },
    }),
    new WebpackMd5Hash(),
  ],
};
