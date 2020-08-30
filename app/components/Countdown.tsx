import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import * as moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from 'react';

type CounterCardProps = Readonly<{ value: number; unit: string }>;
const CounterCard = ({ value }: CounterCardProps) => (
  <Card raised>
    <Box margin="0.5rem">
      <Typography variant="h1">
        {value < 10 ? '0' : ''}
        {value}
      </Typography>
    </Box>
  </Card>
);

type CountdownProps = Readonly<{ date: Date }>;
export const Countdown = ({ date }: CountdownProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, [time, setTime]);

  const momentDate = moment(date);

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
