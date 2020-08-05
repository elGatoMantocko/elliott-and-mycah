import { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'production',
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
