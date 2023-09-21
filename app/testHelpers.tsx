import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { match } from 'css-mediaquery';
import React from 'react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router';

type TestLocations = 'route-location';

/**
 * The element testid used to show the location.
 */
export const TestRouteLocation: TestLocations = 'route-location';

interface TestLocationProps {
  testId?: string;
}

/**
 * Component that exposes the location path and search to the dom
 * @param root0 props
 * @param root0.testId test id passed to the inner location element
 * @returns element
 */
const TestLocation = ({ testId }: TestLocationProps) => {
  const location = useLocation();
  return (
    <div data-testid={testId ?? TestRouteLocation}>{`${location.pathname}${location.search}`}</div>
  );
};

interface RouterRenderOptions extends RenderOptions {
  locationTestId?: string;
}

/**
 * Use to render UI with a react-router with the ability to search for a `route-location` test id.
 * @example
 * ```typescriptreact
 * const el = renderWithRouter(<MyComponent />);
 * const locationElementData = await el.findByTestId(TestRouteLocation);
 * ```
 * @param ui to render in the test
 * @param options passed to testing-library
 * @param options.locationTestId passed to the `<TestLocation />` element
 * @returns render result
 */
export const renderWithRouter = (
  ui: React.ReactElement,
  { locationTestId, ...renderOptions }: RouterRenderOptions = {},
): RenderResult => {
  return render(
    <MemoryRouter>
      {ui}
      <Routes>
        <Route path="*" element={<TestLocation testId={locationTestId} />} />
      </Routes>
    </MemoryRouter>,
    renderOptions,
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

/**
 * Function to create a match media for mocking media queries.
 * @param width to mock in the jsdom
 * @returns matchMedia options
 */
export function createMatchMedia(width: number): (query: string) => MediaQueryList {
  return (query: string) =>
    ({
      matches: match(query, { width }),
      addListener: noop,
      removeListener: noop,
    }) as unknown as MediaQueryList;
}
