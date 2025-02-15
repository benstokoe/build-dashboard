var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './js/web/app'
  ],
  output: {
    path: '/dist/',
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js$/,
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015,presets[]=stage-0'],
        exclude: /node_modules/
      },
      { test: /\.(scss|css)$/, loader: ExtractTextPlugin.extract('css!postcss-loader!sass') },
      { test: /\.(svg|woff2|eot|ttf|woff)$/, loader: 'url-loader?limit=100000'  }
    ]
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('css/app.css')
  ]
};
