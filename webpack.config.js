const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const paths = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  popup: path.join(__dirname, 'src', 'popup'),
  background: path.join(__dirname, 'src', 'background'),
};

module.exports = {
  entry: {
    background: paths.background,
    popup: paths.popup,
  },
  output: {
    path: paths.dist,
    filename: '[name].js',
    clean: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(png|svg|jpe?g|gif|csv)$/i,
        type: 'asset/source',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]_[local]__[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js'],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${paths.src}/manifest.json`,
          transform: (content) => {
            const baseManifest = JSON.parse(content);
            const manifest = {
              ...baseManifest,
              version: process.env.npm_package_version,
              description: process.env.npm_package_description,
              host_permissions: [`*://${process.env.DOMAIN}/`],
            };
            return JSON.stringify(manifest, null, 2);
          },
        },
      ],
    }),
    new DefinePlugin({
      'process.env': {
        DOMAIN: JSON.stringify(process.env.DOMAIN || ''),
      },
    }),
    new HtmlWebpackPlugin({
      template: `${paths.popup}/index.html`,
      filename: 'popup.html',
      chunks: ['popup'],
    }),
  ],
};
