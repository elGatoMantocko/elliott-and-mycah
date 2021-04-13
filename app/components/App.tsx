import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { LoadScript } from '@react-google-maps/api';
import * as React from 'react';
import GithubCorner from 'react-github-corner';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import { useCustomTheme } from '../hooks/useCustomTheme';
import { About } from './About';
import { Menu } from './Menu';
import { Registry } from './Registry';
import { Rsvp } from './Rsvp';
import { ServiceWorkerRegistration } from './ServiceWorkerRegistration';
import { Wedding } from './Wedding';

const usePaperStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export const App = () => (
  <ParallaxProvider>
    <ThemeProvider theme={useCustomTheme()}>
      <LoadScript googleMapsApiKey="AIzaSyApT_xNp9ePgFYEfdlpw_JJXZG70U1MzXM">
        <Paper classes={usePaperStyles()} elevation={0} square>
          <Router>
            <Menu />
            <Route exact path="/">
              <Redirect to="/us" />
            </Route>
            <Route exact path="/us">
              <About />
            </Route>
            <Route exact path="/wedding">
              <Wedding />
            </Route>
            <Route exact path="/registry">
              <Registry />
            </Route>
            <Route exact path="/accomodations">
              <></>
            </Route>
          </Router>
          <GithubCorner
            href="https://github.com/elGatoMantocko/elliott-and-mycah"
            target="_blank"
          />
          <Hidden mdUp>
            <Box position="fixed" bottom="0" left="0" m={4} zIndex={1000}>
              <Rsvp />
            </Box>
          </Hidden>
          <ServiceWorkerRegistration src="/service-worker.js" hideSnackbar />
        </Paper>
      </LoadScript>
    </ThemeProvider>
  </ParallaxProvider>
);
