import Box from '@material-ui/core/Box';
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
import { RsvpButton } from './RsvpButton';

const usePaperStyles = makeStyles({
  root: {
    width: '100%',
  },
});

// TODO: replace the maps api key with a more secure one
export const App = () => (
  <ParallaxProvider>
    <ThemeProvider theme={useCustomTheme()}>
      <LoadScript googleMapsApiKey="AIzaSyApT_xNp9ePgFYEfdlpw_JJXZG70U1MzXM">
        <Paper classes={usePaperStyles()} elevation={0} square>
          <Router>
            <Menu />
            <Box position="fixed" bottom="0" left="0" m={4} zIndex={1000}>
              <RsvpButton formUrl="https://forms.gle/ZExa265AVjhf1t9p8" />
            </Box>
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
        </Paper>
      </LoadScript>
    </ThemeProvider>
  </ParallaxProvider>
);
