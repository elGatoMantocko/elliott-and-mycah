import { Box, Theme, useMediaQuery } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

export const Hero = () => {
  const isLargeScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.up('sm'));
  return (
    <Container maxWidth={isLargeScreen ? 'md' : false}>
      <Typography variant="h1" align="center" color="textPrimary" gutterBottom>
        Mycah &amp; Elliott
      </Typography>
      <Box display="flex">
        <Box marginLeft="auto" marginRight="1rem">
          <Typography variant="h2" color="textSecondary">
            <em>6/12/21</em>
          </Typography>
        </Box>
        <Box mx="1rem">
          <Typography variant="h2" color="textPrimary">
            &ndash;
          </Typography>
        </Box>
        <Box marginLeft="1rem" marginRight="auto">
          <Typography variant="h2" color="textSecondary">
            <em>Seattle</em>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
