import { initialize as initializeGoogleMaps } from '@anshulsanghi/googlemaps-vitest-mocks';
import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

import { useCustomTheme } from '../../hooks';
import { createMatchMedia } from '../../testHelpers';
import { Wedding } from '.';

const MockProviders = ({ children }: PropsWithChildren<unknown>) => {
  const theme = useCustomTheme();
  initializeGoogleMaps();
  return (
    <ThemeProvider theme={theme}>
      <ParallaxProvider>{children}</ParallaxProvider>
    </ThemeProvider>
  );
};

beforeEach(() => {
  vi.useFakeTimers({ now: new Date(2023, 8, 22, 17, 0, 0, 0) });
});

it('should render a <Wedding /> page', async () => {
  render(
    <div data-testid="wedding-page">
      <Wedding />
    </div>,
    { wrapper: MockProviders },
  );

  expect(screen.getByTestId('wedding-page')).toMatchSnapshot();
});

it('should render a small screen <Wedding /> page', async () => {
  global.matchMedia = createMatchMedia(764);

  render(
    <div data-testid="small-wedding-page">
      <Wedding />
    </div>,
    { wrapper: MockProviders },
  );

  expect(screen.getByTestId('small-wedding-page')).toMatchSnapshot();
});
