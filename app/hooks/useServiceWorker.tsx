import { useCallback } from 'react';

import { useResult } from './useResult';

export const useServiceWorker = (scriptSrc: string) =>
  useResult(useCallback(() => window.navigator.serviceWorker.register(scriptSrc), [scriptSrc]));
