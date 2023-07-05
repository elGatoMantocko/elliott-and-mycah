import { act, render } from '@testing-library/react';
import React from 'react';

import { ResultState } from '../../hooks';
import { State, state } from '../../models';
import { ServiceWorkerUnregistration } from '.';

jest.mock('../../hooks/serviceWorker', () => ({
  __esModule: true,
  useUnregisterServiceWorkers: jest.fn(),
}));

/**
 * Helper to mock a sw unregister result.
 * @param result that the unregister service worker hook returns
 */
async function mockUnregisterResult(
  result: State<ResultState, boolean | Error | undefined>,
): Promise<void> {
  const { useUnregisterServiceWorkers } = await import('../../hooks/serviceWorker');
  // See line 7 in this file. We are setting up the module mock for this
  // and we want to override the implementation in each test
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useUnregisterServiceWorkers.mockImplementation(() => result);
}

it('should render a successful <Unregister />', async () => {
  await mockUnregisterResult(state(ResultState.Value, true));

  const el = render(
    <div data-testid="unregister-sw-success">
      <ServiceWorkerUnregistration />
    </div>,
  );

  expect(window.location.reload).toHaveBeenCalled();

  const unregistration = await el.findByTestId('unregister-sw-success');
  expect(unregistration).toMatchSnapshot('success-unregister');
});

it('should render a pending <Unregister />', async () => {
  await mockUnregisterResult(state(ResultState.Pending));

  const el = render(
    <div data-testid="unregister-sw-pending">
      <ServiceWorkerUnregistration />
    </div>,
  );

  expect(window.location.reload).toHaveBeenCalled();

  const unregistration = await el.findByTestId('unregister-sw-pending');
  expect(unregistration).toMatchSnapshot('pending-unregister');
});

it('should render an error <Unregister />', async () => {
  // this will trigger an error log in the tests, it's expected until I refactor the
  // logger to be injected into components
  await mockUnregisterResult(state(ResultState.Error, new Error('oops')));

  const el = render(
    <div data-testid="unregister-sw-err">
      <ServiceWorkerUnregistration />
    </div>,
  );

  expect(window.location.reload).toHaveBeenCalled();

  const unregistration = await el.findByTestId('unregister-sw-err');
  expect(unregistration).toMatchSnapshot('error-unregister');
});

it('should render a successful <Unregister /> with a snackbar', async () => {
  jest.useFakeTimers();

  await mockUnregisterResult(state(ResultState.Value, true));

  const ui = (
    <div data-testid="unregister-sw-success-hide-snack">
      <ServiceWorkerUnregistration />
    </div>
  );

  const el = render(ui);

  expect(window.location.reload).toHaveBeenCalled();

  expect(await el.findByTestId('unregister-sw-success-hide-snack')).toMatchSnapshot(
    'success-unregister',
  );

  await act(() => {
    jest.advanceTimersByTime(3000);
    el.rerender(ui);
  });

  expect(await el.findByTestId('unregister-sw-success-hide-snack')).toMatchSnapshot(
    'success-unregister-post-hide',
  );
});
