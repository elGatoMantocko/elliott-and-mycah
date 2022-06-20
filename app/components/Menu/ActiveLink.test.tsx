import { act, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { ActiveLink } from './ActiveLink';
import { renderWithRouter, TestRouteLocation } from './testHelpers';

it('should render a link', () => {
  const el = render(<ActiveLink href="/test">Some test link</ActiveLink>, {
    wrapper: MemoryRouter,
  });

  expect(el.container).toMatchSnapshot();
});

it('should render disabled link', async () => {
  const el = renderWithRouter(
    <ActiveLink data-testid="disabled-link" disabled href="/test">
      Some test link
    </ActiveLink>,
  );

  expect(await el.findByTestId('disabled-link')).toMatchSnapshot('disabled_link');

  await act(async () => {
    const link = await el.findByTestId('disabled-link');
    link.click();
  });

  // nothing should change after clicking a disabled link
  expect(el.container).toMatchSnapshot('disabled_link');
});

it('should render active on the current path', async () => {
  const el = renderWithRouter(
    <ActiveLink data-testid="some-test-link" href="/">
      Some test link
    </ActiveLink>,
  );

  expect(await el.findByTestId('some-test-link')).toMatchSnapshot('some-test-link');
});

it('should render a link with null href', async () => {
  const el = renderWithRouter(<ActiveLink data-testid="null-href">Some test link</ActiveLink>);

  await act(async () => {
    const link = await el.findByTestId('null-href');
    link.click();
  });

  const locationEl = await el.findByTestId(TestRouteLocation);
  expect(locationEl.textContent).toEqual('/');

  expect(await el.findByTestId('null-href')).toMatchSnapshot('null-href');
});

it('should navigate when a link is clicked', async () => {
  const el = renderWithRouter(
    <ActiveLink data-testid="with-href" href="/test-path">
      Some test link
    </ActiveLink>,
  );

  await act(async () => {
    const link = await el.findByTestId('with-href');
    link.click();
  });

  const locationEl = await el.findByTestId(TestRouteLocation);
  expect(locationEl.textContent).toEqual('/test-path');

  expect(await el.findByTestId('with-href')).toMatchSnapshot('with-href');
});
