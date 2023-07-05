import type { Dispatch } from 'react-use-elmish';

/**
 * We can leverage the fact that `() => void` can extend `() => Promise<void>`.
 *
 * Therefore `AsyncEffect<Action>` can extend `Effect<Action>`.
 */
type AsyncEffect<Action> = Array<(dispatch: Dispatch<Action>) => Promise<void>>;

/**
 * Get an effect from an asynchronous iterator. This effect will dispatch each asynchronous action in order.
 *
 * Returns an `AsyncEffect<Action>` (`[(dispatch: Dispatch<Action>) => Promise<void>]`)
 * @param iterator async iterable that can iterate over a set of actions
 * @returns effect for a given actions
 */
export const fromAsyncIterable = <Action>(iterator: AsyncIterable<Action>): AsyncEffect<Action> => {
  return [
    async (dispatch) => {
      for await (const action of iterator) {
        dispatch(action);
      }
    },
  ];
};
