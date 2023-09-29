const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
        filename: 'index.html'
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'sw.js'
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Clean and simple text editor.',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 144],
            destination: path.join('assets', 'icons'),
          },
          {
            src: path.resolve('src/images/logo.png'),
            size: 512, 
            destination: path.join('assets', 'icons'),
            purpose: 'maskable',
          },
          // {
          //   src: path.resolve('favicon.ico'),
          //   size: 48
          // }
        ]
      }),
      new CopyPlugin({
        patterns: [
          { from: "favicon.ico", to: "favicon.ico" },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        }
      ],
    },
  };
};
