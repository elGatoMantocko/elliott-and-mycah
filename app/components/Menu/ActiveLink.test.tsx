import { render } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { ActiveLink } from './ActiveLink';

describe('<ActiveLink>', () => {
  it('should render a link', () => {
    const el = render(<ActiveLink href="/test">Some test link</ActiveLink>, {
      wrapper: MemoryRouter,
    });

    expect(el.container.innerHTML).toMatchSnapshot();
  });

  it('should render disabled link', () => {
    const el = render(
      <ActiveLink disabled href="/test">
        Some test link
      </ActiveLink>,
      {
        wrapper: MemoryRouter,
      },
    );

    expect(el.container.innerHTML).toMatchSnapshot();
  });

  it('should render active on the current path', () => {
    const el = render(<ActiveLink href="/">Some test link</ActiveLink>, {
      wrapper: MemoryRouter,
    });

    expect(el.container.innerHTML).toMatchSnapshot();
  });
});
