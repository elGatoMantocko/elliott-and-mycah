import { Guests } from '../../../models/guest';

export type State = {
  yesNo: boolean;
  guests: Guests;
  showRsvpModal?: boolean;
  showSuccessSnack?: boolean;
  loading?: boolean;
  error?: Error;
};
