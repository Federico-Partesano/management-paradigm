const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  resolve: {
    //must include js files to support the layer compiled files
    extensions: ['.mjs', '.json', '.ts', '.js'],
    symlinks: false,
    cacheWithContext: false,
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@typings': path.resolve(__dirname, 'src/typings'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@controllers': path.resolve(__dirname, 'src/controllers'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@middlewares': path.resolve(__dirname, 'src/middlewares'),
      // "@resources": path.resolve(__dirname, "resources"),
    },
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  externals: [nodeExternals()],
  // externals: [nodeExternals()] tells
  // Webpack not to bundle external dependencies, thus
  // the generated JavaScript file will only contain your code.
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        options: {
          // disable type checker - we will use it in fork plugin
          configFile: 'tsconfig-build.json',
          transpileOnly: true,
          experimentalWatchApi: true,
        },
        exclude: [
          [
            //these files will not be handled by ts-loader
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
      },
    ],
  },
  //Copies individual files or entire directories, which already exist, to the build directory.
  //needed to copy in the build directory all files that are not builded by typescript (like apple key files)
  plugins: [
    new ForkTsCheckerWebpackPlugin({ typescript: { tsconfig: 'tsconfig.json' } }),
  ],
};
