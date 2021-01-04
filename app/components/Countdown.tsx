import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import * as moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { ScriptTypography } from './ScriptTypography';

type CounterCardProps = Readonly<{ value: number; unit: string }>;
const CounterCard = ({ value, unit }: CounterCardProps) => (
  <Box textAlign="center" margin="0.5rem" color="white">
    <ScriptTypography variant="h1">
      {value < 10 ? '0' : ''}
      {value}
    </ScriptTypography>
    <ScriptTypography variant="h4" component="h2">
      {unit}
    </ScriptTypography>
  </Box>
);
type CountdownProps = Readonly<{ toDate: Date }>;
export const Countdown = ({ toDate }: CountdownProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, [time, setTime]);

  const momentDate = moment(toDate);

  const days = momentDate.diff(time, 'days');
  const daysNormalized = momentDate.subtract(days, 'days');

  const hours = daysNormalized.diff(time, 'hours');
  const hoursNormalized = daysNormalized.subtract(hours, 'hours');

  const minutes = hoursNormalized.diff(time, 'minutes');
  const minutesNormalized = hoursNormalized.subtract(minutes, 'minutes');

  const seconds = minutesNormalized.diff(time, 'seconds');

  return (
    <Box display="flex" justifyContent="space-around" width="100%">
      <CounterCard value={days} unit="days" />
      <Hidden xsDown>
        <CounterCard value={hours} unit="hours" />
        <CounterCard value={minutes} unit="minutes" />
        <Hidden smDown>
          <CounterCard value={seconds} unit="seconds" />
        </Hidden>
      </Hidden>
    </Box>
  );
};
