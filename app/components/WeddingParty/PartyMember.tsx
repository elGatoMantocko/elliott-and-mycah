import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

type PartyMemberProps = { name: string; description: string; imgSrc: string; imgAlt?: string };
export const PartyMember = ({ name, description, imgSrc, imgAlt }: PartyMemberProps) => (
  <Box m={3}>
    <img src={imgSrc} alt={imgAlt} style={{ maxWidth: '100%' }} />
    <Typography variant="h6" component="h1">
      {name}
    </Typography>
    <Typography variant="body2">{description}</Typography>
  </Box>
);
