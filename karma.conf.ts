import 'karma-webpack';

import { Config } from 'karma';

import { factory } from './webpack.config';

// use puppeteer to find the path to the chrome test runner
// eslint-disable-next-line @typescript-eslint/no-var-requires
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = (conf: Config) => {
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
    webpack: factory({
      noSW: true,
      mode: 'development',
      devtool: 'inline-source-map',
      noOutput: true,
    }),
    webpackMiddleware: {
      watchOptions: { ignored: /node_modules/ },
    },
  });
};
