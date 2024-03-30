/* istanbul ignore file */

import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './components/App';

const el = document.createElement('div');
createRoot(el).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
document.body.append(el);
