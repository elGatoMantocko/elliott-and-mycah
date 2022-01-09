import { Box, Hidden } from '@mui/material';
import React from 'react';

import { ScriptTypography } from '../ScriptTypography';
import { useCountdown } from './useCountdown';

type CounterCardProps = Readonly<{ value: number; unit: string }>;
const CounterCard = ({ value, unit }: CounterCardProps) => (
  <Box textAlign="center" margin="0.5rem">
    <ScriptTypography variant="h1">
      {value < 10 ? '0' : ''}
      {value}
    </ScriptTypography>
    <ScriptTypography variant="h4">{unit}</ScriptTypography>
  </Box>
);
type CountdownProps = Readonly<{ toDate: Date }>;
export const Countdown = ({ toDate }: CountdownProps) => {
  const { days, hours, minutes, seconds } = useCountdown(toDate);

  return (
    <Box display="flex" justifyContent="space-around" width="100%">
      <CounterCard value={days} unit="days" />
      <Hidden smDown>
        <CounterCard value={hours} unit="hours" />
        <CounterCard value={minutes} unit="minutes" />
        <Hidden mdDown>
          <CounterCard value={seconds} unit="seconds" />
        </Hidden>
      </Hidden>
    </Box>
  );
};
