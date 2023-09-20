import { renderHook } from '@testing-library/react';
import { sub } from 'date-fns';
import { act } from 'react-dom/test-utils';

import { useCountdown } from './useCountdown';

it('should get a time delta', () => {
  const { result } = renderHook(() => useCountdown(sub(new Date(), { years: 1 })));
  expect(result.current).toEqual({
    years: 1,
    days: 0,
    months: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
});

it('should set the date on a new interval', async () => {
  vi.useFakeTimers();

  const { result, rerender } = renderHook(() => useCountdown(sub(new Date(), { years: 1 })));

  expect(result.current).toEqual({
    days: 0,
    hours: 0,
    minutes: 0,
    months: 0,
    seconds: 0,
    years: 1,
  });

  await act(() => {
    // advance the time by a day
    vi.advanceTimersByTime(1000 * 60 * 60 * 24);
  });
  rerender();

  expect(result.current).toEqual({
    days: 1,
    hours: 0,
    minutes: 0,
    months: 0,
    seconds: 0,
    years: 1,
  });
});
