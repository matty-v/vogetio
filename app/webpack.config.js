const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = ({ isProd }) => {
  return {

    target: 'web',
    mode: isProd ? 'production' : 'development',

    entry: {
      index: './src/index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
      static: './dist',
      port: 3000,
    },

    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },

    output: { path: path.resolve(__dirname, "dist") },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: "assets", to: "assets" }
        ],
      }),
      new webpack.EnvironmentPlugin({
        SERVER_URL: isProd ? 'https://vogetio-server-g56q77hy2a-uc.a.run.app' : 'http://localhost:3001'
      })
    ]
  };
};
