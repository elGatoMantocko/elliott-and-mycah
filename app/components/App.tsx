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
import { MenuOutlet } from './Menu';
import { ScrollToTopOutlet } from './ScrollToTopOutlet';
import { ServiceWorker } from './ServiceWorker';

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
                      <Route
                        path="us"
                        lazy={async () => {
                          const { About } = await import(/* webpackChunkName: "about" */ './About');
                          return { element: <About /> };
                        }}
                      />
                      <Route
                        path="wedding"
                        lazy={async () => {
                          const { Wedding } = await import(
                            /* webpackChunkName: "wedding" */ './Wedding'
                          );
                          return { element: <Wedding /> };
                        }}
                      />
                      <Route
                        path="pictures"
                        lazy={async () => {
                          const { Pictures } = await import(
                            /* webpackChunkName: "pictures" */ './Pictures'
                          );
                          return { element: <Pictures /> };
                        }}
                      />
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
            <ServiceWorker />
          </Paper>
        </LoadScript>
      </ThemeProvider>
    </StyledEngineProvider>
  </ParallaxProvider>
);
