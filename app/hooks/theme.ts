import { createTheme, PaletteOptions, useMediaQuery } from '@mui/material';
import { useCallback, useMemo } from 'react';

export const useCustomTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const mode = useMemo(() => (prefersDarkMode ? 'dark' : 'light'), [prefersDarkMode]);

  const spacing = useCallback(
    (factor: number | string): number | string =>
      typeof factor === 'number' ? `${0.5 * factor}rem` : factor,
    [],
  );

  const palette = useMemo(
    (): PaletteOptions | undefined => ({
      mode,
      // TODO: play with dark mode but this site is designed for light mode
      primary: {
        dark: 'rgba(175, 126, 203, 1)',
        main: 'rgba(139, 77, 174, 1)',
        light: 'rgba(114, 78, 135, 1)',
        contrastText: '#fff',
      },
      secondary: {
        dark: 'rgba(104, 177, 104, 1)',
        main: 'rgba(31, 134, 31, 1)',
        light: 'rgba(45, 92, 45, 1)',
        contrastText: '#fff',
      },
      error: {
        dark: '#e57373',
        main: '#f44336',
        light: '#d32f2f',
        contrastText: '#000',
      },
      action: {
        // default disabled has a lot of opacity and that's stupid
        disabled: 'rgba(159, 159, 159, 1)',
        disabledBackground: 'rgba(226, 226, 226, 1)',
      },
    }),
    [mode],
  );

  return createTheme({ spacing, palette });
};
