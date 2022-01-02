import { DependencyList, useCallback, useEffect, useState } from 'react';

import { State, state } from '../models/state';
import { useStaticCallback } from './useStaticCallback';

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

const useValue = <V, E, T extends (v: V) => void>(result: Result<V, E>, then: T) => {
  const cb = useStaticCallback(then);
  useEffect(() => {
    if (result.state === ResultState.Value) {
      cb(result.value);
    }
  }, [result, cb]);
};

const useCatch = <V, E, T extends (e: E) => void>(result: Result<V, E>, then: T) => {
  const cb = useStaticCallback(then);
  useEffect(() => {
    if (result.state === ResultState.Error) {
      cb(result.value);
    }
  }, [result, cb]);
};

const usePending = <V, E, T extends () => void>(result: Result<V, E>, then: T) => {
  const cb = useStaticCallback(then);
  useEffect(() => {
    if (result.state === ResultState.Pending) {
      cb();
    }
  }, [result, cb]);
};

const useNotStarted = <V, E, T extends () => void>(result: Result<V, E>, then: T) => {
  const cb = useStaticCallback(then);
  useEffect(() => {
    if (result.state === ResultState.NotStarted) {
      cb();
    }
  }, [result, cb]);
};

export const fromResult = <
  V,
  E,
  VFunc extends (v: V) => void,
  EFunc extends (e: E) => void,
  PFunc extends () => void,
  NSFunc extends () => void,
>(
  result: Result<V, E>,
) => ({
  useValue: (then: VFunc) => useValue(result, then),
  useCatch: (then: EFunc) => useCatch(result, then),
  usePending: (then: PFunc) => usePending(result, then),
  useNotStarted: (then: NSFunc) => useNotStarted(result, then),
});

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

type Callable<CArgs extends readonly unknown[], CResult> = (...args: CArgs) => Promise<CResult>;

type CallableArgs<C extends Callable<readonly unknown[], unknown>> = C extends (
  ...args: infer CArgs
) => Promise<unknown>
  ? CArgs
  : never;

type CallableResponse<C extends Callable<readonly unknown[], unknown>> = C extends (
  ...args: readonly unknown[]
) => Promise<infer CValue>
  ? CValue
  : never;

/**
 * Hook to get a callable function that sets the result state. Can be reset to `not-started`
 *  with the 3rd option in the tuple.
 *
 * @param request function to call
 * @returns tuple representing the `[result-state, callable, reset]` options
 */
export const useCallableResult = <
  C extends Callable<readonly unknown[], unknown>,
  CArgs extends CallableArgs<C>,
  CResponse extends CallableResponse<C>,
>(
  request: C extends (...args: CArgs) => Promise<CResponse> ? C : never,
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
