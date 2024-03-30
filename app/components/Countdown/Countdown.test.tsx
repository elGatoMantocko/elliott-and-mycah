import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { sub } from 'date-fns';
import React, { PropsWithChildren } from 'react';

import { useCustomTheme } from '../../hooks';
import { createMatchMedia } from '../../testHelpers';
import { Countdown } from './Countdown';

const MockProviders = ({ children }: PropsWithChildren<unknown>) => {
  const theme = useCustomTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

it.each([
  { years: 1, months: 1, days: 1, size: 764 },
  { years: 1, months: 1, days: 1, size: 1024 },
  { years: 2, months: 2, days: 2, size: 764 },
  { years: 2, months: 2, days: 2, size: 1024 },
  { years: 3, months: 3, days: 3, size: 764 },
  { years: 3, months: 3, days: 3, size: 1024 },
  { years: 1, size: 764 },
  { years: 1, size: 1024 },
  { years: 1, months: 1, size: 764 },
  { years: 1, months: 1, size: 1024 },
])(
  'should render countdown $years year : $months month : $days day for screen-size $size',
  ({ years, months, days, size }) => {
    const d = new Date(2021, 5, 12, 16, 0, 0);
    vi.stubGlobal('matchMedia', createMatchMedia(size));
    vi.setSystemTime(d);

    const { asFragment } = render(<Countdown toDate={sub(d, { years, months, days })} />, {
      wrapper: MockProviders,
    });

    expect(asFragment()).toMatchSnapshot();
  },
);
