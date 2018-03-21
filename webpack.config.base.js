const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: 'url-loader?limit=10000',
      },
    ],
  },

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.json'],
  },
  target: 'electron-renderer',
};
