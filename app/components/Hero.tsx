import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

export const Hero = () => (
  <>
    <Container maxWidth="sm">
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Mycah &amp; Elliott
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        6/12/21
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Seattle, WA
      </Typography>
    </Container>
  </>
);
