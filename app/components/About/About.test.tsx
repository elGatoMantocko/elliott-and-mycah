import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

import { useCustomTheme } from '../../hooks';
import { About } from '.';

/**
 * The About page uses a parallax banner and mui breakpoints. So we need to
 * provide a theme provider and parallax provider.
 * @param param0 props
 * @param param0.children passed to the providers
 * @returns react element
 */
const MockProviders = ({ children }: PropsWithChildren<unknown>) => {
  const theme = useCustomTheme();
  return (
    <ThemeProvider theme={theme}>
      <ParallaxProvider>{children}</ParallaxProvider>
    </ThemeProvider>
  );
};

it('should render an <About />', async () => {
  const el = render(
    <div data-testid="basic-about">
      <About />
    </div>,
    { wrapper: MockProviders },
  );

  expect(await el.findByTestId('basic-about')).toMatchSnapshot('basic-about');
});
