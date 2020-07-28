import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { App } from './components/App';
import { startServer } from './server/index';

startServer({
  port: 8080,
  paths: [
    {
      path: '/',
      handler: (req, res) => {
        res.render('default', {
          title: 'test',
          body: (
            <App>
              {JSON.stringify(req.query.q || 'hello world!')} to {req.route.path}
            </App>
          ),
        });
      },
    },
  ],
  loggingOptions: {
    genReqId: () => uuidv4(),
  },
  staticRoot: 'app/bundle',
});
