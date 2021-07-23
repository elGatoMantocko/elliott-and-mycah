import { Effects, Reducer, useElmish } from 'react-use-elmish';

import { fromAsyncIterable } from '../../../effects/fromAsyncIterable';
import { Guests } from '../../../models/guest';
import { RsvpActions, RsvpActionTypes } from './actions';
import { State } from './state';
import { submitGuests } from './submitGuests';

/**
 * A reducer to manage and configure the RSVP state and effects available to components.
 *
 * @param state The current RSVP reducer state
 * @param action An action deployed to the reducer
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
    return [{ ...state, guests: [...state.guests, action.payload] }, Effects.none()];
  }
  if (action.type === RsvpActionTypes.RemoveGuest) {
    return [
      { ...state, guests: [...state.guests.filter(({ id }) => id !== action.payload)] },
      Effects.none(),
    ];
  }
  if (action.type === RsvpActionTypes.UpdateGuest) {
    const guestIndex = state.guests.findIndex(({ id }) => id === action.payload.id);
    if (guestIndex === -1) {
      return [
        state,
        Effects.action({
          type: RsvpActionTypes.Error,
          payload: new Error("Attempted to update a guest that doesn't exist."),
        }),
      ];
    }

    return [
      {
        ...state,
        guests: [
          ...state.guests.slice(0, guestIndex),
          { ...state.guests[guestIndex], ...action.payload },
          ...state.guests.slice(guestIndex + 1),
        ],
      },
      Effects.none(),
    ];
  }

  // set the attendance status to yes or no
  if (action.type === RsvpActionTypes.SetYesNo) {
    return [{ ...state, isAttending: action.payload }, Effects.none()];
  }

  // clears the collection of guests from the guests state
  if (action.type === RsvpActionTypes.ClearGuests) {
    return [
      {
        ...state,
        guests: [],
        isAttending: true,
      },
      Effects.none(),
    ];
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
