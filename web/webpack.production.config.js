var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './js/web/app',
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.min.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.(scss|css)$/, loader: ExtractTextPlugin.extract('css!postcss-loader!sass') },
      { test: /\.(svg|woff2|eot|ttf|woff)$/, loader: 'url-loader?limit=100000'  }
    ]
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({}),
    new ExtractTextPlugin('css/app.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};
