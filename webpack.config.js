var path = require('path');

module.exports = {
  entry: {
    core: './app/index.js',
    ui: './ui/index.js'
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
        test: /\.jsx?$/, 
        loader: 'babel',
        query: {
          optional: ['runtime'],
          stage: 0
        },
        exclude: /(node_modules|bower_components)/
      }
    ]
  }
};