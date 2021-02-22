import { Guest } from '../models/guest';
import { useCallableResult } from './useResult';

export const useAddGuests = () =>
  useCallableResult((guests: Guest[], yesNo?: boolean) => {
    // TODO: this is a hack to test loading state
    return new Promise((resolve) => {
      setTimeout(() => resolve(JSON.stringify(guests.map((g) => ({ ...g, yesNo })))), 4000);
    });
    // fetch('https://sheet.best/api/sheets/4976d0ec-48c2-40ef-b4d3-740560714fb1', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(guests),
    // }),
  });
