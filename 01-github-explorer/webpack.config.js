const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
   //allows error treatment to consider .jsx file instead of dist folder
  entry: path.resolve(__dirname, 'src','index.tsx'), //which is the input file?
  output: { //which is the input file?
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: { 
    extensions: ['.js','.jsx', '.ts', '.tsx'] //which extensions are considered?
  },
  devServer: { //creates live server for webpack
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HTMLWebpackPlugin({
      //which template file will generate index.html in dist folder, along
      //with bundle.js
      template: path.resolve(__dirname, 'public', 'index.html'), 
    })
  ].filter(Boolean),
  module: {
    rules: [ //what Webpack should do?
      {
        test: /\.(j|t)sx$/,
        exclude: /node_modules/, //Webpack should ignore node_modules folder
        use: {
          loader: 'babel-loader', //convert .jsx using babel-loader
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel')
            ].filter(Boolean)
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/, //Webpack should ignore node_modules folder
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ] //convert .css using style-loader and css-loader
      }
    ]
  }
}