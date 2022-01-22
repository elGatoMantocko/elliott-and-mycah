import {
  Add as AddIcon,
  Close as CloseIcon,
  PlayArrow as PlayArrowIcon,
} from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

import { uuid } from '../../models/uuid';
import { useElmishContext } from '../ElmishProvider';
import { GuestFields } from './GuestFields';
import { RsvpActions, RsvpActionTypes } from './reducer/actions';
import { State } from './reducer/state';

const useCloseButtonStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const useRadioGroupStyles = makeStyles({
  root: {
    flexDirection: 'row',
  },
});

enum GuestAttendance {
  Yes = 'yes',
  No = 'no',
}

export const RsvpModal = () => {
  const [state, dispatch] = useElmishContext<State, RsvpActions>();

  return (
    <Dialog
      maxWidth="md"
      open={!!state.showRsvpModal}
      onClose={() => dispatch({ type: RsvpActionTypes.HideRsvpModal })}
      fullScreen={useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'))}
    >
      <DialogTitle>
        <em>RSVP</em>
      </DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <FormLabel>Will you attend on 6/12/2021?</FormLabel>
          <RadioGroup
            name="yesNo"
            classes={useRadioGroupStyles()}
            defaultValue={GuestAttendance.Yes}
            onChange={(e) =>
              dispatch({
                type: RsvpActionTypes.SetYesNo,
                payload: e.target.value === GuestAttendance.Yes,
              })
            }
          >
            <FormControlLabel value={GuestAttendance.Yes} control={<Radio />} label="Yes" />
            <FormControlLabel value={GuestAttendance.No} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        {state.error != null && (
          <Alert severity="error" onClose={() => dispatch({ type: RsvpActionTypes.Error })}>
            <AlertTitle>Oops! We encountered an error!</AlertTitle>
            <Typography>{state.error.message}</Typography>
          </Alert>
        )}
        <IconButton
          classes={useCloseButtonStyles()}
          onClick={() => dispatch({ type: RsvpActionTypes.HideRsvpModal })}
          size="large"
        >
          <CloseIcon />
        </IconButton>
      </DialogContent>
      <DialogContent>
        {state.guests.map((g, i) => (
          <React.Fragment key={g.id}>
            {i > 0 && <Typography variant="subtitle2">Guest {i}</Typography>}
            <GuestFields
              guest={g}
              foodChoiceDisabled={!state.isAttending}
              onRemoveGuest={
                i === 0
                  ? undefined
                  : () => dispatch({ type: RsvpActionTypes.RemoveGuest, payload: g.id })
              }
              onUpdateGuest={(partialGuest) =>
                dispatch({
                  type: RsvpActionTypes.UpdateGuest,
                  payload: { ...g, ...partialGuest },
                })
              }
            />
          </React.Fragment>
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          disabled={state.loading}
          onClick={() =>
            dispatch({
              type: RsvpActionTypes.AddGuest,
              payload: { id: uuid(), firstName: '', lastName: '' },
            })
          }
        >
          Add guest
        </Button>
        <Button
          variant="contained"
          startIcon={state.loading ? <CircularProgress size={20} /> : <PlayArrowIcon />}
          disabled={state.loading}
          onClick={() => dispatch({ type: RsvpActionTypes.SubmitGuests })}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
