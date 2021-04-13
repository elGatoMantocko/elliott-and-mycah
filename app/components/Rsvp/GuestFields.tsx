import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import { FormControlProps } from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { TextFieldProps } from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import RemoveIcon from '@material-ui/icons/Remove';
import * as React from 'react';

import { Guest, isValidFoodChoice } from '../../models/guest';

const NameField = withStyles((theme) => ({
  root: {
    width: ({ fullWidth }: TextFieldProps) => (fullWidth === true ? '100%' : theme.spacing(20)),
    marginRight: ({ fullWidth }: TextFieldProps) =>
      fullWidth === true ? undefined : theme.spacing(1),
    marginTop: ({ fullWidth }: TextFieldProps) =>
      fullWidth === true ? theme.spacing(1) : undefined,
  },
}))(TextField);

const FoodChoiceControl = withStyles((theme) => ({
  root: {
    width: ({ fullWidth }: FormControlProps) => (fullWidth === true ? '100%' : theme.spacing(16)),
    marginRight: ({ fullWidth }: FormControlProps) =>
      fullWidth === true ? undefined : theme.spacing(1),
    marginTop: ({ fullWidth }: FormControlProps) =>
      fullWidth === true ? theme.spacing(1) : undefined,
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
export const GuestFields = ({ guest, onUpdateGuest, onRemoveGuest }: GuestFieldsProps) => {
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  return (
    <Box display="flex" mb={1} flexDirection={isSmallScreen === true ? 'column' : 'row'}>
      <NameField
        fullWidth={isSmallScreen}
        label="First Name"
        variant="outlined"
        size="small"
        value={guest.firstName}
        onChange={(e) => onUpdateGuest({ firstName: e.target.value })}
        required
      />
      <NameField
        fullWidth={isSmallScreen}
        label="Last Name"
        variant="outlined"
        size="small"
        value={guest.lastName}
        onChange={(e) => onUpdateGuest({ lastName: e.target.value })}
        required
      />
      <FoodChoiceControl size="small" fullWidth={isSmallScreen} required>
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
          <MenuItem value="fish">Crab Stuffed Salmon</MenuItem>
          <MenuItem value="chicken">
            Pancetta Chicken &ndash; <em>GF</em>
          </MenuItem>
          <MenuItem value="veg">
            Spinach Tortellini &ndash; <em>V</em>
          </MenuItem>
        </Select>
      </FoodChoiceControl>
      <Box display="flex" my="auto">
        <ErrorIconButton size="small" disabled={onRemoveGuest == null} onClick={onRemoveGuest}>
          <RemoveIcon />
        </ErrorIconButton>
      </Box>
    </Box>
  );
};
