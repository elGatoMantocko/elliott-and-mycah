import { DependencyList, useCallback, useEffect, useState } from 'react';

import { State, state } from '../models/state';

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

type UseResultValue<C extends () => Promise<unknown>> = C extends () => Promise<infer CResult>
  ? CResult
  : never;

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const requestCb = useCallback(request, deps);

  useEffect(() => {
    let isSubscribed = true;

    isSubscribed && setResult(pending);
    requestCb()
      .then((t) => isSubscribed && setResult(state(ResultState.Value, t)))
      .catch((err) => isSubscribed && setResult(state(ResultState.Error, err)));

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
        if (err instanceof Error) {
          setResult(state(ResultState.Error, err));
        } else if (typeof err === 'string') {
          setResult(state(ResultState.Error, new Error(err)));
        } else if (typeof err === 'object') {
          setResult(
            state(
              ResultState.Error,
              new Error(`encountered error in useCallableResult: ${JSON.stringify(err)}`),
            ),
          );
        } else {
          setResult(
            state(ResultState.Error, new Error('encountered unknown error in useCallableResult')),
          );
        }
      }
    },
    [request],
  );

  return [result, call, () => setResult(notStarted)];
};
