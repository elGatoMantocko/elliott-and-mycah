import { Guests } from '../../../models/guest';
import { RsvpActions, RsvpActionTypes } from './actions';

const addGuests = async (guests: Guests, isAttending?: boolean) => {
  const body = JSON.stringify(guests.map((g) => ({ ...g, yesNo: !!isAttending })));

  return await fetch('https://sheet.best/api/sheets/4976d0ec-48c2-40ef-b4d3-740560714fb1', {
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
};

/**
 * A reducer effect that yields actions related to submitting guests to the google sheet.
 *
 * @param guests A collection of guests to add an RSVP status for
 * @param isAttending Flag designating whether a guest is attending or not
 * @yields Various actions this generator provides.
 * @returns An async generator that yields RSVP reducer actions
 */
export async function* submitGuests(
  guests: Guests,
  isAttending?: boolean,
): AsyncGenerator<RsvpActions> {
  yield { type: RsvpActionTypes.Loading, payload: true };
  try {
    await addGuests(guests, isAttending);

    yield { type: RsvpActionTypes.HideRsvpModal };
    if (isAttending) {
      yield { type: RsvpActionTypes.ShowSubmitSuccessSnack };
    } else {
      yield { type: RsvpActionTypes.ShowDeclinedSnack };
    }

    yield { type: RsvpActionTypes.ClearGuests };
  } catch (payload) {
    if (payload instanceof Error) {
      yield { type: RsvpActionTypes.Error, payload };
    } else if (typeof payload === 'string') {
      yield { type: RsvpActionTypes.Error, payload: new Error(payload) };
    } else {
      yield { type: RsvpActionTypes.Error, payload: new Error('An unexpected error occurred.') };
    }
  } finally {
    yield { type: RsvpActionTypes.Loading, payload: false };
  }
}
