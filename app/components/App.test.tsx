import { render, screen } from '@testing-library/react';
import React from 'react';

import { App } from './App';

it('should render an <App />', async () => {
  // this basically just renders a "Loading ..." component
  // but this test just exists to tell the coverage reporter that it's tested without
  // adding an istanbul ignore statement
  render(
    <div data-testid="app">
      <App />
    </div>,
  );

  expect(screen.getByTestId('app')).toMatchSnapshot();
});
