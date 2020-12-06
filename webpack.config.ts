import { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'production',
  devtool: 'inline-source-map',
  entry: './app/utils/init.tsx',
  optimization: {
    providedExports: true,
    removeAvailableModules: true,
    usedExports: true,
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,

        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
  },
};

module.exports = config;
