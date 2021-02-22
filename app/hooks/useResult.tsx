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

const useValue = <T, V>(result: Result<T, V>, then: (v: T) => void) =>
  useEffect(() => {
    if (result.state === ResultState.Value) {
      then(result.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

const useCatch = <V, E>(result: Result<V, E>, then: (e: E) => void) =>
  useEffect(() => {
    if (result.state === ResultState.Error) {
      then(result.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

const usePending = <V, E>(result: Result<V, E>, then: () => void) =>
  useEffect(() => {
    if (result.state === ResultState.Pending) {
      then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

const useNotStarted = <V, E>(result: Result<V, E>, then: () => void) =>
  useEffect(() => {
    if (result.state === ResultState.NotStarted) {
      then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

export const useResultState = <V, E>(result: Result<V, E>) => ({
  useValue: (then: (v: V) => void) => useValue(result, then),
  useCatch: (then: (v: E) => void) => useCatch(result, then),
  usePending: (then: () => void) => usePending(result, then),
  useNotStarted: (then: () => void) => useNotStarted(result, then),
});

export const useResult = <T,>(request: () => Promise<T>) => {
  const [result, setResult] = useState<Result<T, Error>>(notStarted);
  useEffect(() => {
    setResult(pending);
    request()
      .then((t) => setResult(state(ResultState.Value, t)))
      .catch((err) => setResult(state(ResultState.Error, err)));
    // ignore `request` as it as a potential to be an arrow function (new'd up every time)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return result;
};

export const useCallableResult = <TRequest extends readonly unknown[], TResponse>(
  request: (...args: TRequest) => Promise<TResponse>,
): [Result<TResponse, Error>, (...args: TRequest) => void, () => void] => {
  const [result, setResult] = useState<Result<TResponse, Error>>(notStarted);
  const call = useCallback((...args: TRequest) => {
    setResult(pending);
    request(...args)
      .then((t) => setResult(state(ResultState.Value, t)))
      .catch((err) => setResult(state(ResultState.Error, err)));
    // ignore `request` as it as a potential to be an arrow function (new'd up every time)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [result, call, () => setResult(notStarted)];
};
