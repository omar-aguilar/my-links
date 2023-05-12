const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv');
const path = require('path');
const MergeEntryFilesPlugin = require('./webpack/MergeEntryFilesPlugin');

dotenv.config();

const paths = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  popup: path.join(__dirname, 'src', 'pages', 'popup'),
  resolver: path.join(__dirname, 'src', 'pages', 'resolver'),
  background: path.join(__dirname, 'src', 'background'),
};

const localCSVDBMeta = {
  filename: 'seedDB.csv',
  get localPath() {
    return path.join(__dirname, 'src', 'background', 'data', this.filename);
  },
};

// firefox extension manifest doesn't support background.service_worker
const getFirefoxManifestOverrides = () => {
  if (process.env.BROWSER !== 'firefox') {
    return {};
  }

  return {
    background: {
      scripts: ['background.js'],
    },
  };
};

module.exports = {
  entry: {
    background: paths.background,
    popup: paths.popup,
    resolver: paths.resolver,
  },
  output: {
    path: paths.dist,
    filename: '[name].js',
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
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
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
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
              omnibox: {
                keyword: process.env.DOMAIN,
              },
              version: process.env.npm_package_version,
              description: process.env.npm_package_description,
              ...getFirefoxManifestOverrides(),
            };
            return JSON.stringify(manifest, null, 2);
          },
        },
        {
          from: localCSVDBMeta.localPath,
          noErrorOnMissing: true,
        },
      ],
    }),
    new DefinePlugin({
      'process.env': {
        DOMAIN: JSON.stringify(process.env.DOMAIN || ''),
        CSV_DB_URL: JSON.stringify(process.env.CSV_DB_URL || ''),
        LOCAL_CSV_DB_URL: JSON.stringify(localCSVDBMeta.filename),
      },
    }),
    new HtmlWebpackPlugin({
      template: `${paths.popup}/index.html`,
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      template: `${paths.resolver}/index.html`,
      filename: 'resolver.html',
      chunks: ['resolver'],
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new MergeEntryFilesPlugin({
      entries: ['background'],
    }),
  ],
};
