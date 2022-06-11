import { Box } from '@mui/material';
import React from 'react';

import { ScriptTypography } from '../ScriptTypography';
import { useCountdown } from './useCountdown';

type Units = 'years' | 'days';
type EnUnits = { [Unit in Units]: (isZeroOrMoreThanOne: boolean) => string };

const enUnits: EnUnits = {
  years: (check) => (check ? 'years' : 'year'),
  days: (check) => (check ? 'days' : 'day'),
};

const pluralize = (amount: number, key: Units): string => enUnits[key](amount === 0 || amount > 1);

type CounterCardProps = Readonly<{ value: number; unit: Units }>;
const CounterCard = ({ value, unit }: CounterCardProps) => (
  <Box textAlign="center" margin="0.5rem">
    <ScriptTypography variant="h1">
      {value < 10 && unit !== 'years' ? '0' : ''}
      {value}
    </ScriptTypography>
    <ScriptTypography variant="h4">{pluralize(value, unit)}</ScriptTypography>
  </Box>
);

type CountdownProps = Readonly<{ toDate: Date }>;
export const Countdown = ({ toDate }: CountdownProps) => {
  const { years, days } = useCountdown(toDate);

  return (
    <Box display="flex" justifyContent="space-around" width="100%">
      {years !== 0 && <CounterCard value={years} unit="years" />}
      <CounterCard value={days} unit="days" />
    </Box>
  );
};
