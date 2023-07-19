import { act } from '@testing-library/react';
import React from 'react';

import { renderWithRouter } from '../../../testHelpers';
import { ActiveLink } from '.';

it('should render a link', async () => {
  const el = renderWithRouter(
    <ActiveLink data-testid="basic-link" to="/test">
      Some test link
    </ActiveLink>,
  );

  expect(await el.findByTestId('basic-link')).toMatchSnapshot('basic-link');
});

it('should render disabled link', async () => {
  const el = renderWithRouter(
    <ActiveLink data-testid="disabled-link" disabled to="/test">
      Some test link
    </ActiveLink>,
  );

  expect(await el.findByTestId('disabled-link')).toMatchSnapshot('disabled-link');

  await act(async () => {
    const link = await el.findByTestId('disabled-link');
    link.click();
  });

  // nothing should change after clicking a disabled link
  expect(el.container).toMatchSnapshot('disabled-link');
});

it('should render active on the current path', async () => {
  const el = renderWithRouter(
    <ActiveLink data-testid="some-test-link" to="/">
      Some test link
    </ActiveLink>,
  );

  expect(await el.findByTestId('some-test-link')).toMatchSnapshot('some-test-link');
});

it('should navigate when a link is clicked', async () => {
  const el = renderWithRouter(
    <ActiveLink data-testid="with-href" to="/test-path">
      Some test link
    </ActiveLink>,
    { locationTestId: 'href-location' },
  );

  await act(async () => {
    const link = await el.findByTestId('with-href');
    link.click();
  });

  const locationEl = await el.findByTestId('href-location');
  expect(locationEl.textContent).toEqual('/test-path');

  expect(await el.findByTestId('with-href')).toMatchSnapshot('with-href');
});
