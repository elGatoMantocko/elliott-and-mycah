import { FormLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
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

export const RsvpModal = () => {
  const [state, dispatch] = useRsvp();

  return (
    <Dialog
      maxWidth="md"
      open={!!state.showRsvpModal}
      onClose={() => dispatch({ type: RsvpActionTypes.HideRsvpModal })}
      fullScreen={useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))}
    >
      <DialogTitle disableTypography>
        <Typography variant="h4" gutterBottom>
          <em>RSVP</em>
        </Typography>
        <FormGroup>
          <FormControl component="fieldset">
            <FormLabel>Will you attend on 6/12/2021?</FormLabel>
            <RadioGroup
              name="yesNo"
              classes={useRadioGroupStyles()}
              value={state.isAttending}
              onChange={(e) =>
                dispatch({ type: RsvpActionTypes.SetYesNo, payload: e.target.value === 'true' })
              }
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </FormGroup>
        {state.error != null && (
          <Alert severity="error" onClose={() => dispatch({ type: RsvpActionTypes.Error })}>
            <AlertTitle>Oops! We encountered an error!</AlertTitle>
            <Typography>{state.error.message}</Typography>
          </Alert>
        )}
        <IconButton
          classes={useCloseButtonStyles()}
          onClick={() => dispatch({ type: RsvpActionTypes.HideRsvpModal })}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {state.guests.map((g, i) => (
          <span key={g.id}>
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
          </span>
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
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
          color="primary"
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
