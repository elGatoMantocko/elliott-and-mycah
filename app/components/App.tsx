import { Box, Container } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import { Banner } from './Banner';
import { Hero } from './Hero';
import { Menu } from './Menu';
import { Modal } from './Modal';
import { RsvpButton } from './RsvpButton';
import { RsvpForm } from './RsvpForm';
import { Snax } from './Snax';
import { WeddingParty } from './WeddingParty';

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
    <ParallaxProvider>
      <ThemeProvider theme={theme}>
        <Menu />
        <Router>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/wedding-party">
            <WeddingParty></WeddingParty>
          </Route>
          <Route path="/home">
            <Hero />
            <Banner imageSource="https://lh3.googleusercontent.com/HCGW66aQxET8RCmveRv9zgMwLL9LIWSZzzfSd_nRNFeSZzu39Inbz9NKjRgs0RjkF2tTd5JI-jJ3kw44JgEZa-6oDOupp4jhZboeNp18q8lVZ23pKiWz2fKXgbrzRKkE5Yz4IdQr3u5Lvj6lfNvE95R-UEj8epuZsICkreJCwUlrFNHQqFn0utQXof5zIllf4b5pMc_ObildESK5GwIZZy7W9q61pB_0ROwMuyTYus7Jeg-9wNzwEEQgZMDbUqMTLpcyCS39uuR16bXe8uzbl4OZO-fOOKiFL2wQn_Fd05cNTKBBisYG7VPZQPiP9Cx3_qIMQZu3NpQXZ8B4DejCM3nCpPyKfdJBnUv6wbdNknSI2qQfECA7mqglijgRQvGHEgOWx4w4Vcu4g0HFxgzn4DC-S5EgCVoOxw-oJ3RwUrJz9CTHJ1Xr_uvffURFiIOLPj-q_7_SCE9hkZ8bpikVYwyYXh8RGGkuo3P4DwC0U60SpPakPnSXrkH1f61JbbzHaQbwMrBnt715ofvYljTlTDcWeoMxNBUW_HVZBIh29T-ycj_FSPqsLKSteJjbMCJ13MlWc6w8dlnXhNgNqHfe5bXDikHZYJ9UkNzXIo6TaRJHADwT5Y3H2xiP-OQKnxlFg2N7kjzhEGXbDMgqI0OMdUV3_7ZUE5WuWU2Ri0u4rm5tFGyUwtmzEnHWODGwzQ=w955-h637-no?authuser=0" />
            <Container maxWidth="md">
              <Box paddingTop="2rem">
                <Typography variant="h3" align="center" gutterBottom={true}>
                  Puppy Info
                </Typography>
                <Typography gutterBottom={true} align="center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt vehicula urna sit amet
                  ullamcorper. Fusce blandit felis ipsum, vel ultrices orci sagittis suscipit. Proin convallis posuere
                  nibh ut pharetra. Cras facilisis libero ligula, eget condimentum erat gravida a. Nunc vitae feugiat
                  erat. Sed ultricies tortor suscipit lacinia lacinia. Donec bibendum auctor ante in rhoncus. Nullam ac
                  purus laoreet, mattis velit vitae, porttitor risus. Curabitur dictum, turpis non congue dignissim,
                  lacus massa posuere eros, quis fermentum metus metus nec quam.
                </Typography>
                <Typography gutterBottom={true} align="center">
                  Fusce ornare nisl quis eros cursus, ac consectetur lorem sodales. Duis bibendum sapien ut urna
                  porttitor rhoncus. Donec a turpis molestie enim ultricies lobortis. Praesent iaculis a ligula ac
                  convallis. Morbi pellentesque pellentesque turpis consectetur lobortis. Integer scelerisque egestas
                  nisl, at fringilla enim molestie sit amet. Cras at lobortis nunc, a lacinia eros. Donec tincidunt eget
                  mauris vitae aliquam. Suspendisse non luctus magna, eget pharetra lacus. Vivamus quis mauris velit.
                  Nullam ultricies pulvinar lacus, eget consequat nisl ultrices sed. Nam eget vestibulum augue.
                  Vestibulum vitae tempus turpis. Nullam posuere pretium consequat. Morbi quis sagittis tellus.
                </Typography>
              </Box>
            </Container>
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
    </ParallaxProvider>
  );
};
