import { Add as AddIcon } from '@mui/icons-material';
import { Fab, FabProps } from '@mui/material';
import * as React from 'react';

import { useRsvpDispatch } from './Provider';
import { RsvpActionTypes } from './reducer/actions';

export const RsvpButton = (props: FabProps) => {
  const dispatch = useRsvpDispatch();

  return (
    <Fab
      {...props}
      variant="extended"
      color="primary"
      size="large"
      onClick={() => dispatch({ type: RsvpActionTypes.ShowRsvpModal })}
    >
      <AddIcon /> RSVP
    </Fab>
  );
};
