import { useScrollToTop } from '../hooks/scrollToTop';

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
