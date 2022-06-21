import { render } from '@testing-library/react';
import { sub } from 'date-fns';
import React from 'react';

import { Countdown } from './Countdown';

it('should render', async () => {
  const el = render(
    <div data-testid="basic-countdown">
      <Countdown toDate={sub(new Date(), { years: 1, months: 1, days: 1 })} />,
    </div>,
  );

  expect(await el.findByTestId('basic-countdown')).toMatchSnapshot('single-date');
});

it('should render plural duration', async () => {
  const el = render(
    <div data-testid="basic-countdown">
      <Countdown toDate={sub(new Date(), { years: 2, months: 2, days: 2 })} />,
    </div>,
  );

  expect(await el.findByTestId('basic-countdown')).toMatchSnapshot('plural-date');
});

it('should not render null (0) deltas', async () => {
  const el = render(
    <div data-testid="basic-countdown">
      <Countdown toDate={sub(new Date(), { years: 1 })} />,
    </div>,
  );

  expect(await el.findByTestId('basic-countdown')).toMatchSnapshot('null-like-deltas');
});
