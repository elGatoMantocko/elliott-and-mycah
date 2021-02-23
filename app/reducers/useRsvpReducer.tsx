import { Effects, Reducer, useElmish } from 'react-use-elmish';

import { fromAsyncIterable } from '../effects/fromAsyncIterable';
import { Guest, Guests } from '../models/guest';
import { submitGuests } from './submitGuests';

export enum RsvpActionTypes {
  AddGuest = 'add-new-guest',
  RemoveGuest = 'remove-guest',
  UpdateGuest = 'update-guest',
  SubmitGuests = 'submit-guests',

  ShowSubmitSuccessSnack = 'show-submit-success-snack',
  HideSubmitSuccessSnack = 'hide-submit-success-snack',

  ShowRsvpModal = 'show-rsvp-modal',
  HideRsvpModal = 'hide-rsvp-modal',

  SetYesNo = 'set-yes-no-response',

  Error = 'guest-action-error',
  Loading = 'guest-action-loading',
}

type AddGuestAction = { type: RsvpActionTypes.AddGuest; payload: { guest: Guest; id: string } };
type RemoveGuestAction = { type: RsvpActionTypes.RemoveGuest; payload: { id: string } };
type UpdateGuest = {
  type: RsvpActionTypes.UpdateGuest;
  payload: { id: string; guest: Partial<Guest> };
};

type SubmitGuests = { type: RsvpActionTypes.SubmitGuests };
type ShowSubmitSuccessSnack = { type: RsvpActionTypes.ShowSubmitSuccessSnack };
type HideSubmitSuccessSnack = { type: RsvpActionTypes.HideSubmitSuccessSnack };

type ShowRsvpModal = { type: RsvpActionTypes.ShowRsvpModal };
type HideRsvpModal = { type: RsvpActionTypes.HideRsvpModal };

type SetYesNo = { type: RsvpActionTypes.SetYesNo; payload: boolean };

// TODO: for now errors are swallowed
type ActionError = { type: RsvpActionTypes.Error; payload?: Error };
type ActionLoading = { type: RsvpActionTypes.Loading; payload?: boolean };

export type RsvpActions =
  | AddGuestAction
  | RemoveGuestAction
  | UpdateGuest
  | SetYesNo
  | SubmitGuests
  | ShowSubmitSuccessSnack
  | HideSubmitSuccessSnack
  | ShowRsvpModal
  | HideRsvpModal
  | ActionLoading
  | ActionError;

type State = {
  yesNo: boolean;
  guests: Guests;
  showRsvpModal: boolean;
  showSuccessSnack: boolean;
  loading?: boolean;
  error?: Error;
};

export const useRsvpReducer = (initialGuests: Guests) =>
  useElmish<Reducer<State, RsvpActions>>(
    (state, action) => {
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
        return [{ ...state, yesNo: action.payload }, Effects.none()];
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
          if (guest.foodChoice == null) {
            return [
              state,
              Effects.action({
                type: RsvpActionTypes.Error,
                payload: new Error('Invalid guest field. Food choice cannot be empty.'),
              }),
            ];
          }
        }
        return [state, fromAsyncIterable(submitGuests(state.guests, state.yesNo))];
      }
      if (
        action.type === RsvpActionTypes.ShowSubmitSuccessSnack ||
        action.type === RsvpActionTypes.HideSubmitSuccessSnack
      ) {
        return [
          { ...state, showSuccessSnack: action.type === RsvpActionTypes.ShowSubmitSuccessSnack },
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
    },
    () => [
      {
        guests: initialGuests,
        yesNo: true,
        showRsvpModal: false,
        showSuccessSnack: false,
      },
      Effects.none(),
    ],
  );
