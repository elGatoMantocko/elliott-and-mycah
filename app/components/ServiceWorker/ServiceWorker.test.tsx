import { render } from '@testing-library/react';
import React from 'react';

import { ServiceWorker } from '.';

vi.mock('workbox-window');

it('should render', () => {
  const { asFragment } = render(<ServiceWorker />);
  expect(asFragment()).toMatchSnapshot();
});
