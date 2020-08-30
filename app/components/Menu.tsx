import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import { ResponsiveContainer } from './ResponsiveContainer';

export const Menu = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <ResponsiveContainer>
        <Toolbar>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography>
              <Link href="/about">Home</Link>
            </Typography>
            <Typography>
              <Link href="/wedding-party">Wedding Party</Link>
            </Typography>
            <Typography>
              <Link href="/venue">Venue</Link>
            </Typography>
            <Typography>
              <Link href="/itinerary">Itinerary</Link>
            </Typography>
            <Typography>
              <Link href="/hotels">Hotels</Link>
            </Typography>
          </Box>
        </Toolbar>
      </ResponsiveContainer>
    </AppBar>
  );
};
