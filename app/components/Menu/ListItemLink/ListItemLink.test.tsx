import { act, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import { renderWithRouter, TestRouteLocation } from '../../../testHelpers';
import { ListItemLink } from '.';

it('should render a link', () => {
  const el = render(<ListItemLink href="/test">Test</ListItemLink>, { wrapper: MemoryRouter });
  expect(el.container).toMatchSnapshot();
});

it('should render a disabled link', async () => {
  const el = renderWithRouter(
    <ListItemLink data-testid="disabled-link" disabled href="/test">
      Test
    </ListItemLink>,
  );
  expect(await el.findByTestId('disabled-link')).toMatchSnapshot('disabled-link');

  await act(async () => {
    const link = await el.findByTestId('disabled-link');
    link.click();
  });

  expect(await el.findByTestId('disabled-link')).toMatchSnapshot('disabled-link');
});

it('should handle a null onClick handler and null href', async () => {
  const el = renderWithRouter(
    <ListItemLink data-testid="null-click-handler" href={undefined} onClick={undefined}>
      Test
    </ListItemLink>,
  );

  await act(async () => {
    const link = await el.findByTestId('null-click-handler');
    link.click();
  });

  const routeEl = await el.findByTestId(TestRouteLocation);

  expect(routeEl.textContent).toEqual('/');
  expect(await el.findByTestId('null-click-handler')).toMatchSnapshot('null-click-handler');
});

it('should navigate to href when clicked', async () => {
  const el = renderWithRouter(
    <ListItemLink data-testid="navigate-with-href" href="/test-path" onClick={undefined}>
      Test
    </ListItemLink>,
  );

  await act(async () => {
    const link = await el.findByTestId('navigate-with-href');
    link.click();
  });

  // get the location element and assert it matches the expected path
  const routeEl = await el.findByTestId(TestRouteLocation);
  expect(routeEl.textContent).toEqual('/test-path');

  expect(await el.findByTestId('navigate-with-href')).toMatchSnapshot('navigate-with-href');
});

it('should call the onClick handler', async () => {
  const onClickMock = jest.fn();
  const el = renderWithRouter(
    <ListItemLink data-testid="navigate-with-onClick" onClick={onClickMock}>
      Test
    </ListItemLink>,
  );

  await act(async () => {
    const link = await el.findByTestId('navigate-with-onClick');
    link.click();
  });

  expect(onClickMock).toHaveBeenCalled();

  // get the location element and assert it matches the expected path
  const routeEl = await el.findByTestId(TestRouteLocation);
  expect(routeEl.textContent).toEqual('/');

  expect(await el.findByTestId('navigate-with-onClick')).toMatchSnapshot('navigate-with-onClick');
});
