import 'karma-webpack';

import { Config } from 'karma';

import { config as webpackConfig } from './webpack.config';

module.exports = (conf: Config) => {
  delete webpackConfig.entry;
  delete webpackConfig.output;
  webpackConfig.devtool = 'inline-source-map';
  conf.set({
    files: [{ pattern: 'app/**/*test.tsx', watched: false }],
    frameworks: ['webpack', 'mocha'],
    preprocessors: {
      'app/**/*test.tsx': ['webpack', 'sourcemap'],
    },
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
    webpack: { ...webpackConfig, mode: 'development' },
    webpackMiddleware: { watchOptions: { ignored: /node_modules/ } },
  });
};
