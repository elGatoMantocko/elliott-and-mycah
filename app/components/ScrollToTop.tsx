import { useScrollToTop } from '../hooks/useScrollToTop';

/**
 * A component that when mounted will force the window to scroll to the top of the page
 * when the path of the windows location changes.
 *
 * @returns empty JSX
 */
export const ScrollToTop = () => {
  useScrollToTop();
  return null;
};
