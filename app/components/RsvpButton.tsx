import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import * as React from 'react';

type RsvpButtonProps = Readonly<{ formUrl: string }>;
export const RsvpButton = ({ formUrl }: RsvpButtonProps) => (
  <Fab variant="extended" color="primary" size="large" href={formUrl} target="blank">
    RSVP
    <Box ml={1} position="relative" top={-1}>
      <FontAwesomeIcon size="sm" icon={faExternalLinkAlt} />
    </Box>
  </Fab>
);
