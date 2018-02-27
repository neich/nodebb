var debug = process.env.NODE_ENV !== 'production';
const path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? 'inline-sourcemap' : null,
  entry: [
      'font-awesome-loader',
      path.join(__dirname, 'js/main.js')
  ],
  output: {
    path: __dirname,
    filename: 'js/main.min.js'
  },
  plugins: debug ? [new webpack.ProvidePlugin({
      $ : 'jquery',
      Backbone : 'backbone',
      _ : 'underscore'
    })] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.ProvidePlugin({
        $ : 'jquery',
        Backbone : 'backbone',
        _ : 'underscore'
      })
    ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&name=fonts/[name].[ext]',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader?name=fonts/[name].[ext]',
      },

      { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
      { test: /backbone/, loader: 'imports-loader?_=underscore,jQuery=jquery' }


    ]
  }
};