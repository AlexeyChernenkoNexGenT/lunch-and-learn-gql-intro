const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/type-gql/index.ts',
  devtool: 'source-map',
  target: 'node',
  mode: 'development',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
