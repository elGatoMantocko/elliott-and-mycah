import { Effects, Reducer, useElmish } from 'react-use-elmish';

import { Guest, Guests } from '../models/guest';

export enum GuestActionTypes {
  Add = 'add-new-guest',
  Remove = 'remove-guest',
  Update = 'update-guest',
  Error = 'guest-action-error',
}

type AddGuestAction = { type: GuestActionTypes.Add; payload: { guest: Guest; id: string } };
type RemoveGuestAction = { type: GuestActionTypes.Remove; payload: { id: string } };
type UpdateGuest = {
  type: GuestActionTypes.Update;
  payload: { id: string; guest: Partial<Guest> };
};

// TODO: for now errors are swallowed
type ActionError = { type: GuestActionTypes.Error; payload: Error };

type GuestsActions = AddGuestAction | RemoveGuestAction | UpdateGuest | ActionError;

export const useGuestsReducer = (initialGuests: Guests) =>
  useElmish<Reducer<Guests, GuestsActions>>(
    (state, action) => {
      if (action.type === GuestActionTypes.Add) {
        state.set(action.payload.id, action.payload.guest);
        return [new Map(state.entries()), Effects.none()];
      }
      if (action.type === GuestActionTypes.Remove) {
        state.delete(action.payload.id);
        return [new Map(state.entries()), Effects.none()];
      }
      if (action.type === GuestActionTypes.Update) {
        const guest = state.get(action.payload.id);
        if (guest == null) {
          return [
            state,
            Effects.action({
              type: GuestActionTypes.Error,
              payload: new Error("Attempted to update a guest that doesn't exist."),
            }),
          ];
        }
        return [
          state,
          Effects.action({
            type: GuestActionTypes.Add,
            payload: { id: action.payload.id, guest: { ...guest, ...action.payload.guest } },
          }),
        ];
      }
      return [state, Effects.none()];
    },
    () => [initialGuests, Effects.none()],
  );
