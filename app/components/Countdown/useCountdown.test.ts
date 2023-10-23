import { renderHook } from '@testing-library/react';
import { add, differenceInMilliseconds, sub } from 'date-fns';
import { act } from 'react-dom/test-utils';

import { useCountdown } from './useCountdown';

it.each([
  [{ years: 1 }, { years: 1, days: 0, months: 0, hours: 0, minutes: 0, seconds: 0 }],
  [{ years: 2 }, { years: 2, days: 0, months: 0, hours: 0, minutes: 0, seconds: 0 }],
])('should get countdown from $diff as $expected', (diff, expected) => {
  const { result } = renderHook(() => useCountdown(sub(new Date(), diff)));
  expect(result.current).toEqual(expected);
});

it('should set the date on a new interval', () => {
  const now = new Date();
  vi.useFakeTimers({ now });

  const { result, rerender } = renderHook(() => useCountdown(sub(now, { years: 1 })));

  expect(result.current).toEqual({
    days: 0,
    hours: 0,
    minutes: 0,
    months: 0,
    seconds: 0,
    years: 1,
  });

  act(() => {
    vi.advanceTimersByTime(
      differenceInMilliseconds(
        add(now, {
          months: 1,
          days: 1,
          hours: 1,
        }),
        now,
      ),
    );
  });
  rerender();

  expect(result.current).toEqual({
    years: 1,
    months: 1,
    days: 1,
    hours: 1,
    minutes: 0,
    seconds: 0,
  });
});
