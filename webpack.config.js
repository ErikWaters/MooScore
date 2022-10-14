const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const {execSync} = require('child_process')

const gitHash = execSync('git rev-parse --short=8 HEAD').toString().trim()

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/client/index.tsx'),
  output: {
    filename: `[name].${gitHash}.js`,
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    port: 8080,
    host: 'localhost'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/client/index.html'),
    }),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader'},
          { loader: 'css-modules-typescript-loader'},
          { loader: 'css-loader'},
          { loader: 'sass-loader'},
        ],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }]
    }
  }
