import { useResult } from './useResult';

export const useServiceWorker = (scriptSrc: string) =>
  useResult(() => window.navigator.serviceWorker.register(scriptSrc));
