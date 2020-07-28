import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { startServer } from './server/index';

startServer({
  port: 8080,
  paths: [
    {
      path: '/*',
      handler: (req, res) => {
        res.render('default', {
          title: 'test',
          body: <div id="root"></div>,
        });
      },
    },
  ],
  loggingOptions: {
    genReqId: () => uuidv4(),
  },
  staticRoot: 'app/bundle',
});
