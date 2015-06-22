var path = require('path');

module.exports = {
  entry: ['./app/index.js'],
  output: {
    path: './webroot/js',
    filename: 'scripts.js'       
  },
  resolve: {
    extensions: [ '', '.js' ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel',
        include: path.join(__dirname, 'app')
      }
    ]
  }
};