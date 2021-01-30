import { render, screen, waitFor } from '@testing-library/react';
import { expect } from 'chai';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { ActiveLink } from './ActiveLink';

describe('<ActiveLink>', () => {
  it('should render a link', async () => {
    render(<ActiveLink href="/test">Some test link</ActiveLink>, { wrapper: MemoryRouter });

    const link = await waitFor(() => screen.getByText('Some test link'));
    expect(link).to.exist;
    expect(link.hasAttribute('href')).to.be.true;
    expect(link.getAttribute('href')).to.equal('/test');
  });
});
