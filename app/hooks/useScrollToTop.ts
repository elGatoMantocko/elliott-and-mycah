import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook that will automatically make a browser scroll to the `0` position when
 * the path changes inside of a router.
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};
