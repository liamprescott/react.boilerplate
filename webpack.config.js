//
//
//
// Please see webpack.config.output.js for output / deployment configuration
//
//
//

var path = require('path');
var webpack = require('webpack');

/* Shortcut target paths */
var srcPath = path.join(__dirname, 'script/library');
var outputPath = path.join(__dirname, 'script/deploy');

/* Define environment variables see: https://github.com/petehunt/webpack-howto#6-feature-flags */
var featureFlagsPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
  __RELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_RELEASE || 'false'))
});

// var featureFlagsPlugin = new webpack.DefinePlugin({
//   __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
//   __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
//   __RELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_RELEASE || 'false')),
//   __SERVICES_ENDPOINT_URL__: JSON.stringify(JSON.parse(process.env.SERVICE_ENDPOINT_URL)
// });


/* Configure webpack export */
module.exports = {
  // watch: true,

  // version: JSON.stringify(JSON.parse(process.env.VERSION || '')),

  entry: {
    bundle: path.join(srcPath, 'index.jsx'),
    // common: ['react', 'react-dom', 'react-redux', 'react-router', 'redux', 'redux-batched-actions', 'redux-thunk'],
    common: ['react', 'react-dom'],
  },

  // output: {
  //   path: outputPath,
  //   publicPath: '/script/deploy/',
  //   chunkFilename: '[id].bundle' + (JSON.stringify(JSON.parse(process.env.VERSION || ''))) + '.js',
  //   filename: '[name]' + (JSON.stringify(JSON.parse(process.env.VERSION || ''))) + '.js',
  // },

  output: {
    path: outputPath,
    publicPath: '/script/deploy/',
    chunkFilename: '[id].bundle.js',
    filename: '[name].js',
    sourceMapFilename: 'sourcemaps/[file].map',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'script/library')],
        // issuer: { test, include, exclude },
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          minified: true, // Might only want this for production / release
          // "presets": [["es2015", { "modules": false }], "stage-2", "react"] // Dont need this (can rely on .babelrc). Alt. add (babelrc: false) and remove .babelrc
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'script/library')
    ],
  },

  plugins: [
    featureFlagsPlugin,
    new webpack.optimize.CommonsChunkPlugin(
      {
        name: 'common',
        filename: 'common.bundle.js'
      }
    ),

  ],

  devtool: 'cheap-source-map',
};


// Output filesize considerations:
// 'SET NODE_ENV=production' required for windows...doesn't look like it makes a difference!
//  "webpack:bundle": "SET NODE_ENV=production&&webpack -p"
//  "webpack:bundle": "webpack -p" //'-p' doesn't seem to make a difference!
// TODO:
// Check out 'https://github.com/petehunt/webpack-howto#user-content-6-feature-flags'
