const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src','index.jsx'), //qual o arquivo de entrada?
  output: { //qual o arquivo de saída?
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: { 
    extensions: ['.js','.jsx'] //quais extensões devem ser consideradas?
  },
  module: {
    rules: [ //o que deve ser feito?
      {
        test: /\.jsx$/,
        exclude: /node_modules/, //ignora a pasta node_modules
        use: 'babel-loader' //converte o .jsx usando o babel-loader
      }
    ]
  }
}