const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');// eslint-disable-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// eslint-disable-line import/no-extraneous-dependencies
const ManifestPlugin = require('webpack-manifest-plugin');// eslint-disable-line import/no-extraneous-dependencies

const { prodPath, srcPath } = require('./path');
const { selectedPreprocessor } = require('./loader');

module.exports = {
  mode: 'development',
  watch: true,
  context: path.resolve(__dirname, srcPath),
  entry: `./${srcPath}/index.tsx`,
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    path: path.resolve(__dirname, prodPath),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    open: true,
    contentBase: './src/index.html',
    //    writeToDisk: true,
    port: 8080,
    historyApiFallback: true, // ! или в коммандной строке * webpack-dev-server --history-api-fallback
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
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: selectedPreprocessor.fileRegexp,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { modules: false, sourceMap: true } },
          /* { loader: 'postcss-loader', options: { sourceMap: true } }, */
          { loader: selectedPreprocessor.loaderName, options: { sourceMap: true } },
        ],
      }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: false,
      template: './public/index.html',
      filename: 'index.html',
      favicon: './public/favicon.ico',
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
      seed: {
        short_name: 'test',
        name: 'test App',
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
  ],
};
