const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = ({ isDev, analyze, outputDir, hashes }) => {
  return {

    target: 'web',
    mode: isDev ? 'development' : 'production',

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
      new webpack.EnvironmentPlugin({
        SERVER_URL: 'http://localhost:3001'
      })
    ]
  };
};
