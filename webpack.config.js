var path = require('path');

module.exports = {
  entry: {
    core: './app/index.js',
    ui: './ui/index.jsx'
  },
  output: {
    path: './webroot/js',
    filename: '[name].js'       
  },
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel',
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.jsx$/, 
        exclude: /node_modules/, 
        loader: 'babel',
        include: path.join(__dirname, 'ui')
      }
    ]
  }
};