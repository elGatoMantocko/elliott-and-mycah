// eslint-disable-next-line import/no-unresolved
import { SpeedInsights } from '@vercel/speed-insights/react';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const AppMetricsOutlet = () => {
  const location = useLocation();
  return (
    <>
      <SpeedInsights route={location.pathname} />
      <Outlet />
    </>
  );
};
