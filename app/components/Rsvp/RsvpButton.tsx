import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import * as React from 'react';

import { useRsvpDispatch } from './Provider';
import { RsvpActionTypes } from './reducer/actions';

export const RsvpButton = () => {
  const dispatch = useRsvpDispatch();

  return (
    <Fab
      variant="extended"
      color="primary"
      size="large"
      onClick={() => dispatch({ type: RsvpActionTypes.ShowRsvpModal })}
    >
      <AddIcon /> RSVP
    </Fab>
  );
};
