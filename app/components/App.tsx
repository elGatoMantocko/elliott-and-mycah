import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import { Hero } from './Hero';
import { Menu } from './Menu';
import { Modal } from './Modal';
import { RsvpButton } from './RsvpButton';
import { RsvpForm } from './RsvpForm';
import { Snax } from './Snax';

const theme = createMuiTheme({
  spacing: (factor) => `${0.5 * factor}rem`,
  palette: {
    common: { black: '#000', white: '#fff' },
    background: { paper: '#fff', default: '#fafafa' },
    primary: {
      light: 'rgba(139, 77, 174, 0.1)',
      main: 'rgba(139, 77, 174, 0.66)',
      dark: 'rgba(139, 77, 174, 1)',
      contrastText: '#fff',
    },
    secondary: {
      light: 'rgba(21, 95, 21, 0.15)',
      main: 'rgba(21, 95, 21, 0.6)',
      dark: 'rgba(21, 95, 21, 1)',
      contrastText: '#fff',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
  },
});

export const App = () => {
  const [showSnack, setShowSnack] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Menu />
      <Router>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/wedding-party">
          <Typography variant="h1">Poop doop!</Typography>
        </Route>
        <Route path="/home">
          <Hero />
        </Route>
      </Router>
      <RsvpButton onClick={() => setShowModal(true)} />
      <Modal open={showModal} maxWidth="md" onClose={() => setShowModal(false)}>
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
  );
};
