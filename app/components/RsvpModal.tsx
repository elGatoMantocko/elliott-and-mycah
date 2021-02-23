import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RemoveIcon from '@material-ui/icons/Remove';
import * as React from 'react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Guest, isValidFoodChoice } from '../models/guest';
import { GuestActionTypes, useGuestsReducer } from '../reducers/guests';

interface IsMobile {
  isSmallScreen?: boolean;
}

const NameField = withStyles((theme) => ({
  root: {
    width: ({ isSmallScreen }: IsMobile) => (isSmallScreen === true ? '100%' : theme.spacing(20)),
    marginRight: ({ isSmallScreen }: IsMobile) =>
      isSmallScreen === true ? undefined : theme.spacing(1),
    marginTop: ({ isSmallScreen }: IsMobile) =>
      isSmallScreen === true ? theme.spacing(1) : undefined,
  },
}))(TextField);

const FoodChoiceControl = withStyles((theme) => ({
  root: {
    width: ({ isSmallScreen }: IsMobile) => (isSmallScreen === true ? '100%' : theme.spacing(16)),
    marginRight: ({ isSmallScreen }: IsMobile) =>
      isSmallScreen === true ? undefined : theme.spacing(1),
    marginTop: ({ isSmallScreen }: IsMobile) =>
      isSmallScreen === true ? theme.spacing(1) : undefined,
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
const GuestFields = ({ guest, onUpdateGuest, onRemoveGuest }: GuestFieldsProps) => {
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  return (
    <Box display="flex" mb={1} flexDirection={isSmallScreen === true ? 'column' : 'row'}>
      <NameField
        isSmallScreen={isSmallScreen}
        label="First Name"
        variant="outlined"
        size="small"
        value={guest.firstName}
        onChange={(e) => onUpdateGuest({ firstName: e.target.value })}
      />
      <NameField
        isSmallScreen={isSmallScreen}
        label="Last Name"
        variant="outlined"
        size="small"
        value={guest.lastName}
        onChange={(e) => onUpdateGuest({ lastName: e.target.value })}
      />
      <FoodChoiceControl size="small" isSmallScreen={isSmallScreen}>
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
};

type RsvpModalProps = DialogProps & {
  loading?: boolean;
  onAddGuests: (guests: Guest[], yesNo?: boolean) => void;
};
export const RsvpModal = ({ loading, onAddGuests, ...dialogProps }: RsvpModalProps) => {
  const [yesNo, setYesNo] = useState(true);
  const [guests, dispatch] = useGuestsReducer(new Map([[uuid(), { firstName: '', lastName: '' }]]));
  return (
    <Dialog {...dialogProps}>
      <DialogTitle>
        <Typography variant="h4" gutterBottom component="h1" align="center">
          <em>RSVP</em>
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={yesNo} onChange={(e) => setYesNo(e.target.checked)} />}
            label="Will you attend on 6/12/2021?"
          />
        </FormGroup>
      </DialogTitle>
      <DialogContent>
        {Array.from(guests.entries()).map(([id, g], i) => (
          <div key={id}>
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
          </div>
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
