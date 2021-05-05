import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';

type RsvpButtonProps = { onClick: (e: React.MouseEvent<HTMLButtonElement>) => void };
export const RsvpButton = (props: RsvpButtonProps) => {
  return (
    <Fab variant="extended" color="primary" size="large" onClick={props.onClick}>
      <AddIcon /> RSVP
    </Fab>
  );
};
