import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import { sub } from 'date-fns';
import React, { PropsWithChildren } from 'react';

import { useCustomTheme } from '../../hooks';
import { Countdown } from './Countdown';

const MockProviders = ({ children }: PropsWithChildren<unknown>) => {
  const theme = useCustomTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

it('should render', async () => {
  render(
    <div data-testid="basic-countdown">
      <Countdown toDate={sub(new Date(), { years: 1, months: 1, days: 1 })} />,
    </div>,
    { wrapper: MockProviders },
  );

  expect(screen.getByTestId('basic-countdown')).toMatchSnapshot('single-date');
});

it('should render plural duration', async () => {
  render(
    <div data-testid="multiple-countdown">
      <Countdown toDate={sub(new Date(), { years: 2, months: 2, days: 2 })} />,
    </div>,
    { wrapper: MockProviders },
  );

  expect(screen.getByTestId('multiple-countdown')).toMatchSnapshot('plural-date');
});

it('should not render null (0) deltas', async () => {
  render(
    <div data-testid="null-countdown">
      <Countdown toDate={sub(new Date(), { years: 1 })} />,
    </div>,
    { wrapper: MockProviders },
  );

  expect(screen.getByTestId('null-countdown')).toMatchSnapshot('null-like-deltas');
});
