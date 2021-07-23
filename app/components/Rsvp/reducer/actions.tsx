import { Guest } from '../../../models/guest';
import { UUIDv4 } from '../../../models/uuid';

export enum RsvpActionTypes {
  AddGuest = 'add-new-guest',
  RemoveGuest = 'remove-guest',
  UpdateGuest = 'update-guest',
  SubmitGuests = 'submit-guests',
  ClearGuests = 'clear-guests',

  ShowSubmitSuccessSnack = 'show-submit-success-snack',
  ShowDeclinedSnack = 'show-declined-snack',
  HideSnack = 'hide-snackbar',

  ShowRsvpModal = 'show-rsvp-modal',
  HideRsvpModal = 'hide-rsvp-modal',

  SetYesNo = 'set-yes-no-response',

  Error = 'guest-action-error',
  Loading = 'guest-action-loading',
}

type AddGuestAction = { type: RsvpActionTypes.AddGuest; payload: Guest };
type RemoveGuestAction = { type: RsvpActionTypes.RemoveGuest; payload: UUIDv4 };
type UpdateGuest = {
  type: RsvpActionTypes.UpdateGuest;
  payload: { id: UUIDv4 } & Partial<Guest>;
};
type ClearGuestsAction = { type: RsvpActionTypes.ClearGuests };

type SubmitGuests = { type: RsvpActionTypes.SubmitGuests };

type ShowSubmitSuccessSnack = { type: RsvpActionTypes.ShowSubmitSuccessSnack };
type ShowDeclinedSnack = { type: RsvpActionTypes.ShowDeclinedSnack };
type HideSnack = { type: RsvpActionTypes.HideSnack };

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
  | ClearGuestsAction
  | SetYesNo
  | SubmitGuests
  | ShowSubmitSuccessSnack
  | ShowDeclinedSnack
  | HideSnack
  | ShowRsvpModal
  | HideRsvpModal
  | ActionLoading
  | ActionError;
