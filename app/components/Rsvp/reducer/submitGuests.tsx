import { Guests } from '../../../models/guest';
import { RsvpActions, RsvpActionTypes } from './actions';

/**
 * A reducer effect that yields actions related to submitting guests to the google sheet.
 * @param {Guests} guests A collection of guests to add an RSVP status for
 * @param {boolean} isAttending Flag designating whether a guest is attending or not
 * @returns {AsyncGenerator<RsvpActions>} An async generator that yields RSVP reducer actions
 */
export async function* submitGuests(
  guests: Guests,
  isAttending?: boolean,
): AsyncGenerator<RsvpActions> {
  yield { type: RsvpActionTypes.Loading, payload: true };
  try {
    const body = JSON.stringify(
      Array.from(guests.values()).map((g) => ({ ...g, yesNo: !!isAttending })),
    );

    await fetch('https://sheet.best/api/sheets/4976d0ec-48c2-40ef-b4d3-740560714fb1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res;
    });

    yield { type: RsvpActionTypes.HideRsvpModal };
    if (isAttending) {
      yield { type: RsvpActionTypes.ShowSubmitSuccessSnack };
    } else {
      yield { type: RsvpActionTypes.ShowDeclinedSnack };
    }

    yield { type: RsvpActionTypes.ClearGuests };
  } catch (payload) {
    yield { type: RsvpActionTypes.Error, payload };
  }
  yield { type: RsvpActionTypes.Loading, payload: false };
  return;
}
