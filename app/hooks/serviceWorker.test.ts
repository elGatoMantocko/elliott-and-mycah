import { act, renderHook, waitFor } from '@testing-library/react';

import { state } from '../models';
import { ResultState, useUnregisterServiceWorkers } from '.';

beforeEach(() => {});

it('should unregister all service workers', async () => {
  // stub out getRegistrations to return registrations that can be unregistered
  vi.stubGlobal('navigator', {
    serviceWorker: {
      getRegistrations: vi.fn(() =>
        Promise.resolve([
          {
            unregister: vi.fn(() => Promise.resolve(true)),
          } as unknown as ServiceWorkerRegistration,
        ]),
      ),
    } satisfies Partial<ServiceWorkerContainer>,
  });

  const { result } = renderHook(() => useUnregisterServiceWorkers());

  await waitFor(() => expect(result.current).not.toEqual(state(ResultState.Pending)));

  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(navigator.serviceWorker.getRegistrations).toHaveBeenCalled();
  expect(result.current).toEqual({ state: ResultState.Value, value: true });
});

it('should return false when there are no service workers to unregister', async () => {
  // stub out getRegistrations to return registrations that can be unregistered
  vi.stubGlobal('navigator', {
    serviceWorker: {
      getRegistrations: vi.fn(() => Promise.resolve([])),
    } satisfies Partial<ServiceWorkerContainer>,
  });

  const { result, rerender } = renderHook(() => useUnregisterServiceWorkers());

  await waitFor(() => expect(result.current.state).not.toEqual(ResultState.Pending));
  act(() => {
    rerender();
  });

  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(navigator.serviceWorker.getRegistrations).toHaveBeenCalled();
  expect(result.current).toEqual({ state: ResultState.Value, value: false });
});
