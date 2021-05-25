import { Guests } from '../../../models/guest';

export type State = {
  isAttending: boolean;
  guests: Guests;
  showRsvpModal?: boolean;
  showSuccessSnack?: boolean;
  showDeclinedSnack?: boolean;
  loading?: boolean;
  error?: Error;
};
