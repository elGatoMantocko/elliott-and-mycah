import { FormLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
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

import { Guest, Guests } from '../../models/guest';
import { UUIDv4 } from '../../models/uuid';
import { GuestFields } from './GuestFields';

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

type RsvpModalProps = {
  guests: Guests;
  isAttending: boolean;
  loading?: boolean;
  error?: Error;
  onClose?: () => void;
  onAddGuest: () => void;
  onRemoveGuest: (id: UUIDv4) => void;
  onUpdateGuest: (guest: { id: UUIDv4 } & Partial<Guest>) => void;
  onUpdateYesNo: (yesNo: boolean) => void;
  onSubmitGuests: () => void;
  onDismissError: () => void;
} & Omit<DialogProps, 'onClose'>;
export const RsvpModal = ({
  guests,
  isAttending,
  loading,
  error,
  onClose,
  onAddGuest,
  onRemoveGuest,
  onUpdateGuest,
  onUpdateYesNo,
  onSubmitGuests,
  onDismissError,
  ...dialogProps
}: RsvpModalProps) => (
  <Dialog
    {...dialogProps}
    onClose={onClose}
    fullScreen={
      useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm')) ||
      dialogProps.fullScreen === true
    }
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
            value={isAttending}
            onChange={(e) => onUpdateYesNo(e.target.value === 'true')}
          >
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </FormGroup>
      {error != null && (
        <Alert severity="error" onClose={onDismissError}>
          <AlertTitle>Oops! We encountered an error!</AlertTitle>
          <Typography>{error.message}</Typography>
        </Alert>
      )}
      <IconButton classes={useCloseButtonStyles()} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      {guests.map((g, i) => (
        <span key={g.id}>
          {i > 0 && <Typography variant="subtitle2">Guest {i}</Typography>}
          <GuestFields
            guest={g}
            foodChoiceDisabled={!isAttending}
            onRemoveGuest={i === 0 ? undefined : () => onRemoveGuest(g.id)}
            onUpdateGuest={(partialGuest) => onUpdateGuest({ ...g, ...partialGuest })}
          />
        </span>
      ))}
    </DialogContent>
    <DialogActions>
      <Button
        color="primary"
        variant="outlined"
        startIcon={<AddIcon />}
        disabled={loading}
        onClick={onAddGuest}
      >
        Add guest
      </Button>
      <Button
        color="primary"
        variant="contained"
        startIcon={loading ? <CircularProgress size={20} /> : <PlayArrowIcon />}
        disabled={loading}
        onClick={onSubmitGuests}
      >
        Submit
      </Button>
    </DialogActions>
  </Dialog>
);
