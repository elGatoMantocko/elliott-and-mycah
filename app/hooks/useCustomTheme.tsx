import { createMuiTheme, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useMemo } from 'react';

export const useCustomTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme: Theme = useMemo(
    () =>
      createMuiTheme({
        spacing: (factor) => `${0.5 * factor}rem`,
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          common: { black: '#000', white: '#fff' },
          background: { paper: '#fff', default: '#fafafa' },
          primary: {
            light: 'rgba(139, 77, 174, 0.1)',
            main: 'rgba(139, 77, 174, 0.66)',
            dark: 'rgba(139, 77, 174, 1)',
            contrastText: '#fff',
          },
          secondary: {
            light: 'rgba(21, 95, 21, 0.15)',
            main: 'rgba(21, 95, 21, 0.6)',
            dark: 'rgba(21, 95, 21, 1)',
            contrastText: '#fff',
          },
          error: {
            light: '#e57373',
            main: '#f44336',
            dark: '#d32f2f',
            contrastText: '#fff',
          },
          text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.38)',
            hint: 'rgba(0, 0, 0, 0.38)',
          },
        },
      }),
    [prefersDarkMode],
  );

  return theme;
};
