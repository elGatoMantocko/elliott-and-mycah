import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import { renderWithRouter } from '../../../testHelpers';
import { ListItemLink } from '.';

it('should render a link', () => {
  const { asFragment } = render(<ListItemLink to="/test">Test</ListItemLink>, {
    wrapper: MemoryRouter,
  });
  expect(asFragment()).toMatchSnapshot();
});

it('should render a disabled link', async () => {
  renderWithRouter(
    <ListItemLink data-testid="disabled-link" disabled to="/test">
      Test
    </ListItemLink>,
    { locationTestId: 'disabled-location' },
  );

  const link = screen.getByTestId('disabled-link');
  expect(link).toMatchSnapshot('disabled-link');
  expect(link.className.split(' ')).toContain('Mui-disabled');

  const routeEl = screen.getByTestId('disabled-location');
  expect(routeEl.textContent).toEqual('/');
});

it('should navigate to href when clicked', async () => {
  const el = renderWithRouter(
    <ListItemLink data-testid="navigate-with-href" to="/test-path" onClick={undefined}>
      Test
    </ListItemLink>,
    { locationTestId: 'navigate-with-href-location' },
  );

  await act(async () => {
    const link = el.getByTestId('navigate-with-href');
    link.click();
  });

  // get the location element and assert it matches the expected path
  const routeEl = el.getByTestId('navigate-with-href-location');
  expect(routeEl.textContent).toEqual('/test-path');

  expect(el.getByTestId('navigate-with-href')).toMatchSnapshot('navigate-with-href');
});

it('should call the onClick handler', async () => {
  const onClickMock = jest.fn();
  const el = renderWithRouter(
    <ListItemLink to="/test" data-testid="navigate-with-onClick" onClick={onClickMock}>
      Test
    </ListItemLink>,
    { locationTestId: 'call-onclick-location' },
  );

  await act(async () => {
    const link = el.getByTestId('navigate-with-onClick');
    link.click();
  });

  expect(onClickMock).toHaveBeenCalled();

  // get the location element and assert it matches the expected path
  const routeEl = el.getByTestId('call-onclick-location');
  expect(routeEl.textContent).toEqual('/test');

  expect(el.getByTestId('navigate-with-onClick')).toMatchSnapshot('navigate-with-onClick');
});
