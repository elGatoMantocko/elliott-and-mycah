import { useCallableResult } from './useResult';

export const useAddGuest = () =>
  useCallableResult(
    (
      firstName: string,
      lastName: string,
      yesNo?: boolean,
      foodChoice?: 'chicken' | 'fish' | 'veg',
    ) =>
      fetch('https://sheet.best/api/sheets/4976d0ec-48c2-40ef-b4d3-740560714fb1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, foodChoice, yesNo }),
      }),
  );
