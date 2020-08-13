import Box from '@material-ui/core/Box';
import Fab, { FabProps } from '@material-ui/core/Fab';
import ReplyIcon from '@material-ui/icons/Reply';
import * as React from 'react';

type RsvpButtonProps = Omit<FabProps, 'children'>;
export const RsvpButton = (props: RsvpButtonProps) => (
  <Box position="absolute" bottom="0" right="0" padding="2rem">
    <Fab variant="extended" color="primary" size="large" {...props}>
      <ReplyIcon />
      RSVP
    </Fab>
  </Box>
);
