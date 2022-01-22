import { Add as AddIcon } from '@mui/icons-material';
import { Fab, FabProps } from '@mui/material';
import React from 'react';

import { useDispatch } from '../ElmishProvider';
import { RsvpActions, RsvpActionTypes } from './reducer/actions';

export const RsvpButton = (props: FabProps) => {
  const dispatch = useDispatch<RsvpActions>();

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
