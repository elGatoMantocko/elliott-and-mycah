import { Effects, Reducer, useElmish } from 'react-use-elmish';

import { fromAsyncIterable } from '../../../effects/fromAsyncIterable';
import { Guests } from '../../../models/guest';
import { RsvpActions, RsvpActionTypes } from './actions';
import { State } from './state';
import { submitGuests } from './submitGuests';

/**
 * A reducer to manage and configure the RSVP state and effects available to components.
 * @param {State} state The current RSVP reducer state
 * @param {RsvpActions} action An action deployed to the reducer
 * @returns state effect pair resolved by further reducer actions
 */
export const rsvpReducer: Reducer<State, RsvpActions> = (state, action) => {
  // loading and error state handlers
  if (action.type === RsvpActionTypes.Loading) {
    if (action.payload === state.loading) {
      return [state, Effects.none()];
    }
    return [{ ...state, loading: action.payload }, Effects.none()];
  }
  if (action.type === RsvpActionTypes.Error) {
    if (action.payload === state.error) {
      return [state, Effects.none()];
    }
    return [{ ...state, error: action.payload }, Effects.none()];
  }

  // crud on guests
  if (action.type === RsvpActionTypes.AddGuest) {
    state.guests.set(action.payload.id, action.payload.guest);
    return [{ ...state, guests: new Map(state.guests.entries()) }, Effects.none()];
  }
  if (action.type === RsvpActionTypes.RemoveGuest) {
    state.guests.delete(action.payload.id);
    return [{ ...state, guests: new Map(state.guests.entries()) }, Effects.none()];
  }
  if (action.type === RsvpActionTypes.UpdateGuest) {
    const guest = state.guests.get(action.payload.id);
    if (guest == null) {
      return [
        state,
        Effects.action({
          type: RsvpActionTypes.Error,
          payload: new Error("Attempted to update a guest that doesn't exist."),
        }),
      ];
    }
    return [
      state,
      Effects.action({
        type: RsvpActionTypes.AddGuest,
        payload: { id: action.payload.id, guest: { ...guest, ...action.payload.guest } },
      }),
    ];
  }

  // set the attendance status to yes or no
  if (action.type === RsvpActionTypes.SetYesNo) {
    return [{ ...state, isAttending: action.payload }, Effects.none()];
  }

  // submit and it's actions
  if (action.type === RsvpActionTypes.SubmitGuests) {
    for (const guest of state.guests.values()) {
      if (guest.firstName === '') {
        return [
          state,
          Effects.action({
            type: RsvpActionTypes.Error,
            payload: new Error('Invalid guest field. First name cannot be empty.'),
          }),
        ];
      }
      if (guest.lastName === '') {
        return [
          state,
          Effects.action({
            type: RsvpActionTypes.Error,
            payload: new Error('Invalid guest field. Last name cannot be empty.'),
          }),
        ];
      }
      if (guest.foodChoice == null && !!state.isAttending) {
        return [
          state,
          Effects.action({
            type: RsvpActionTypes.Error,
            payload: new Error('Invalid guest field. Food choice cannot be empty.'),
          }),
        ];
      }
    }
    return [state, fromAsyncIterable(submitGuests(state.guests, state.isAttending))];
  }

  if (action.type === RsvpActionTypes.ShowSubmitSuccessSnack) {
    return [{ ...state, showSuccessSnack: true }, Effects.none()];
  }

  if (action.type === RsvpActionTypes.ShowDeclinedSnack) {
    return [{ ...state, showDeclinedSnack: true }, Effects.none()];
  }

  if (action.type === RsvpActionTypes.HideSnack) {
    return [
      { ...state, showSuccessSnack: undefined, showDeclinedSnack: undefined },
      Effects.none(),
    ];
  }

  if (
    action.type === RsvpActionTypes.ShowRsvpModal ||
    action.type === RsvpActionTypes.HideRsvpModal
  ) {
    return [
      { ...state, showRsvpModal: action.type === RsvpActionTypes.ShowRsvpModal },
      Effects.none(),
    ];
  }
  return [state, Effects.none()];
};

export const useRsvpReducer = (initialGuests: Guests) =>
  useElmish<Reducer<State, RsvpActions>>(rsvpReducer, () => [
    {
      guests: initialGuests,
      isAttending: true,
    },
    Effects.none(),
  ]);
