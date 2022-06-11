import { act, renderHook, waitFor } from '@testing-library/react';

import { state } from '../models/state';
import { ResultState, useCallableResult, useResult } from './useResult';

describe('useResult', () => {
  it('should resolve to pending/value for value result', async () => {
    const asyncFn = jest.fn(async () => 'test');
    const { result, rerender } = renderHook(() => useResult(asyncFn, []));

    expect(result.current).toEqual(state(ResultState.Pending));

    await waitFor(() => result.current.state !== ResultState.Pending);
    rerender();

    expect(asyncFn).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual(state(ResultState.Value, 'test'));
  });

  it('should resolve to pending/error for error result', async () => {
    const asyncFn = jest.fn(async () => {
      act(() => {
        throw new Error('test');
      });
    });
    const { result, rerender } = renderHook(() => useResult(asyncFn, []));

    expect(result.current).toEqual(state(ResultState.Pending));

    await waitFor(() => result.current.state !== ResultState.Pending);
    rerender();

    expect(asyncFn).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual(state(ResultState.Error, new Error('test')));
  });

  it('should re-call the request if deps change', async () => {
    // initial render results in a pending state
    const { result, rerender } = renderHook((data: string) => useResult(async () => data, [data]), {
      initialProps: 'test',
    });
    expect(result.current).toEqual(state(ResultState.Pending));
    await waitFor(() => result.current.state !== ResultState.Pending);

    // rerender with the same initial props (but resolves to a value now after waiting)
    rerender('test');
    expect(result.current).toEqual(state(ResultState.Value, 'test'));

    // rerender with new props
    rerender('hello world');
    expect(result.current).toEqual(state(ResultState.Pending));
    await waitFor(() => result.current.state !== ResultState.Pending);

    // rerender with the new props again (but resolves to a value after waiting)
    rerender('hello world');

    expect(result.current).toEqual(state(ResultState.Value, 'hello world'));
  });
});

describe('useCallableResult', () => {
  it('should resolve to pending/value for a called value result', async () => {
    const asyncFn = jest.fn(async (data: string) => data);
    const { result, rerender } = renderHook(() => useCallableResult(asyncFn));

    expect(result.current[0]).toEqual(state(ResultState.NotStarted));

    // call once with 'test' and rerender
    act(() => {
      const [, call] = result.current;
      call('test');
    });
    rerender();

    // entered a pending state
    expect(result.current[0]).toEqual(state(ResultState.Pending));
    expect(asyncFn).toHaveBeenCalledWith('test');

    // wait for the result to finish (not be pending) and rerender
    await waitFor(() => {
      const [data] = result.current;
      return data.state !== ResultState.Pending;
    });
    rerender();

    expect(result.current[0]).toEqual(state(ResultState.Value, 'test'));

    // call again with 'test2' and rerender
    act(() => {
      const [, call] = result.current;
      call('test2');
    });
    rerender();

    expect(result.current[0]).toEqual(state(ResultState.Pending));
    expect(asyncFn).toHaveBeenCalledWith('test2');

    // wait for the result to finish (not be pending) and rerender
    await waitFor(() => {
      const [data] = result.current;
      return data.state !== ResultState.Pending;
    });
    rerender();

    expect(result.current[0]).toEqual(state(ResultState.Value, 'test2'));
    expect(asyncFn).toHaveBeenCalledTimes(2);
  });

  it('should resolve to pending/error for a called error result', async () => {
    const asyncFn = jest.fn(async () => {
      throw new Error('test');
    });
    const { result, rerender } = renderHook(() => useCallableResult(asyncFn));

    expect(result.current[0]).toEqual(state(ResultState.NotStarted));

    // call once and rerender
    act(() => {
      const [, call] = result.current;
      call();
    });
    rerender();

    expect(result.current[0]).toEqual(state(ResultState.Pending));
    expect(asyncFn).toHaveBeenCalled();

    // wait for the result to finish and rerender
    await waitFor(() => {
      const [data] = result.current;
      return data.state !== ResultState.Pending;
    });
    rerender();

    expect(result.current[0]).toEqual(state(ResultState.Error, new Error('test')));
  });

  it('should reset state to not-started', async () => {
    const { result, rerender } = renderHook(() => useCallableResult(async (data: string) => data));

    expect(result.current[0]).toEqual(state(ResultState.NotStarted));

    // call once with 'test'
    act(() => {
      const [, call] = result.current;
      call('test');
    });
    rerender();

    await waitFor(() => {
      const [data] = result.current;
      return data.state !== ResultState.Pending;
    });
    rerender();

    expect(result.current[0]).toEqual(state(ResultState.Value, 'test'));

    // call again with 'test2'
    act(() => {
      const [, , reset] = result.current;
      reset();
    });
    rerender();

    expect(result.current[0]).toEqual(state(ResultState.NotStarted));
  });
});
