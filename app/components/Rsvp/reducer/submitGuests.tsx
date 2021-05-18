import { Guests } from '../../../models/guest';
import { RsvpActions, RsvpActionTypes } from './actions';

export async function* submitGuests(guests: Guests, yesNo?: boolean): AsyncGenerator<RsvpActions> {
  yield { type: RsvpActionTypes.Loading, payload: true };
  try {
    const body = JSON.stringify(Array.from(guests.values()).map((g) => ({ ...g, yesNo })));

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
    if (yesNo) {
      yield { type: RsvpActionTypes.ShowSubmitSuccessSnack };
    } else {
      yield { type: RsvpActionTypes.ShowDeclinedSnack };
    }
  } catch (payload) {
    yield { type: RsvpActionTypes.Error, payload };
  }
  yield { type: RsvpActionTypes.Loading, payload: false };
  return;
}
