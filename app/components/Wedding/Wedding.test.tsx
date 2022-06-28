import { initialize as initializeGoogleMaps } from '@googlemaps/jest-mocks';
import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
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

// mock system clock
jest.useFakeTimers().setSystemTime(new Date(2022, 6, 14));

it('should render a <Wedding /> page', async () => {
  const el = render(
    <div data-testid="wedding-page">
      <Wedding />
    </div>,
    { wrapper: MockProviders },
  );

  expect(await el.findByTestId('wedding-page')).toMatchSnapshot();
});

it('should render a small screen <Wedding /> page', async () => {
  global.matchMedia = createMatchMedia(764);

  const el = render(
    <div data-testid="small-wedding-page">
      <Wedding />
    </div>,
    { wrapper: MockProviders },
  );

  expect(await el.findByTestId('small-wedding-page')).toMatchSnapshot();
});
