import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import makeStyles from '@mui/styles/makeStyles';
import * as React from 'react';

import { uuid } from '../../models/uuid';
import { GuestFields } from './GuestFields';
import { useRsvp } from './Provider';
import { RsvpActionTypes } from './reducer/actions';

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
  const [state, dispatch] = useRsvp();

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
