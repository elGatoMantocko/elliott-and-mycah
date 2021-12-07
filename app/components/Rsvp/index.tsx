import Box from '@material-ui/core/Box';
import green from '@material-ui/core/colors/green';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import * as React from 'react';

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
      <RsvpButton />
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
