var path = require('path');
module.exports = [{
  name: 'js',
  entry: './src/js/entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'src/js'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: path.join(__dirname, 'src/css'),
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  resolve: {
    //modulesDirectories: ['node_modules']
  },
  devtool: 'source-map'
}];