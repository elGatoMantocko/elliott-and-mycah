import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import * as React from 'react';

import { ScriptTypography } from '../ScriptTypography';
import { useCountdown } from './useCountdown';

type CounterCardProps = Readonly<{ value: number; unit: string }>;
const CounterCard = ({ value, unit }: CounterCardProps) => (
  <Box textAlign="center" margin="0.5rem">
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
  const { days, hours, minutes, seconds } = useCountdown(toDate);

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
