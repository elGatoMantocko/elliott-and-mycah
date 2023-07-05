import { CssBaseline, LinearProgress, Paper, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LoadScript } from '@react-google-maps/api';
import React from 'react';
import GithubCorner from 'react-github-corner';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import { useCustomTheme } from '../hooks/theme';
import { About } from './About';
import { MenuOutlet } from './Menu';
import { Pictures } from './Pictures';
import { ScrollToTopOutlet } from './ScrollToTopOutlet';
import { ServiceWorkerUnregistration } from './ServiceWorker';
import { Wedding } from './Wedding';

export const App = () => (
  <ParallaxProvider>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={useCustomTheme()}>
        <CssBaseline />
        <LoadScript googleMapsApiKey="AIzaSyApT_xNp9ePgFYEfdlpw_JJXZG70U1MzXM">
          <Paper sx={{ width: '100%' }} elevation={0} square>
            <RouterProvider
              router={createBrowserRouter(
                createRoutesFromElements(
                  <Route element={<ScrollToTopOutlet />}>
                    <Route element={<MenuOutlet />}>
                      <Route index element={<Navigate to="/us" />} />
                      <Route path="us" element={<About />} />
                      <Route path="wedding" element={<Wedding />} />
                      <Route path="pictures" element={<Pictures />} />
                    </Route>
                  </Route>,
                ),
              )}
              fallbackElement={<LinearProgress />}
            />
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
