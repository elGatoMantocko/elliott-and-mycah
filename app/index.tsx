import * as minimist from 'minimist';
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { startServer } from './server/index';

const { host, port } = minimist(process.argv.slice(2), {
  default: {
    host: 'localhost',
    port: '8080',
  },
});

startServer({
  host,
  port: Number(port),
  secure: false,
  paths: [
    {
      path: ['/', '/about', '/wedding-party', '/venue'],
      handler: (_, res) => {
        res.render('default', {
          title: '6/12/21 &ndash; Mycah &amp; Elliott',
          body: <div id="root"></div>,
        });
      },
    },
  ],
  loggingOptions: {
    genReqId: () => uuidv4(),
  },
  staticRoot: 'app',
});
