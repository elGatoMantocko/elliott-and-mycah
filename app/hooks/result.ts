import { DependencyList, useCallback, useEffect, useState } from 'react';

import { State, state } from '../models';

export enum ResultState {
  NotStarted = 'not-started',
  Pending = 'pending',
  Value = 'value',
  Error = 'error',
}

type Result<T, U> =
  | State<ResultState.NotStarted>
  | State<ResultState.Pending>
  | State<ResultState.Value, T>
  | State<ResultState.Error, U>;

const pending: State<ResultState.Pending> = state(ResultState.Pending);
const notStarted: State<ResultState.NotStarted> = state(ResultState.NotStarted);

/**
 * Return value of an async function.
 */
type UseResultValue<C extends () => Promise<unknown>> = C extends () => Promise<infer CResult>
  ? CResult
  : never;

/**
 * Turns an unknown error into an {@link Error}
 *
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
 *
 * @param request asynchronous function to map to a result state
 * @param deps list of deps used in the request
 * @returns result state object
 */
export const useResult = <C extends () => Promise<unknown>, CValue extends UseResultValue<C>>(
  request: C extends () => Promise<CValue> ? C : never,
  deps: DependencyList,
) => {
  const [result, setResult] = useState<Result<CValue, Error>>(notStarted);

  /**
   * This CB should handle _all_ error cases. The error is wrapped into the result object
   */
  const requestCb = useCallback(async (): Promise<void> => {
    setResult(pending);
    try {
      setResult(state(ResultState.Value, await request()));
    } catch (err) {
      setResult(state(ResultState.Error, handleUnknownError(err)));
    }
    // The caller is defining the dependencies to this so we intentionally
    // want to ignore the exhaustive deps rule here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    let isSubscribed = true;

    // only set state and make requests as long as this hook is still "mounted" to the dom
    // this is mostly just so we don't freak the tests out when things get unmounted
    // istanbul ignore next
    if (isSubscribed) {
      requestCb();
    }

    // if the `useResult` hook is torn down, we want to make sure we don't have any
    // lingering calls being made
    return () => {
      isSubscribed = false;
    };
  }, [requestCb]);
  return result;
};

/**
 * Hook to get a callable function that sets the result state. Can be reset to `not-started`
 *  with the 3rd option in the tuple.
 *
 * @param request function to call
 * @returns tuple representing the `[result-state, callable, reset]` options
 */
export const useCallableResult = <CArgs extends unknown[], CResponse>(
  request: (...args: CArgs) => Promise<CResponse>,
): [Result<CResponse, Error>, (...args: CArgs) => void, () => void] => {
  const [result, setResult] = useState<Result<CResponse, Error>>(notStarted);

  const call = useCallback(
    async (...args: CArgs) => {
      setResult(pending);

      try {
        const t = await request(...args);

        setResult(state(ResultState.Value, t));
      } catch (err) {
        setResult(state(ResultState.Error, handleUnknownError(err)));
      }
    },
    [request],
  );

  return [result, call, () => setResult(notStarted)];
};