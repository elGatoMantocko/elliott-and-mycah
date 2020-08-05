import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { startServer } from './server/index';

startServer({
  port: 8080,
  paths: [
    {
      path: ['/', '/home'],
      handler: (_, res) => {
        res.render('default', {
          title: 'Mycah &amp; Elliott',
          body: <div id="root"></div>,
        });
      },
    },
  ],
  loggingOptions: {
    genReqId: () => uuidv4(),
  },
  staticRoot: 'app/assets',
});
