const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src','index.jsx'), //which is the input file?
  output: { //which is the input file?
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: { 
    extensions: ['.js','.jsx'] //which extensions are considered?
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
      }
    ]
  }
}