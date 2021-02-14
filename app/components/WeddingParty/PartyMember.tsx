import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

type PartyMemberProps = {
  name: string;
  description?: string;
  location?: string;
  imgSrc: string;
  imgAlt?: string;
};
export const PartyMember = ({ name, description, location, imgSrc, imgAlt }: PartyMemberProps) => (
  <Box m={3}>
    <img src={imgSrc} alt={imgAlt} style={{ maxWidth: '100%' }} />
    <Typography variant="h6" component="h1" align="center">
      {name}
    </Typography>
    {location != null && (
      <Typography variant="caption" align="center" component="p" gutterBottom>
        <em>{location}</em>
      </Typography>
    )}
    {description != null && (
      <Typography variant="body2" align="center">
        {description}
      </Typography>
    )}
  </Box>
);
