var gulp = require('gulp');
var webpack = require('webpack-stream');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var path = require('path');
var fs = require('fs');

const webpackConfig = {
  mode: 'production',
  output: {
    filename: 'ElectronBrowserView.js',
  },
  resolve: {
      extensions: ['.js']
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/
          },
      ]
  },
  target: 'electron-renderer',
};

gulp.task('build', function () {
  return gulp.src('src/ElectronBrowserView.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('lib/'));
});

gulp.task('watch', function () {
  gulp.watch('src/*.js', ['build']);
});