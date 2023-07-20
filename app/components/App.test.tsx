import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { App } from './App';

it('should render an <App />', async () => {
  // this basically just renders a "Loading ..." component
  // but this test just exists to tell the coverage reporter that it's tested without
  // adding an istanbul ignore statement
  const { asFragment } = render(<App />);
  // wrap in waitFor because the initial render can trigger a state change due to the
  // loading service worker
  const el = await waitFor(() => asFragment());
  expect(el).toMatchSnapshot();
});
