import { DependencyList, useCallback, useEffect, useState } from 'react';

import { State, state } from '../models';

export enum ResultState {
  NotStarted = 'not-started',
  Pending = 'pending',
  Value = 'value',
  Error = 'error',
}

export type Result<T, U> =
  | State<ResultState.NotStarted>
  | State<ResultState.Pending>
  | State<ResultState.Value, T>
  | State<ResultState.Error, U>;

const PENDING: State<ResultState.Pending> = state(ResultState.Pending);
const NOT_STARTED: State<ResultState.NotStarted> = state(ResultState.NotStarted);

/**
 * Turns an unknown error into an {@link Error}
 * @param err unknown error
 * @returns a valid error object
 */
function handleUnknownError(err: unknown): Error {
  if (err instanceof Error) {
    return err;
  } else if (typeof err === 'string') {
    return new Error(err);
  } else if (typeof err === 'object') {
    return new Error(`encountered error in useCallableResult: ${JSON.stringify(err)}`);
  } else {
    return new Error('encountered unknown error in useCallableResult');
  }
}

/**
 * Function to get a result from an asynchronous function.
 * @param request asynchronous function to map to a result state
 * @param deps list of deps used in the request
 * @returns result state object
 */
export const useResult = <C extends () => Promise<unknown>, CValue extends Awaited<ReturnType<C>>>(
  request: C extends () => Promise<CValue> ? C : never,
  deps: DependencyList,
) => {
  const [result, setResult] = useState<Result<CValue, Error>>(NOT_STARTED);

  useEffect(() => {
    let isSubscribed = true;

    // only set state and make requests as long as this hook is still "mounted" to the dom
    // this is mostly just so we don't freak the tests out when things get unmounted
    if (isSubscribed) {
      setResult(PENDING);
      request()
        .then((data) => setResult(state(ResultState.Value, data)))
        .catch((err: unknown) => setResult(state(ResultState.Error, handleUnknownError(err))));
    }

    // if the `useResult` hook is torn down, we want to make sure we don't have any
    // lingering calls being made
    return () => {
      isSubscribed = false;
    };
    // The caller is defining the dependencies to this so we intentionally
    // want to ignore the exhaustive deps rule here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);
  return result;
};

/**
 * Hook to get a callable function that sets the result state. Can be reset to `not-started`
 * with the 3rd option in the tuple.
 * @param request function to call
 * @returns tuple representing the `[result-state, callable, reset]` options
 */
export const useCallableResult = <CArgs extends unknown[], CResponse>(
  request: (...args: CArgs) => Promise<CResponse>,
): [Result<CResponse, Error>, (...args: CArgs) => void, () => void] => {
  const [result, setResult] = useState<Result<CResponse, Error>>(NOT_STARTED);

  const call = useCallback(
    async (...args: CArgs) => {
      setResult(PENDING);

      try {
        const t = await request(...args);

        setResult(state(ResultState.Value, t));
      } catch (err) {
        setResult(state(ResultState.Error, handleUnknownError(err)));
      }
    },
    [request],
  );

  return [result, call, () => setResult(NOT_STARTED)];
};
