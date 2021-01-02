import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './components/App';

const app = React.createElement(App);
ReactDOM.render(app, document.getElementById('root'));
