import { ThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import { useCustomTheme } from '../hooks/useCustomTheme';
import { Home } from './Home';
import { Menu } from './Menu';
import { Modal } from './Modal';
import { RsvpButton } from './RsvpButton';
import { RsvpForm } from './RsvpForm';
import { Snax } from './Snax';
import { Venue } from './Venue';
import { WeddingParty } from './WeddingParty';

export const App = () => {
  const [showSnack, setShowSnack] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const theme = useCustomTheme();

  return (
    <ParallaxProvider>
      <ThemeProvider theme={theme}>
        <Menu />
        <Router>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/wedding-party">
            <WeddingParty />
          </Route>
          <Route path="/venue">
            <Venue />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Router>
        <RsvpButton onClick={() => setShowModal(true)} />
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <RsvpForm
            onCancel={() => setShowModal(false)}
            onSubmit={() => {
              setShowSnack(true);
              setShowModal(false);
            }}
          />
        </Modal>
        <Snax open={showSnack} onClose={() => setShowSnack(false)} message="Thanks for submitting your guest list!" />
      </ThemeProvider>
    </ParallaxProvider>
  );
};
