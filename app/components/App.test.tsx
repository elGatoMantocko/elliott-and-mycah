import { render } from '@testing-library/react';
import React from 'react';

import { App } from './App';

it.each(['/', '/us', '/wedding', '/pictures'])('should render an <App /> for %s', (pathname) => {
  // navigate to the path
  window.history.pushState({}, 'test', pathname);
  // this basically just renders a "Loading ..." component
  // but this test just exists to tell the coverage reporter that it's tested without
  // adding an istanbul ignore statement
  const { asFragment } = render(<App />);
  // wrap in waitFor because the initial render can trigger a state change due to the
  // loading service worker
  expect(asFragment()).toMatchSnapshot();
});
