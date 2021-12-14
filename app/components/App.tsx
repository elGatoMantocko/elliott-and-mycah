import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { LoadScript } from '@react-google-maps/api';
import * as React from 'react';
import GithubCorner from 'react-github-corner';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import { useCustomTheme } from '../hooks/useCustomTheme';
import { About } from './About';
import { Accommodations } from './Accommodations';
import { Menu } from './Menu';
import { Registry } from './Registry';
import { Rsvp } from './Rsvp';
import { RsvpProvider } from './Rsvp/Provider';
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
          <RsvpProvider>
            <Router>
              <Menu />
              <Routes>
                <Route path="/" element={<Navigate to="/us" />} />
                <Route path="/us" element={<About />} />
                <Route path="/wedding" element={<Wedding />} />
                <Route path="/registry" element={<Registry />} />
                <Route path="/accommodations" element={<Accommodations />} />
              </Routes>
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
          </RsvpProvider>
        </Paper>
      </LoadScript>
    </ThemeProvider>
  </ParallaxProvider>
);
