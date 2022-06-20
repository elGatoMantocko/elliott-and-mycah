import { render, RenderOptions, RenderResult } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router';

type TestLocations = 'route-location';

/**
 * The element testid used to show the location.
 */
export const TestRouteLocation: TestLocations = 'route-location';

/**
 * Component that exposes the location path and search to the dom
 *
 * @returns element
 */
const TestLocation = () => {
  const location = useLocation();
  return <div data-testid={TestRouteLocation}>{`${location.pathname}${location.search}`}</div>;
};

/**
 * Use to render UI with a react-router with the ability to search for a `route-location` test id.
 *
 * @example
 * ```typescriptreact
 * const el = renderWithRouter(<MyComponent />);
 * const locationElementData = await el.findByTestId(TestRouteLocation);
 * ```
 * @param ui to render in the test
 * @param options passed to testing-library
 * @returns render result
 */
export const renderWithRouter = (ui: React.ReactElement, options?: RenderOptions): RenderResult => {
  return render(
    <MemoryRouter>
      {ui}
      <Routes>
        <Route path="*" element={<TestLocation />} />
      </Routes>
    </MemoryRouter>,
    options,
  );
};
