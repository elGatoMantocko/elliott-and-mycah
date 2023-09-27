import { useResult } from './result';

/**
 * Hook to unregister all service workers.
 * @returns true if any and all service workers were able to be unregistered
 */
export const useUnregisterServiceWorkers = () =>
  useResult(async () => {
    const registrations = await navigator.serviceWorker.getRegistrations();
    const results = await Promise.all(registrations.map((r) => r.unregister()));
    return results.length > 0 && results.every((didUnregister) => didUnregister);
  }, []);
