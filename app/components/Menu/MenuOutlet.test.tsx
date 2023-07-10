import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import React from 'react';
import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';

import { MenuOutlet } from './MenuOutlet';

it('should render a <Menu />', () => {
  render(
    <RouterProvider
      router={createMemoryRouter(
        createRoutesFromElements(
          <Route
            path="*"
            element={
              <div data-testid="menu">
                <MenuOutlet />
              </div>
            }
          />,
        ),
      )}
    />,
  );
  expect(screen.getByTestId('menu')).toMatchSnapshot();
});
