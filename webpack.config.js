const path = require('path');

module.exports = {
  mode: 'production',
  
  entry : './src/main.js',

  output : {
    path: path.join(__dirname, "lib"),
    filename: 'ElectronBrowserView.js',
    library: 'ElectronBrowserView',
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: ['.js']
  },

  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: [
                  "@babel/react",
                  "@babel/preset-env"
                ],
            },
        },
    ]
  },
  target: 'electron-renderer',
};