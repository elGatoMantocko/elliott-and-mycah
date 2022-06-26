import React from 'react';

import { renderWithRouter } from '../../testHelpers';
import { Menu } from './Menu';

it('should render a <Menu />', async () => {
  const el = renderWithRouter(
    <div data-testid="menu">
      <Menu />
    </div>,
  );
  expect(await el.findByTestId('menu')).toMatchSnapshot();
});
