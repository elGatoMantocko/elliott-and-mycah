import type { Duration } from 'date-fns';
import { intervalToDuration } from 'date-fns';
import { useEffect, useState } from 'react';

interface CountdownDeltas {
  years?: number;
  months?: number;
  days?: number;
}

export const useCountdown = (toDate: Date): CountdownDeltas => {
  const [duration, setDuration] = useState<Duration>(
    intervalToDuration({ start: toDate, end: new Date() }),
  );

  useEffect(() => {
    const id = setInterval(() => {
      const duration = intervalToDuration({ start: toDate, end: new Date() });
      setDuration(duration);
    }, 3600000); // check once every hour
    return () => clearInterval(id);
  }, [setDuration, toDate]);

  return duration;
};
