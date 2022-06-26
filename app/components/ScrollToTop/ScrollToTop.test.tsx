import React from 'react';

import { renderWithRouter } from '../../testHelpers';
import { ScrollToTop } from './ScrollToTop';

jest.mock('../../hooks/scrollToTop', () => ({
  useScrollToTop: jest.fn(),
}));

it('should render a <ScrollToTop />', async () => {
  const { useScrollToTop } = await import('../../hooks/scrollToTop');

  renderWithRouter(<ScrollToTop />);

  expect(useScrollToTop).toHaveBeenCalled();
});
