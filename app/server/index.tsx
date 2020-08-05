import * as engines from 'consolidate';
import * as express from 'express';
import * as helmet from 'helmet';
import * as path from 'path';
import * as pino from 'pino-http';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { AppConfig } from './types';

/**
 * Function to do something stupid
 * @param {Envrionment} env environment to run in
 * @param {EnvOption[]} configs list of configs used to run
 * @return {Server} http server built by express
 */
export function startServer({ port, paths, loggingOptions = {}, staticRoot }: AppConfig) {
  const app = express();

  // put on your helmet
  app.use(helmet());

  app.set('views', path.resolve(__dirname, '..', 'layouts'));
  app.set('view engine', 'hbs');
  app.set('view cache', true);
  app.engine('hbs', (file, opts, cb) => {
    const unreacted = Object.entries(opts).map(([key, value]) => [
      key,
      (React.isValidElement(value) && renderToString(value)) || value,
    ]);
    engines.handlebars(file, Object.fromEntries(unreacted), cb);
  });

  // serve static assets
  staticRoot && app.use(express.static(staticRoot));

  // setup logger given options
  if (typeof loggingOptions === 'function') {
    app.use(pino(loggingOptions('development')));
  } else {
    app.use(pino(loggingOptions));
  }

  // build request routes
  paths.forEach(({ path, handler }) => app.get(path, handler));

  // listen on `port`
  return app.listen(port, () => console.log(`server started at port http://localhost:${port}`));
}
