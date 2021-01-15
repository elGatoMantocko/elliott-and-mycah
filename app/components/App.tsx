import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import { LoadScript } from '@react-google-maps/api';
import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import { useCustomTheme } from '../hooks/useCustomTheme';
import { Menu } from './Menu';
import { routes } from './Menu/routes';
import { RsvpButton } from './RsvpButton';

// TODO: replace the maps api key with a more secure one
export const App = () => (
  <ParallaxProvider>
    <ThemeProvider theme={useCustomTheme()}>
      <LoadScript googleMapsApiKey="AIzaSyApT_xNp9ePgFYEfdlpw_JJXZG70U1MzXM">
        <Paper elevation={0} square>
          <Router>
            <Menu />
            <Box position="fixed" bottom="0" left="0" m={4} zIndex={1000}>
              <RsvpButton formUrl="https://forms.gle/ZExa265AVjhf1t9p8" />
            </Box>
            {routes.map(({ href, content, underConstruction }, i) => (
              <Route key={i} exact path={href}>
                {underConstruction ? 'Under construction!' : content}
              </Route>
            ))}
          </Router>
        </Paper>
      </LoadScript>
    </ThemeProvider>
  </ParallaxProvider>
);
