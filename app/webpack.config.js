const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = ({ env }) => {
  return {

    target: 'web',

    entry: {
      index: './src/index.tsx',
    },
    devtool: 'inline-source-map',
    devServer: {
      static: './dist',
      port: 3000,
    },

    resolve: {
      extensions: [".tsx", ".ts", ".js"],
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
            use: ["babel-loader"],
        },
        {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: ["ts-loader"],
        },
        {
            test: /\.(css|scss)$/,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
            use: ["file-loader"],
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
        SERVER_URL: (env === 'production') ? 'https://vogetio-server-g56q77hy2a-uc.a.run.app' : 'http://localhost:3001'
      }),
      new webpack.ProvidePlugin({
        Buffer: [require.resolve("buffer/"), "Buffer"],
      }),
    ]
  };
};
