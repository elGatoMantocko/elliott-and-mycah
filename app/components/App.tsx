import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Hidden from '@mui/material/Hidden';
import Paper from '@mui/material/Paper';
import { StyledEngineProvider, Theme, ThemeProvider } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
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
import { ScrollToTop } from './ScrollToTop';
import { ServiceWorkerRegistration } from './ServiceWorkerRegistration';
import { Wedding } from './Wedding';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const usePaperStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export const App = () => (
  <ParallaxProvider>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={useCustomTheme()}>
        <CssBaseline />
        <LoadScript googleMapsApiKey="AIzaSyApT_xNp9ePgFYEfdlpw_JJXZG70U1MzXM">
          <Paper classes={usePaperStyles()} elevation={0} square>
            <RsvpProvider>
              <Router>
                <ScrollToTop />
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
    </StyledEngineProvider>
  </ParallaxProvider>
);
