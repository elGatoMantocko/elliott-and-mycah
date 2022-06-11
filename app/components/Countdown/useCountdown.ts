import { useEffect, useState } from 'react';

const secondsInAYear = 31536000;
const secondsInADay = 86400;

interface CountdownDeltas {
  years: number;
  days: number;
}

export const useCountdown = (toDate: Date): CountdownDeltas => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, [setTime]);

  // total difference in seconds
  // This SO link saves us ~300KB of `moment` in the bundle
  // https://stackoverflow.com/questions/13903897/javascript-return-number-of-days-hours-minutes-seconds-between-two-dates
  // get total seconds between the times
  let delta = Math.abs(toDate.getTime() - time.getTime()) / 1000;

  const years = Math.floor(delta / secondsInAYear);
  delta -= years * secondsInAYear;

  // calculate (and subtract) whole days
  const days = Math.floor(delta / secondsInADay) % 365;
  delta -= days * secondsInADay;

  return { years, days };
};
