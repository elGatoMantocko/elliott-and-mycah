import { CssBaseline, Paper, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LoadScript } from '@react-google-maps/api';
import React from 'react';
import GithubCorner from 'react-github-corner';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import { useCustomTheme } from '../hooks/theme';
import { About } from './About';
import { Menu } from './Menu';
import { Pictures } from './Pictures';
import { ScrollToTop } from './ScrollToTop';
import { ServiceWorkerUnregistration } from './ServiceWorker';
import { Wedding } from './Wedding';

export const App = () => (
  <ParallaxProvider>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={useCustomTheme()}>
        <CssBaseline />
        <LoadScript googleMapsApiKey="AIzaSyApT_xNp9ePgFYEfdlpw_JJXZG70U1MzXM">
          <Paper sx={{ width: '100%' }} elevation={0} square>
            <Router>
              <ScrollToTop />
              <Menu />
              <Routes>
                <Route path="/" element={<Navigate to="/us" />} />
                <Route path="/us" element={<About />} />
                <Route path="/wedding" element={<Wedding />} />
                <Route path="/pictures" element={<Pictures />} />
              </Routes>
            </Router>
            <GithubCorner
              href="https://github.com/elGatoMantocko/elliott-and-mycah"
              target="_blank"
            />
            <ServiceWorkerUnregistration hideSnackbar />
          </Paper>
        </LoadScript>
      </ThemeProvider>
    </StyledEngineProvider>
  </ParallaxProvider>
);
