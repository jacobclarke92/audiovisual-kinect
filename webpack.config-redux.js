var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    redux: [
      'webpack-dev-server/client?http://localhost:5600',
      'webpack/hot/only-dev-server',
      './app-redux/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'webroot', 'js'),
    filename: '[name].js',
    publicPath: '/webroot/js/'     
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.jsx?$/, 
        loader: 'babel',
        query: {
          optional: ['runtime'],
          stage: 0
        },
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl'
      }
    ]
  }
};