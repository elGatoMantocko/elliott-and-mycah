import { useCallback, useEffect, useState } from 'react';

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

const useValue = <V, E, T extends (v: V) => void>(result: Result<V, E>, then: T) =>
  useEffect(() => {
    if (result.state === ResultState.Value) {
      then(result.value);
    }
  }, [result, then]);

const useCatch = <V, E, T extends (e: E) => void>(result: Result<V, E>, then: T) => {
  useEffect(() => {
    if (result.state === ResultState.Error) {
      then(result.value);
    }
  }, [result, then]);
};

const usePending = <V, E, T extends () => void>(result: Result<V, E>, then: T) =>
  useEffect(() => {
    if (result.state === ResultState.Pending) {
      then();
    }
  }, [result, then]);

const useNotStarted = <V, E, T extends () => void>(result: Result<V, E>, then: T) =>
  useEffect(() => {
    if (result.state === ResultState.NotStarted) {
      then();
    }
  }, [result, then]);

export const useResultState = <
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

export const useCallableResult = <TRequest extends readonly unknown[], TResponse>(
  request: (...args: TRequest) => Promise<TResponse>,
): [Result<TResponse, Error>, (...args: TRequest) => void, () => void] => {
  const [result, setResult] = useState<Result<TResponse, Error>>(notStarted);
  const call = useCallback(
    (...args: TRequest) => {
      setResult(pending);
      request(...args)
        .then((t) => setResult(state(ResultState.Value, t)))
        .catch((err) => setResult(state(ResultState.Error, err)));
    },
    [request],
  );
  return [result, call, () => setResult(notStarted)];
};
