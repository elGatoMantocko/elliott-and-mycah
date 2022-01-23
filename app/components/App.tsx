import { Box, CssBaseline, Hidden, Paper, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LoadScript } from '@react-google-maps/api';
import React from 'react';
import GithubCorner from 'react-github-corner';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Effects } from 'react-use-elmish';

import { useCustomTheme } from '../hooks/useCustomTheme';
import { uuid } from '../models/uuid';
import { About } from './About';
import { Accommodations } from './Accommodations';
import { ElmishProvider } from './ElmishProvider';
import { Menu } from './Menu';
import { Pictures } from './Pictures';
import { Registry } from './Registry';
import { Rsvp } from './Rsvp';
import { rsvpReducer } from './Rsvp/reducer';
import { RsvpActions } from './Rsvp/reducer/actions';
import { State } from './Rsvp/reducer/state';
import { ScrollToTop } from './ScrollToTop';
import { ServiceWorkerRegistration } from './ServiceWorkerRegistration';
import { Wedding } from './Wedding';

export const App = () => (
  <ParallaxProvider>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={useCustomTheme()}>
        <CssBaseline />
        <LoadScript googleMapsApiKey="AIzaSyApT_xNp9ePgFYEfdlpw_JJXZG70U1MzXM">
          <Paper sx={{ width: '100%' }} elevation={0} square>
            <ElmishProvider<State, RsvpActions>
              reducer={rsvpReducer}
              initializer={() => [
                {
                  guests: [{ id: uuid(), firstName: '', lastName: '' }],
                  isAttending: true,
                },
                Effects.none(),
              ]}
            >
              <Router>
                <ScrollToTop />
                <Menu />
                <Routes>
                  <Route path="/" element={<Navigate to="/us" />} />
                  <Route path="/us" element={<About />} />
                  <Route path="/wedding" element={<Wedding />} />
                  <Route path="/registry" element={<Registry />} />
                  <Route path="/accommodations" element={<Accommodations />} />
                  <Route path="/pictures" element={<Pictures />} />
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
            </ElmishProvider>
          </Paper>
        </LoadScript>
      </ThemeProvider>
    </StyledEngineProvider>
  </ParallaxProvider>
);
