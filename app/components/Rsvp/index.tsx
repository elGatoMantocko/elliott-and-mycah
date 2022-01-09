import { ThumbUp as ThumbUpIcon } from '@mui/icons-material';
import { Box, Snackbar, SnackbarContent, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { withStyles } from '@mui/styles';
import React from 'react';

import { useRsvp } from './Provider';
import { RsvpActionTypes } from './reducer/actions';
import { RsvpButton } from './RsvpButton';
import { RsvpModal } from './RsvpModal';

const SuccessSnackbarContent = withStyles({
  root: {
    color: '#fff',
    backgroundColor: green[700],
  },
})(SnackbarContent);

const DeclinedSnackbarContent = withStyles({
  root: {
    color: '#fff',
    backgroundColor: green[700],
  },
})(SnackbarContent);

export const Rsvp = () => {
  const [state, dispatch] = useRsvp();

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
        <SuccessSnackbarContent
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
        <DeclinedSnackbarContent
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
