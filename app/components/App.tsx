import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { LoadScript } from '@react-google-maps/api';
import * as React from 'react';
import GithubCorner from 'react-github-corner';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import { useCustomTheme } from '../hooks/useCustomTheme';
import { About } from './About';
import { Menu } from './Menu';
import { Registry } from './Registry';
import { Rsvp } from './Rsvp';
import { ServiceWorkerRegistration } from './ServiceWorkerRegistration';
import { Wedding } from './Wedding';

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
            <Switch>
              <Route exact path="/">
                <Redirect to="/us" />
              </Route>
              <Route exact path="/us">
                <About />
              </Route>
              <Route exact path="/wedding">
                <Wedding />
              </Route>
              <Route exact path="/registry">
                <Registry />
              </Route>
              <Route exact path="/accommodations">
                <Container maxWidth="sm">
                  <Box mb={10}>
                    <Box mt={5}>
                      <Typography gutterBottom>
                        For your convenience, a block of rooms has been reserved at Hampton Inn
                        &amp; Suites and Pan Pacific Hotel.
                      </Typography>
                    </Box>
                    <Box mt={5}>
                      <Typography gutterBottom>
                        Please use the following booking links in order to receive a discounted
                        rate.
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-around" mt={5}>
                      <Link
                        target="_blank"
                        href="https://nam02.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.hilton.com%2Fen%2Fbook%2Freservation%2Fdeeplink%2F%3F%26ctyhocn%3DSEADTHX%26tid%3D31-652062%26groupCode%3DCHHDMW%26arrival%3D20210611%26departure%3D20210613%26cid%3DOM%2CWW%2CHILTONLINK%2Cen%2CDirectLink%26fromId%3DHILTONLINKDIRECT&data=04%7C01%7CAlex.Kubik%40hilton.com%7C2feeed948e844e327c0e08d88d9551c1%7C660292d2cfd54a3db7a7e8f7ee458a0a%7C0%7C0%7C637415019767559097%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C1000&sdata=PWSIIiN2440mHwSZvJfplk%2BaKKbCTNRCnKMxB%2FMguEA%3D&reserved=0"
                      >
                        <Typography>
                          Hampton Inn &amp; Suites
                          <br />
                          <em>(cutoff date 5/11/2021)</em>
                        </Typography>
                      </Link>
                      <Link
                        target="_blank"
                        href="https://reservations.panpacificseattle.com/112928?groupID=3178584#/guestsandrooms"
                      >
                        <Typography>
                          Pan Pacific Hotel
                          <br />
                          <em>(cutoff date 5/21/2021)</em>
                        </Typography>
                      </Link>
                    </Box>
                  </Box>
                </Container>
              </Route>
              <Route path="*">
                <Container maxWidth="sm">
                  <Typography variant="h1">404</Typography>
                  <Typography gutterBottom>
                    Sorry that page doesn&apos;t exist! Blame the developers!
                  </Typography>
                </Container>
              </Route>
            </Switch>
          </Router>
          <GithubCorner
            href="https://github.com/elGatoMantocko/elliott-and-mycah"
            target="_blank"
          />
          <Hidden mdUp>
            <Box position="fixed" bottom="0" left="0" m={4} zIndex={1000}>
              <Rsvp />
            </Box>
          </Hidden>
          <ServiceWorkerRegistration src="/service-worker.js" hideSnackbar />
        </Paper>
      </LoadScript>
    </ThemeProvider>
  </ParallaxProvider>
);
