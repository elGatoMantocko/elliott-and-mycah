import { useResult } from './useResult';

/**
 * Hook to register a service worker.
 *
 * @param scriptSrc source of the service-worker script
 * @returns result of the service worker registration
 */
export const useServiceWorker = (scriptSrc: string) =>
  useResult(() => navigator.serviceWorker.register(scriptSrc), [scriptSrc]);

/**
 * Hook to unregister all service workers.
 *
 * @returns true if all service workers were able to be unregistered
 */
export const useUnregisterServiceWorkers = () =>
  useResult(async () => {
    const registrations = await navigator.serviceWorker.getRegistrations();
    const results = await Promise.all(registrations.map((r) => r.unregister()));
    return results.every((didUnregister) => didUnregister);
  }, []);
