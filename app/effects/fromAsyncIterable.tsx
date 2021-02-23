import { Effect } from 'react-use-elmish';

export const fromAsyncIterable = <Action,>(iterator: AsyncIterable<Action>): Effect<Action> => {
  return [
    async (dispatch) => {
      for await (const action of iterator) {
        dispatch(action);
      }
    },
  ];
};
