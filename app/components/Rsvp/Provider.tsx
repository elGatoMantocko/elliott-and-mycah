import React, { createContext, PropsWithChildren, useContext } from 'react';
import { Dispatch, Reducer, ReducerAction, ReducerState } from 'react-use-elmish';

import { uuid } from '../../models/uuid';
import { useRsvpReducer } from './reducer';
import { RsvpActions } from './reducer/actions';
import { State } from './reducer/state';

type RsvpReducer = Reducer<State, RsvpActions>;

/**
 * Generic type for an elmish context.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ElmishContext<R extends Reducer<any, any>> = R extends Reducer<infer S, infer A>
  ? [S, Dispatch<A>]
  : never;

/**
 * Context for the rsvp reducer provider.
 */
const RsvpReducerContext = createContext<ElmishContext<RsvpReducer>>([
  { isAttending: true, guests: [] },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
]);

/**
 * Component to hold a context for the rsvp reducer.
 *
 * @param param0 props
 * @param param0.children children props to be rendered under this context
 * @returns react element wrapped in the rsvp reducer context
 */
export const RsvpProvider = ({ children }: PropsWithChildren<unknown>) => {
  // initialize the reducer and return the provider
  return (
    <RsvpReducerContext.Provider
      value={useRsvpReducer([{ id: uuid(), firstName: '', lastName: '' }])}
    >
      {children}
    </RsvpReducerContext.Provider>
  );
};

/**
 * Hook to get the state/dispatch tuple for the elmish rsvp reducer.
 *
 * @returns tuple of state/dispatch for the elmish reducer
 */
export const useRsvp = (): [ReducerState<RsvpReducer>, Dispatch<ReducerAction<RsvpReducer>>] => {
  return useContext(RsvpReducerContext);
};

/**
 * Hook to get the dispatch function of the rsvp reducer context.
 *
 * @returns dispatch function for the rsvp reducer
 */
export const useRsvpDispatch = () => useRsvp()[1];
