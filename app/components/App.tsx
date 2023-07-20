import { CssBaseline, LinearProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LoadScript as LoadGoogleMaps } from '@react-google-maps/api';
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
    <ThemeProvider theme={useCustomTheme()}>
      <CssBaseline />
      <LoadGoogleMaps googleMapsApiKey="AIzaSyApT_xNp9ePgFYEfdlpw_JJXZG70U1MzXM">
        <RouterProvider
          router={createBrowserRouter(
            createRoutesFromElements(
              <Route element={<ScrollToTopOutlet />}>
                <Route element={<MenuOutlet />}>
                  <Route index element={<Navigate replace to="/us" />} />
                  <Route
                    path="us"
                    lazy={() => import(/* webpackChunkName: "about" */ '../routes/About')}
                  />
                  <Route
                    path="wedding"
                    lazy={() => import(/* webpackChunkName: "wedding" */ '../routes/Wedding')}
                  />
                  <Route
                    path="pictures"
                    lazy={() => import(/* webpackChunkName: "pictures" */ '../routes/Pictures')}
                  />
                </Route>
              </Route>,
            ),
          )}
          fallbackElement={<LinearProgress />}
        />
      </LoadGoogleMaps>
      <GithubCorner href="https://github.com/elGatoMantocko/elliott-and-mycah" target="_blank" />
      <ServiceWorker />
    </ThemeProvider>
  </ParallaxProvider>
);
