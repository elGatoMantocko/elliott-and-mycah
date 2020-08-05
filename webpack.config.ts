import { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'production',
  devtool: 'inline-source-map',
  optimization: {
    providedExports: true,
    removeAvailableModules: true,
    usedExports: true,
  },
  module: {
    rules: [
      {
        test: /.mjs$/,
        type: 'javascript/auto',
      },
    ],
  },
};

module.exports = config;
