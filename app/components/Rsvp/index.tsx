import Box from '@material-ui/core/Box';
import green from '@material-ui/core/colors/green';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import * as React from 'react';

import { uuid } from '../../models/uuid';
import { useRsvpReducer } from './reducer';
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
  const [state, dispatch] = useRsvpReducer([{ id: uuid(), firstName: '', lastName: '' }]);
  return (
    <>
      <RsvpButton onClick={() => dispatch({ type: RsvpActionTypes.ShowRsvpModal })} />
      <RsvpModal
        maxWidth="md"
        open={!!state.showRsvpModal}
        guests={state.guests}
        isAttending={state.isAttending}
        loading={state.loading}
        error={state.error}
        onAddGuest={() =>
          dispatch({
            type: RsvpActionTypes.AddGuest,
            payload: { id: uuid(), firstName: '', lastName: '' },
          })
        }
        onRemoveGuest={(payload) => dispatch({ type: RsvpActionTypes.RemoveGuest, payload })}
        onUpdateGuest={(payload) => dispatch({ type: RsvpActionTypes.UpdateGuest, payload })}
        onUpdateYesNo={(payload) => dispatch({ type: RsvpActionTypes.SetYesNo, payload })}
        onSubmitGuests={() => dispatch({ type: RsvpActionTypes.SubmitGuests })}
        onDismissError={() => dispatch({ type: RsvpActionTypes.Error })}
        onClose={() => dispatch({ type: RsvpActionTypes.HideRsvpModal })}
      />
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
