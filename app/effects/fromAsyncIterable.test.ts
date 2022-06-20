import { act, renderHook } from '@testing-library/react';
import { Effects, Reducer, useElmish } from 'react-use-elmish';

import { fromAsyncIterable } from './fromAsyncIterable';

const testIterator = {
  async *[Symbol.asyncIterator]() {
    yield 'foo';
    yield 'bar';
    yield 'baz';
  },
};

type TestActions = 'foo' | 'bar' | 'baz' | 'test';

it('should dispatch effects for a useElmish pattern', async () => {
  const { result } = renderHook(() =>
    useElmish<Reducer<string, TestActions>>(
      (state, action) => {
        if (action === 'foo' || action === 'bar' || action === 'baz') {
          return [state + action, Effects.none()];
        }
        // basic action that yields both foo and bar
        if (action === 'test') {
          return [state, fromAsyncIterable(testIterator)];
        }
        return [state, Effects.none()];
      },
      () => ['', Effects.none()],
    ),
  );

  // after the initial render we should just get ''
  expect(result.current[0]).toEqual('');

  // dispatching this action will yield 3 other actions
  await act(() => result.current[1]('test'));
  expect(result.current[0]).toEqual('foobarbaz');
});

it('should call the dispatch functions in the correct order', async () => {
  const func = jest.fn();

  /**
   * should return an effect tuple
   * `[(dispatch: Dispatch<'foo' | 'bar' | 'baz'>) => void]`
   */
  const [effect] = fromAsyncIterable(testIterator);

  await effect(func);

  expect(func).toHaveBeenNthCalledWith(1, 'foo');
  expect(func).toHaveBeenNthCalledWith(2, 'bar');
  expect(func).toHaveBeenNthCalledWith(3, 'baz');
});
