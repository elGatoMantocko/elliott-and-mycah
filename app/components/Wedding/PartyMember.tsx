import { Box, Typography } from '@mui/material';
import React from 'react';

type PartyMemberProps = {
  name: string;
  description?: string;
  location?: string;
  imgSrc: string;
};
export const PartyMember = ({ name, description, location, imgSrc }: PartyMemberProps) => (
  <Box m={3}>
    <Box
      sx={(theme) => ({
        display: 'flex',
        borderRadius: '50%',
        boxShadow: theme.shadows[5],
      })}
    >
      <img src={imgSrc} alt={name} style={{ maxWidth: '100%' }} />
    </Box>
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
