import React from 'react';

import { renderWithRouter } from '../../testHelpers';
import { MenuOutlet } from './MenuOutlet';

it('should render a <Menu />', async () => {
  const el = renderWithRouter(
    <div data-testid="menu">
      <MenuOutlet />
    </div>,
  );
  expect(await el.findByTestId('menu')).toMatchSnapshot();
});
