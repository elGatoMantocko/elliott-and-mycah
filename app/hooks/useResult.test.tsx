import { act, renderHook } from '@testing-library/react-hooks';

import { state } from '../models/state';
import { ResultState, useCallableResult, useResult } from './useResult';

describe('useResult', () => {
  it('should resolve to pending/value for value result', async () => {
    const { result, waitFor } = renderHook(() => useResult(async () => 'test', []));
    expect(result.current).toEqual(state(ResultState.Pending));
    await waitFor(() => result.current.state !== ResultState.Pending);
    expect(result.current).toEqual(state(ResultState.Value, 'test'));
  });

  it('should resolve to pending/error for error result', async () => {
    const { result, waitFor } = renderHook(() =>
      useResult(async () => {
        throw new Error('test');
      }, []),
    );
    expect(result.current).toEqual(state(ResultState.Pending));
    await waitFor(() => result.current.state !== ResultState.Pending);
    expect(result.current).toEqual(state(ResultState.Error, new Error('test')));
  });

  it('should re-call the request if deps change', async () => {
    const { result, waitFor, rerender } = renderHook(
      (data: string) => useResult(async () => data, [data]),
      {
        initialProps: 'test',
      },
    );

    expect(result.current).toEqual(state(ResultState.Pending));
    await waitFor(() => result.current.state !== ResultState.Pending);
    expect(result.current).toEqual(state(ResultState.Value, 'test'));

    rerender('hello world');
    expect(result.current).toEqual(state(ResultState.Pending));
    await waitFor(() => result.current.state !== ResultState.Pending);
    expect(result.current).toEqual(state(ResultState.Value, 'hello world'));
  });
});

describe('useCallableResult', () => {
  it('should resolve to pending/value for a called value result', async () => {
    const { result, waitFor } = renderHook(() => useCallableResult(async (data: string) => data));

    expect(result.current[0]).toEqual(state(ResultState.NotStarted));

    // call once with 'test'
    act(() => result.current[1]('test'));
    expect(result.current[0]).toEqual(state(ResultState.Pending));
    await waitFor(() => result.current[0].state !== ResultState.Pending);
    expect(result.current[0]).toEqual(state(ResultState.Value, 'test'));

    // call again with 'test2'
    act(() => result.current[1]('test2'));
    expect(result.current[0]).toEqual(state(ResultState.Pending));
    await waitFor(() => result.current[0].state !== ResultState.Pending);
    expect(result.current[0]).toEqual(state(ResultState.Value, 'test2'));
  });

  it('should resolve to pending/error for a called error result', async () => {
    const { result, waitFor } = renderHook(() =>
      useCallableResult(async () => {
        throw new Error('test');
      }),
    );

    expect(result.current[0]).toEqual(state(ResultState.NotStarted));

    // call once
    act(() => result.current[1]());
    expect(result.current[0]).toEqual(state(ResultState.Pending));
    await waitFor(() => result.current[0].state !== ResultState.Pending);
    expect(result.current[0]).toEqual(state(ResultState.Error, new Error('test')));
  });
});
