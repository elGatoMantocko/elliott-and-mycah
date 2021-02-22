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

export const useResult = <T,>(request: () => Promise<T>): Result<T, Error> => {
  const [result, setResult] = useState<Result<T, Error>>(notStarted);
  useEffect(() => {
    setResult(pending);
    request()
      .then((t) => setResult(state(ResultState.Value, t)))
      .catch((err: Error) => setResult(state(ResultState.Error, err)));

    return () => setResult(notStarted);
    // ignore `request` as it as a potential to be an arrow function (new'd up every time)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return result;
};

export const useCallableResult = <TRequest extends readonly unknown[], TResponse>(
  request: (...args: TRequest) => Promise<TResponse>,
): [(...args: TRequest) => void, Result<TResponse, Error>, () => void] => {
  const [result, setResult] = useState<Result<TResponse, Error>>(notStarted);
  const call = useCallback((...args: TRequest) => {
    setResult(pending);
    request(...args)
      .then((t) => setResult(state(ResultState.Value, t)))
      .catch((err: Error) => setResult(state(ResultState.Error, err)));
    // ignore `request` as it as a potential to be an arrow function (new'd up every time)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [call, result, () => setResult(notStarted)];
};
