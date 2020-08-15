import Fab, { FabProps } from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import ReplyIcon from '@material-ui/icons/Reply';
import * as React from 'react';

const useFabStyles = makeStyles((theme) => ({
  root: {
    position: 'sticky',
    margin: theme.spacing(4),
    bottom: theme.spacing(4),
  },
}));

type RsvpButtonProps = Omit<FabProps, 'children'>;
export const RsvpButton = (props: RsvpButtonProps) => (
  <Fab classes={useFabStyles()} variant="extended" color="primary" size="large" {...props}>
    <ReplyIcon />
    RSVP
  </Fab>
);
