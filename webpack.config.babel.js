
import path from 'path';
import webpack from 'webpack';
// var path = require('path');
// var webpack = require('webpack');


/**
 *
 */
export default function (options) {
// module.exports = function (options) {
  // Source and output paths
  const sourcePath = path.join(__dirname, 'script/library');
  let outputPath;

  let devtool;
  const plugins = [];

  // Define environment variables see: https://github.com/petehunt/webpack-howto#6-feature-flags
  plugins.push(new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
    __RELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_RELEASE || 'false')),
  }));

  // Configure common chunks
  plugins.push(new webpack.optimize.CommonsChunkPlugin(
    {
      name: 'common',
      filename: 'common.bundle.js',
    }
  ));

  // Trace options
  Object.keys(options).forEach((key) => { console.log(`${key} ${options[key]}`); });

  // console.log('prop1 = ' + options.prop1 + ' // prop2 = ' + options.prop2);
  // console.log('process.env.BUILD_DEV = ' + JSON.stringify(JSON.parse(process.env.BUILD_DEV)));
  // console.log('process.env.BUILD_PRERELEASE = ' + JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE)));
  // console.log('process.env.BUILD_RELEASE = ' + JSON.stringify(JSON.parse(process.env.BUILD_RELEASE)));

  // Custom configurations based on build type
  switch (options.BUILD_TYPE) {
    case 'development':
      devtool = 'cheap-source-map';
      outputPath = path.join(__dirname, 'script/deploy');
      break;

    case 'production':
      devtool = 'source-map';
      outputPath = path.join(__dirname, '../release/script/deploy');
      // Set env into production - puts react into release mode (streamline)
      plugins.push(new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }));
      // Configure uglify plugin
      plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false, // Suppress the output from uglify during build
        },
        output: {
          comments: false,
        },
        minify: true,
      }));
      break;

    default:
      throw (new Error('Build type is not recognised. Valid types = ["development", "production"]'));
  }

  // Configure and return the configuration object
  return {
    entry: {
      bundle: path.join(sourcePath, 'index.jsx'),
      common: ['react', 'react-dom'],
    },
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
          loader: 'babel-loader',
          options: {
            // 1. Ignoring babel presets and redeclaring to be able to use ES6 webpack config. [see https://github.com/webpack/webpack/issues/1403#issuecomment-244814526]
            // 2. Might only want this for production / release
            babelrc: false, // 1.
            cacheDirectory: true,
            minified: true, // 2.
            presets: [
              ['es2015', {
                modules: false,
              }],
              'stage-2',
              'react'], // 1.
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        'node_modules',
        path.resolve(__dirname, 'script/library'),
      ],
    },
    plugins,
    devtool,
  };
}
