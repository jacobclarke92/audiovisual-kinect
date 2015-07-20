var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config-redux.js');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}).listen(5600, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:5600');
});
