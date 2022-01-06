import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A component that when mounted will force the window to scroll to the top of the page
 * when the path of the windows location changes.
 *
 * @returns empty JSX
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
