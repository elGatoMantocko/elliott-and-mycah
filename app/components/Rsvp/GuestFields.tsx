import { Remove as RemoveIcon } from '@mui/icons-material';
import {
  Box,
  FormControl,
  FormControlProps,
  IconButton,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import React from 'react';

import { Guest, isValidFoodChoice } from '../../models/guest';

const NameField = withStyles((theme) => ({
  root: {
    width: ({ fullWidth }: TextFieldProps) => (fullWidth === true ? '100%' : theme.spacing(24)),
    marginRight: ({ fullWidth }: TextFieldProps) =>
      fullWidth === true ? undefined : theme.spacing(1),
    marginTop: ({ fullWidth }: TextFieldProps) =>
      fullWidth === true ? theme.spacing(1) : undefined,
  },
}))(TextField);

const FoodChoiceControl = withStyles((theme) => ({
  root: {
    width: ({ fullWidth }: FormControlProps) => (fullWidth === true ? '100%' : theme.spacing(20)),
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
  foodChoiceDisabled: boolean;
  onUpdateGuest: (g: Partial<Guest>) => void;
  onRemoveGuest?: () => void;
};
export const GuestFields = ({
  guest,
  foodChoiceDisabled,
  onUpdateGuest,
  onRemoveGuest,
}: GuestFieldsProps) => {
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));

  return (
    <Box display="flex" mb={1} flexDirection={isSmallScreen === true ? 'column' : 'row'} pt={1}>
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
      <FoodChoiceControl
        disabled={foodChoiceDisabled}
        size="small"
        fullWidth={isSmallScreen}
        required
      >
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
