import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';

import { ResponsiveContainer } from './ResponsiveContainer';

export const Hero = () => (
  <ResponsiveContainer fallback="lg">
    <Typography variant="h1" component="h1" align="center" color="textPrimary" gutterBottom>
      Mycah <AddIcon fontSize="large" /> Elliott
    </Typography>
    <Typography variant="h2" component="h2" color="textSecondary">
      <Box display="flex" flexWrap="wrap">
        <Box mx="auto">
          <em>6/12/21</em>
        </Box>
        <Box mx="auto">
          <em>Seattle</em>
        </Box>
      </Box>
    </Typography>
  </ResponsiveContainer>
);
