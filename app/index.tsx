import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components/App';

// istanbul ignore next
ReactDOM.createRoot(document.getElementById('root') ?? document.createElement('div')).render(
  <App />,
);
