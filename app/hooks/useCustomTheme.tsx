import { adaptV4Theme, createTheme } from '@mui/material/styles';
import { useMemo } from 'react';

export const useCustomTheme = () =>
  useMemo(
    () =>
      createTheme(
        adaptV4Theme({
          spacing: (factor: number | string) =>
            typeof factor === 'number' ? `${0.5 * factor}rem` : factor,
          palette: {
            // TODO: play with dark mode but this site is designed for light mode
            primary: {
              light: 'rgba(175, 126, 203, 1)',
              main: 'rgba(139, 77, 174, 1)',
              dark: 'rgba(114, 78, 135, 1)',
              contrastText: '#fff',
            },
            secondary: {
              light: 'rgba(104, 177, 104, 1)',
              main: 'rgba(31, 134, 31, 1)',
              dark: 'rgba(45, 92, 45, 1)',
              contrastText: '#fff',
            },
            error: {
              light: '#e57373',
              main: '#f44336',
              dark: '#d32f2f',
              contrastText: '#fff',
            },
          },
        }),
      ),
    [],
  );
