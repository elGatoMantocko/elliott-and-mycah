import { Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Link from '@material-ui/core/Link';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

const theme = createMuiTheme({
  spacing: (factor) => `${0.5 * factor}rem`,
});
const useStyles = makeStyles({ button: { backgroundColor: 'purple' } });
export const App = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
              <Box width="100%" justifyContent="space-evenly" display="flex">
                {['Wedding Party', 'Venue', 'Itinerary', 'Hotels'].map((linkName, i) => (
                  <Box key={i} mx="1rem">
                    <Typography>
                      <Link href="#" onClick={(e: { preventDefault: () => void }) => e.preventDefault()}>
                        {linkName}
                      </Link>
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Toolbar>
          </AppBar>
          <Container maxWidth="md">
            <Typography variant="h1">Mycah &amp; Elliott</Typography>
            <Divider />
            <Typography variant="body1">We are going to have a wedding!</Typography>
            <Fab variant="extended" color="primary" className={classes.button}>
              RSVP
            </Fab>
          </Container>
        </Route>
      </Router>
    </ThemeProvider>
  );
};
