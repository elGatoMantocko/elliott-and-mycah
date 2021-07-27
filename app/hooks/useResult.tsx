import { useCallback, useEffect, useState } from 'react';

import { State, state } from '../models/state';
import { useStaticCallback } from './useStaticCallback';

export enum ResultState {
  NotStarted = 'not-started',
  Pending = 'pending',
  Value = 'value',
  Error = 'error',
  Cancelled = 'cancelled',
}

type Result<T, U> =
  | State<ResultState.NotStarted>
  | State<ResultState.Pending>
  | State<ResultState.Cancelled>
  | State<ResultState.Value, T>
  | State<ResultState.Error, U>;

const pending: State<ResultState.Pending> = state(ResultState.Pending);
const notStarted: State<ResultState.NotStarted> = state(ResultState.NotStarted);
const cancelled: State<ResultState.Cancelled> = state(ResultState.Cancelled);

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

/**
 * Function to get a result from an asynchronous function.
 *
 * @param request asynchronous function to map to a result state
 * @returns result state object
 */
export const useResult = <T,>(request: () => Promise<T>) => {
  const [result, setResult] = useState<Result<T, Error>>(notStarted);
  useEffect(() => {
    setResult(pending);
    request()
      .then((t) => setResult(state(ResultState.Value, t)))
      .catch((err) => setResult(state(ResultState.Error, err)));
  }, [request]);
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

/**
 * Hook to get a callable function that sets the result state. Can be reset to `not-started`
 *  with the 3rd option in the tuple, and cancelled with the 4th.
 *
 * @param request function to call
 * @returns tuple representing the [result-state, callable, reset, cancel] options
 */
export const useCallableResult = <TRequest extends readonly unknown[], TResponse>(
  request: (...args: TRequest) => Promise<TResponse>,
): [Result<TResponse, Error>, (...args: TRequest) => void, () => void, () => void] => {
  const [result, setResult] = useState<Result<TResponse, Error>>(notStarted);
  const [cancel, setCancel] = useState<() => void>(noop);
  const call = useCallback(
    (...args: TRequest) => {
      setResult(pending);
      const cancellable = new Promise<void>((_res, rej) => setCancel(rej));

      Promise.race([
        cancellable,
        request(...args)
          .then((t) => setResult(state(ResultState.Value, t)))
          .catch((err) => setResult(state(ResultState.Error, err))),
      ]).catch(() => setResult(cancelled));
    },
    [request],
  );
  return [result, call, () => setResult(notStarted), cancel];
};
