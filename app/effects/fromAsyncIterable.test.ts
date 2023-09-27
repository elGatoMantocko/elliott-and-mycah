import { act, renderHook } from '@testing-library/react';
import { Effects, Reducer, ReducerStateEffectPair, useElmish } from 'react-use-elmish';

import { fromAsyncIterable } from '.';

const testIterator = {
  async *[Symbol.asyncIterator](): AsyncGenerator<'foo' | 'bar' | 'baz'> {
    yield 'foo';
    yield 'bar';
    yield 'baz';
  },
};

// ensure `fromAsyncIterable` is compatible with elmish
it('should dispatch effects for a useElmish pattern', async () => {
  // bootstrapped logic for reducer + initializer
  const reducer: Reducer<string, string> = (state, action) => {
    if (action === 'test') {
      return [state, fromAsyncIterable(testIterator)];
    }
    return [state + action, Effects.none()];
  };
  const initializer: () => ReducerStateEffectPair<typeof reducer> = () => ['', Effects.none()];

  const { result } = renderHook(() => useElmish<Reducer<string, string>>(reducer, initializer));

  // after the initial render we should just get ''
  expect(result.current[0]).toEqual('');

  // dispatching this action will yield 3 other actions
  await act(async () => result.current[1]('test'));
  expect(result.current[0]).toEqual('foobarbaz');
});

it('should call the dispatch functions in the correct order', async () => {
  const func = vi.fn();

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
