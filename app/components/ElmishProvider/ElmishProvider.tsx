// I'm not sure how context definition works with react-refresh
// we define a context, but then want to expose that context in hooks
// exported by this file
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, PropsWithChildren, useContext } from 'react';
import { Dispatch, Reducer, StateEffectPair, useElmish } from 'react-use-elmish';

// This `noop` function is only used as an initializer for the original
// react context that we create but as soon as someone pulls in the `<ElmishProvider>` component,
// it immediately gets overwritten by the dispatch function given by `useElmish` so it's not actually
// possible to be used because we don't expose the `ElmishContext` outside of the provider itself.
const noop = () => {};

/**
 * Generic type for an elmish context.
 */
type ElmishContext<R extends Reducer<unknown, unknown>> = R extends Reducer<infer S, infer A>
  ? [S, Dispatch<A>]
  : never;

/**
 * Context for the reducer provider.
 */
const ElmishContext = createContext<[unknown, Dispatch<unknown>]>([null, noop]);

interface ElmishProviderProps<State, Actions> {
  reducer: Reducer<State, Actions>;
  initializer: () => StateEffectPair<State, Actions>;
}

/**
 * Component to hold a context for the reducer.
 * @param param0 props
 * @param param0.children children props to be rendered under this context
 * @param param0.reducer reducer to use in the elmish context
 * @param param0.initializer how to initialize state on the reducer
 * @returns react element wrapped in the reducer context
 */
export const ElmishProvider = <State, Actions>({
  reducer,
  initializer,
  children,
}: PropsWithChildren<ElmishProviderProps<State, Actions>>) => {
  const ctx = useElmish(reducer, initializer);

  // initialize the reducer and return the provider
  return (
    // this type doesn't actually matter because it gets overridden by
    <ElmishContext.Provider value={ctx as [unknown, Dispatch<unknown>]}>
      {children}
    </ElmishContext.Provider>
  );
};

/**
 * Hook to get the state/dispatch tuple for the elmish reducer.
 * @returns tuple of state/dispatch for the elmish reducer
 */
export const useElmishContext = <State, Actions>(): [State, Dispatch<Actions>] => {
  const context = useContext(ElmishContext);

  // we initialize the context to `[null, noop]` so we just check that it's
  // not equal to the null and noop reference
  if (context[0] == null && context[1] === noop) {
    throw new Error('no elmish context found. make sure you have a <ElmishProvider>');
  }

  return context as [State, Dispatch<Actions>];
};

/**
 * Hook to get the dispatch function of the reducer context.
 * @returns dispatch function for the reducer
 */
export const useDispatch = <Actions,>() => {
  const [, dispatch] = useElmishContext<unknown, Actions>();
  return dispatch;
};
