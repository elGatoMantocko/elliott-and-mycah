import { act, renderHook } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router';

import { useScrollToTop } from './useScrollToTop';

test('sets scroll position when path changes', () => {
  window.scrollTo = jest.fn();

  const { result } = renderHook(
    () => {
      useScrollToTop();
      return useNavigate();
    },
    { wrapper: MemoryRouter },
  );

  expect(window.scrollTo).toHaveBeenCalledWith(0, 0);

  act(() => result.current('test'));

  expect(window.scrollTo).toHaveBeenCalledTimes(2);
});
