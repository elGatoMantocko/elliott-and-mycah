import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import { ListItemLink } from './ListItemLink';

describe('<ListItemLink />', () => {
  it('should render a link', () => {
    const el = render(<ListItemLink href="/test">Test</ListItemLink>, { wrapper: MemoryRouter });
    expect(el.container.innerHTML).toMatchSnapshot();
  });

  it('should render a disabled link', () => {
    const el = render(
      <ListItemLink disabled href="/test">
        Test
      </ListItemLink>,
      { wrapper: MemoryRouter },
    );
    expect(el.container.innerHTML).toMatchSnapshot();
  });
});
