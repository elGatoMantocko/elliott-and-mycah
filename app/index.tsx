import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './components/App';

// istanbul ignore next
createRoot(document.getElementById('root') ?? document.createElement('div')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
