// eslint-disable-next-line import/no-unresolved
import { Analytics } from '@vercel/analytics/react';
// eslint-disable-next-line import/no-unresolved
import { SpeedInsights } from '@vercel/speed-insights/react';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const AppMetricsOutlet = () => {
  const location = useLocation();
  return (
    <>
      <Analytics path={location.pathname} />
      <SpeedInsights route={location.pathname} />
      <Outlet />
    </>
  );
};
