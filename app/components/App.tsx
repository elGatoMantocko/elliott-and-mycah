import { ThemeProvider } from '@material-ui/core/styles';
import { LoadScript } from '@react-google-maps/api';
import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import { useCustomTheme } from '../hooks/useCustomTheme';
import { About } from './About';
import { Menu } from './Menu';
import { RsvpButton } from './RsvpButton';
import { Venue } from './Venue';
import { WeddingParty } from './WeddingParty';

// TODO: replace the maps api key with a more secure one
export const App = () => (
  <ParallaxProvider>
    <ThemeProvider theme={useCustomTheme()}>
      <LoadScript googleMapsApiKey="AIzaSyBRjxbeQZplJV_WT0z6-JxBATmkwymjLqQ">
        <Router>
          <Menu />
          <Route exact path="/">
            <About />
          </Route>
          <Route path="/wedding-party">
            <WeddingParty />
          </Route>
          <Route path="/venue">
            <Venue />
          </Route>
        </Router>
        <RsvpButton formUrl="https://forms.gle/JFwN8N6Peuv4GKgc6" />
      </LoadScript>
    </ThemeProvider>
  </ParallaxProvider>
);
