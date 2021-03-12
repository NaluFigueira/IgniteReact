const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
   //allows error treatment to consider .jsx file instead of dist folder
  entry: path.resolve(__dirname, 'src','index.jsx'), //which is the input file?
  output: { //which is the input file?
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: { 
    extensions: ['.js','.jsx'] //which extensions are considered?
  },
  devServer: { //creates live server for webpack
    contentBase: path.resolve(__dirname, 'public')
  },
  plugins: [
    new HTMLWebpackPlugin({
      //which template file will generate index.html in dist folder, along
      //with bundle.js
      template: path.resolve(__dirname, 'public', 'index.html'), 
    })
  ],
  module: {
    rules: [ //what Webpack should do?
      {
        test: /\.jsx$/,
        exclude: /node_modules/, //Webpack should ignore node_modules folder
        use: 'babel-loader' //convert .jsx using babel-loader
      },
      {
        test: /\.css$/,
        exclude: /node_modules/, //Webpack should ignore node_modules folder
        use: [
          'style-loader',
          'css-loader'
        ] //convert .css using style-loader and css-loader
      }
    ]
  }
}