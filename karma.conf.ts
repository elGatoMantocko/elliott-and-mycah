import { Config } from 'karma';
import { Configuration } from 'webpack';

import { config as webpackConfig } from './webpack.config';

// HACK(elliott): to fix karma typescript issues the `@types/karma-webpack` module doesn't resolve
declare module 'karma' {
  interface WatchOptions {
    ignored?: string | RegExp | string[];
  }

  interface KarmaWebpackMiddlewareOptions {
    watchOptions?: WatchOptions;
  }

  interface ConfigOptions {
    webpack: Configuration;
    webpackMiddleware: KarmaWebpackMiddlewareOptions;
  }
}

// use puppeteer to find the path to the chrome test runner
// eslint-disable-next-line @typescript-eslint/no-var-requires
process.env.CHROME_BIN = require('puppeteer').executablePath();

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
