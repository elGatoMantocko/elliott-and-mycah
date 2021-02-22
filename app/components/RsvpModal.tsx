import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RemoveIcon from '@material-ui/icons/Remove';
import * as React from 'react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Guest, isValidFoodChoice } from '../models/guest';
import { GuestActionTypes, useGuestsReducer } from '../reducers/guests';

const NameField = withStyles((theme) => ({
  root: {
    marginRight: theme.spacing(1),
    maxWidth: theme.spacing(20),
  },
}))(TextField);

const FoodChoiceControl = withStyles((theme) => ({
  root: {
    minWidth: theme.spacing(16),
    maxWidth: theme.spacing(20),
    marginRight: theme.spacing(1),
  },
}))(FormControl);

const ErrorIconButton = withStyles((theme) => ({
  root: {
    color: theme.palette.error.main,
  },
}))(IconButton);

type GuestFieldsProps = {
  guest: Guest;
  onUpdateGuest: (g: Partial<Guest>) => void;
  onRemoveGuest?: () => void;
};
const GuestFields = ({ guest, onUpdateGuest, onRemoveGuest }: GuestFieldsProps) => (
  <Box display="flex" mt={1}>
    <NameField
      label="First Name"
      variant="outlined"
      size="small"
      value={guest.firstName}
      onChange={(e) => onUpdateGuest({ firstName: e.target.value })}
    />
    <NameField
      label="Last Name"
      variant="outlined"
      size="small"
      value={guest.lastName}
      onChange={(e) => onUpdateGuest({ lastName: e.target.value })}
    />
    <FoodChoiceControl size="small">
      <Select
        displayEmpty
        variant="outlined"
        value={guest.foodChoice || ''}
        onChange={(e) =>
          isValidFoodChoice(e.target.value) && onUpdateGuest({ foodChoice: e.target.value })
        }
      >
        <MenuItem disabled value="">
          <em>Food choice</em>
        </MenuItem>
        <MenuItem value="chicken">Chicken</MenuItem>
        <MenuItem value="fish">Fish</MenuItem>
        <MenuItem value="veg">Vegetarian</MenuItem>
      </Select>
    </FoodChoiceControl>
    <ErrorIconButton size="small" disabled={onRemoveGuest == null} onClick={onRemoveGuest}>
      <RemoveIcon />
    </ErrorIconButton>
  </Box>
);

type RsvpModalProps = DialogProps & {
  loading?: boolean;
  onAddGuests: (guests: Guest[], yesNo?: boolean) => void;
};
export const RsvpModal = ({ loading, onAddGuests, ...dialogProps }: RsvpModalProps) => {
  const [yesNo, setYesNo] = useState(true);
  const [guests, dispatch] = useGuestsReducer(new Map([[uuid(), { firstName: '', lastName: '' }]]));
  return (
    <Dialog {...dialogProps}>
      <DialogContent>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={yesNo} onChange={(e) => setYesNo(e.target.checked)} />}
            label="Will you attend on 6/12/2021?"
          />
        </FormGroup>
        {Array.from(guests.entries()).map(([id, g], i) => (
          <>
            {i > 0 && <Typography variant="subtitle2">Guest {i}</Typography>}
            <GuestFields
              guest={g}
              onRemoveGuest={
                i === 0
                  ? undefined
                  : () => dispatch({ type: GuestActionTypes.Remove, payload: { id } })
              }
              onUpdateGuest={(partialGuest) =>
                dispatch({
                  type: GuestActionTypes.Update,
                  payload: { id, guest: partialGuest },
                })
              }
            />
          </>
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="outlined"
          startIcon={<AddIcon />}
          disabled={loading}
          onClick={() =>
            dispatch({
              type: GuestActionTypes.Add,
              payload: { id: uuid(), guest: { firstName: '', lastName: '' } },
            })
          }
        >
          Add guest
        </Button>
        <Button
          color="primary"
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} /> : <PlayArrowIcon />}
          disabled={loading}
          onClick={() => onAddGuests(Array.from(guests.values()), yesNo)}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
