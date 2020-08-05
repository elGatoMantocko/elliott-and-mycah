import * as parseArgs from 'minimist';
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { startServer } from './server/index';

const { development } = parseArgs(process.argv.slice(2));

startServer({
  port: 8080,
  paths: [
    {
      path: ['/', '/home'],
      handler: (_, res) => {
        res.render('default', {
          title: 'Mycah &amp; Elliott',
          body: <div id="root"></div>,
          development,
        });
      },
    },
  ],
  loggingOptions: {
    genReqId: () => uuidv4(),
  },
  staticRoot: 'app/assets',
});
