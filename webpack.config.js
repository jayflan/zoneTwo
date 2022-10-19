const Dotenv = require("dotenv-webpack");

module.exports = {
  plugins: [
    new Dotenv()
  ],
  entry: [
    "./client/index.js"
  ],
  output: {
    path: __dirname,
    filename: "public/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react'
          ],
          plugins: [
            "@babel/plugin-transform-modules-commonjs",
            "inline-react-svg"
          ]
        }
      }
    ]
  }
};