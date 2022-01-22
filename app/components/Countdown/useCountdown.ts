import { useEffect, useState } from 'react';

export const useCountdown = (toDate: Date) => {
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

  // calculate (and subtract) whole days
  const days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  const seconds = Math.floor(delta) % 60; // in theory the modulus is not required

  return { days, hours, minutes, seconds };
};
