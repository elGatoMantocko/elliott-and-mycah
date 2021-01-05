import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import ReplyIcon from '@material-ui/icons/Reply';
import * as React from 'react';

const useFabStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    margin: theme.spacing(4),
    bottom: 0,
  },
}));

type RsvpButtonProps = Readonly<{ formUrl: string }>;
export const RsvpButton = ({ formUrl }: RsvpButtonProps) => (
  <Fab
    classes={useFabStyles()}
    variant="extended"
    color="primary"
    size="large"
    href={formUrl}
    target="blank"
  >
    <ReplyIcon />
    RSVP
  </Fab>
);
