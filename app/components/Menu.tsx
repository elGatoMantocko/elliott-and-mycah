import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

export const Menu = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="md">
        <Toolbar>
          <Box display="flex" justifyContent="space-between" width="100%">
            {['Wedding Party', 'Venue', 'Itinerary', 'Hotels'].map((linkName, i) => (
              <Typography key={i}>
                <Link href={`/${linkName.toLowerCase().split(' ').join('-')}`}>{linkName}</Link>
              </Typography>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
