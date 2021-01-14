import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
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
    RSVP
    <Box ml={1} position="relative" top={-1}>
      <FontAwesomeIcon size="sm" icon={faExternalLinkAlt} />
    </Box>
  </Fab>
);
