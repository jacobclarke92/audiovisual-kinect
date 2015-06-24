var path = require('path');

module.exports = {
  entry: {
    core: './app/index.js',
    ui: './app/ui/index.js'
  },
  output: {
    path: './webroot/js',
    filename: '[name].js'       
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