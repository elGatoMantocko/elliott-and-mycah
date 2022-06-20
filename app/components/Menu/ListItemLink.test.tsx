import { act, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import { ListItemLink } from './ListItemLink';

it('should render a link', () => {
  const el = render(<ListItemLink href="/test">Test</ListItemLink>, { wrapper: MemoryRouter });
  expect(el.container).toMatchSnapshot();
});

it('should render a disabled link', async () => {
  const el = render(
    <ListItemLink data-testid="disabled-link" disabled href="/test">
      Test
    </ListItemLink>,
    { wrapper: MemoryRouter },
  );
  expect(el.container).toMatchSnapshot('disabled-link');

  await act(async () => {
    const link = await el.findByTestId('disabled-link');
    link.click();
  });

  expect(el.container).toMatchSnapshot('disabled-link');
});
