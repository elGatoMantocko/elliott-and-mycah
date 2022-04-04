import { ThumbUp as ThumbUpIcon } from '@mui/icons-material';
import { Box, Snackbar, SnackbarContent, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import React from 'react';

import { useElmishContext } from '../ElmishProvider';
import { RsvpActions, RsvpActionTypes } from './reducer/actions';
import { State } from './reducer/state';
import { RsvpButton } from './RsvpButton';
import { RsvpModal } from './RsvpModal';

export const Rsvp = () => {
  const [state, dispatch] = useElmishContext<State, RsvpActions>();

  return (
    <>
      <RsvpButton disabled />
      <RsvpModal />
      <Snackbar
        open={!!state.showSuccessSnack}
        autoHideDuration={8000}
        onClose={() => dispatch({ type: RsvpActionTypes.HideSnack })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <SnackbarContent
          sx={{
            color: '#fff',
            backgroundColor: green[700],
          }}
          message={
            <Box display="flex">
              <Box my="auto" mr={2}>
                <ThumbUpIcon />
              </Box>
              <Box my="auto">
                <Typography>You&apos;re on the guest list</Typography>
              </Box>
            </Box>
          }
        />
      </Snackbar>
      <Snackbar
        open={!!state.showDeclinedSnack}
        autoHideDuration={8000}
        onClose={() => dispatch({ type: RsvpActionTypes.HideSnack })}
      >
        <SnackbarContent
          sx={{
            color: '#fff',
            backgroundColor: green[700],
          }}
          message={
            <Box display="flex">
              <Box my="auto" mr={2}>
                <ThumbUpIcon />
              </Box>
              <Box my="auto">
                <Typography>Thank you for submitting your response!</Typography>
              </Box>
            </Box>
          }
        />
      </Snackbar>
    </>
  );
};
