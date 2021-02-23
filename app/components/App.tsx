import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { LoadScript } from '@react-google-maps/api';
import * as React from 'react';
import GithubCorner from 'react-github-corner';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import { useCustomTheme } from '../hooks/useCustomTheme';
import { Menu } from './Menu';
import { routes } from './Menu/routes';
import { Rsvp } from './Rsvp';
import { ServiceWorkerRegistration } from './ServiceWorkerRegistration';

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
            {routes.map(({ href, content, underConstruction }) => (
              <Route key={href} exact path={href}>
                {underConstruction ? 'Under construction!' : content}
              </Route>
            ))}
          </Router>
          <GithubCorner
            href="https://github.com/elGatoMantocko/elliott-and-mycah"
            target="_blank"
          />
          <Rsvp />
          <ServiceWorkerRegistration src="/service-worker.js" />
        </Paper>
      </LoadScript>
    </ThemeProvider>
  </ParallaxProvider>
);
