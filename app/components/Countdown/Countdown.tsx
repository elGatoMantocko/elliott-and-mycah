import { Box, Hidden, Paper, Theme, useMediaQuery } from '@mui/material';
import React from 'react';

import { ScriptTypography } from '../ScriptTypography';
import { useCountdown } from './useCountdown';

type Units = 'years' | 'months' | 'days';
type EnUnits = { [Unit in Units]: (isZeroOrMoreThanOne: boolean) => string };

const enUnits: EnUnits = {
  years: (check) => (check ? 'years' : 'year'),
  months: (check) => (check ? 'months' : 'month'),
  days: (check) => (check ? 'days' : 'day'),
};

const pluralize = (amount: number, key: Units): string => enUnits[key](amount === 0 || amount > 1);

type CounterCardProps = Readonly<{ value: number | undefined; unit: Units }>;
const CounterCard = ({ value, unit }: CounterCardProps) => (
  <>
    {value != null && value !== 0 && (
      <Paper elevation={5} sx={{ minWidth: 200 }}>
        <Box sx={{ textAlign: 'center', mx: 2, my: 1 }}>
          <ScriptTypography variant="h1" sx={{ lineHeight: 1 }}>
            {value}
          </ScriptTypography>
          <ScriptTypography variant="h4">{pluralize(value, unit)}</ScriptTypography>
        </Box>
      </Paper>
    )}
  </>
);

type CountdownProps = Readonly<{ toDate: Date }>;
export const Countdown = ({ toDate }: CountdownProps) => {
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));
  const { years, months, days } = useCountdown(toDate);

  return (
    <Box display="flex" justifyContent="space-around" width="100%">
      <CounterCard value={years} unit="years" />
      <CounterCard value={months} unit="months" />
      <Hidden smDown={isSmallScreen}>
        <CounterCard value={days} unit="days" />
      </Hidden>
    </Box>
  );
};
