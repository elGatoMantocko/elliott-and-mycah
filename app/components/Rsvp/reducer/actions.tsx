import { Guest } from '../../../models/guest';

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
