import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

/**
 * A component that when mounted will force the window to scroll to the top of the page
 * when the path of the windows location changes.
 * @returns empty JSX
 */
export const ScrollToTopOutlet = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Outlet />;
};
