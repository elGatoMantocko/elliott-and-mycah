import { Remove as RemoveIcon } from '@mui/icons-material';
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

import { Guest, isValidFoodChoice } from '../../models/guest';

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
  const theme = useTheme();

  return (
    <Box display="flex" mb={1} flexDirection={isSmallScreen === true ? 'column' : 'row'} pt={1}>
      <TextField
        sx={{
          width: isSmallScreen ? '100%' : theme.spacing(24),
          marginRight: isSmallScreen ? undefined : theme.spacing(1),
          marginTop: isSmallScreen ? theme.spacing(1) : undefined,
        }}
        fullWidth={isSmallScreen}
        label="First Name"
        variant="outlined"
        size="small"
        value={guest.firstName}
        onChange={(e) => onUpdateGuest({ firstName: e.target.value })}
        required
      />
      <TextField
        fullWidth={isSmallScreen}
        label="Last Name"
        variant="outlined"
        size="small"
        value={guest.lastName}
        onChange={(e) => onUpdateGuest({ lastName: e.target.value })}
        required
      />
      <FormControl
        sx={{
          width: isSmallScreen ? '100%' : theme.spacing(20),
          marginRight: isSmallScreen ? undefined : theme.spacing(1),
          marginTop: isSmallScreen ? theme.spacing(1) : undefined,
        }}
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
      </FormControl>
      <Box display="flex" my="auto">
        <IconButton
          sx={{
            color: theme.palette.error.main,
          }}
          size="small"
          disabled={onRemoveGuest == null}
          onClick={onRemoveGuest}
        >
          <RemoveIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
