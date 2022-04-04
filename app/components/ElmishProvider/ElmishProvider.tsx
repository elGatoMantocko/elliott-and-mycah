import React, { createContext, PropsWithChildren, useContext } from 'react';
import useElmish, { Dispatch, Reducer, StateEffectPair } from 'react-use-elmish';

/**
 * Generic type for an elmish context.
 */
type ElmishContext<R extends Reducer<any, any>> = R extends Reducer<infer S, infer A>
  ? [S, Dispatch<A>]
  : never;

/**
 * Context for the reducer provider.
 */
const ElmishContext = createContext<[any, Dispatch<any>]>([
  null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
]);

interface ElmishProviderProps<State, Actions> {
  reducer: Reducer<State, Actions>;
  initializer: () => StateEffectPair<State, Actions>;
}

/**
 * Component to hold a context for the reducer.
 *
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
  return <ElmishContext.Provider value={ctx}>{children}</ElmishContext.Provider>;
};

/**
 * Hook to get the state/dispatch tuple for the elmish reducer.
 *
 * @returns tuple of state/dispatch for the elmish reducer
 */
export const useElmishContext = <State, Actions>(): [State, Dispatch<Actions>] => {
  const context = useContext(ElmishContext);

  if (context == null) {
    throw new Error('no elmish context found. make sure you have a <ElmishProvider>');
  }

  return context;
};

/**
 * Hook to get the dispatch function of the reducer context.
 *
 * @returns dispatch function for the reducer
 */
export const useDispatch = <Actions,>() => useElmishContext<unknown, Actions>()[1];
