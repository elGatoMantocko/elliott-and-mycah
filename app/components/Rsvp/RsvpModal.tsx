import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import * as React from 'react';

import { Guest, Guests } from '../../models/guest';
import { GuestFields } from './GuestFields';

type RsvpModalProps = DialogProps & {
  guests: Guests;
  yesNo: boolean;
  loading?: boolean;
  error?: Error;
  onAddGuest: () => void;
  onRemoveGuest: (id: string) => void;
  onUpdateGuest: (id: string, guest: Partial<Guest>) => void;
  onUpdateYesNo: (yesNo: boolean) => void;
  onSubmitGuests: () => void;
  onDismissError: () => void;
};
export const RsvpModal = ({
  guests,
  yesNo,
  loading,
  error,
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
    fullWidth={useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))}
  >
    <DialogTitle disableTypography>
      <Typography variant="h4" gutterBottom align="center">
        <em>RSVP</em>
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={yesNo} onChange={(e) => onUpdateYesNo(e.target.checked)} />}
          label="Will you attend on 6/12/2021?"
        />
      </FormGroup>
      {error != null && (
        <Alert severity="error" onClose={onDismissError}>
          <AlertTitle>We encountered an error!</AlertTitle>
          <Typography>{error.message}</Typography>
        </Alert>
      )}
    </DialogTitle>
    <DialogContent>
      {Array.from(guests.entries()).map(([id, g], i) => (
        <span key={id}>
          {i > 0 && <Typography variant="subtitle2">Guest {i}</Typography>}
          <GuestFields
            guest={g}
            onRemoveGuest={i === 0 ? undefined : () => onRemoveGuest(id)}
            onUpdateGuest={(partialGuest) => onUpdateGuest(id, partialGuest)}
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
        onClick={() => onAddGuest()}
      >
        Add guest
      </Button>
      <Button
        color="primary"
        variant="contained"
        startIcon={loading ? <CircularProgress size={20} /> : <PlayArrowIcon />}
        disabled={loading}
        onClick={() => onSubmitGuests()}
      >
        Submit
      </Button>
    </DialogActions>
  </Dialog>
);
