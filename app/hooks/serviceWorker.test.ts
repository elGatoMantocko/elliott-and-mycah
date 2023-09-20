import { act, renderHook, waitFor } from '@testing-library/react';

import { ResultState, useServiceWorker, useUnregisterServiceWorkers } from '.';

// allows us to override the navigator and stub out the service worker api
Object.defineProperty(global, 'navigator', {
  value: {
    serviceWorker: {
      getRegistrations: vi.fn(),
      register: vi.fn(),
      addEventListener: vi.fn(),
    },
  },
});

it('should register a service worker', async () => {
  const { result } = renderHook(() => useServiceWorker('/test.js'));

  await waitFor(() => result.current.state !== ResultState.Pending);

  expect(navigator.serviceWorker.register).toHaveBeenCalledWith('/test.js');
});

it('should unregister all service workers', async () => {
  // stub out getRegistrations to return registrations that can be unregistered
  vi.spyOn(global.navigator.serviceWorker, 'getRegistrations').mockResolvedValue([
    { unregister: vi.fn(async () => await true) },
  ] as unknown as ServiceWorkerRegistration[]);

  const { result, rerender } = renderHook(() => useUnregisterServiceWorkers());

  await waitFor(() => result.current.state !== ResultState.Pending);
  await act(() => {
    rerender();
  });

  expect(navigator.serviceWorker.getRegistrations).toHaveBeenCalled();
  expect(result.current).toEqual({ state: ResultState.Value, value: true });
});

it('should return false when there are no service workers to unregister', async () => {
  // stub out getRegistrations to return registrations that can be unregistered
  vi.spyOn(global.navigator.serviceWorker, 'getRegistrations').mockResolvedValue([]);

  const { result, rerender } = renderHook(() => useUnregisterServiceWorkers());

  await waitFor(() => expect(result.current.state).not.toEqual(ResultState.Pending));
  await act(() => {
    rerender();
  });

  expect(navigator.serviceWorker.getRegistrations).toHaveBeenCalled();
  expect(result.current).toEqual({ state: ResultState.Value, value: false });
});
