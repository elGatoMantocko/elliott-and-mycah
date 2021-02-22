import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { LoadScript } from '@react-google-maps/api';
import * as React from 'react';
import { useState } from 'react';
import GithubCorner from 'react-github-corner';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import { useAddGuests } from '../hooks/useAddGuests';
import { useCustomTheme } from '../hooks/useCustomTheme';
import { ResultState } from '../hooks/useResult';
import { Menu } from './Menu';
import { routes } from './Menu/routes';
import { RsvpButton } from './RsvpButton';
import { RsvpModal } from './RsvpModal';
import { ServiceWorkerRegistration } from './ServiceWorkerRegistration';

const usePaperStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export const App = () => {
  const [rsvpModalOpen, setRsvpModalOpen] = useState(false);
  const [submitGuestsResult, addNewGuests] = useAddGuests();
  return (
    <ParallaxProvider>
      <ThemeProvider theme={useCustomTheme()}>
        <LoadScript googleMapsApiKey="AIzaSyApT_xNp9ePgFYEfdlpw_JJXZG70U1MzXM">
          <Paper classes={usePaperStyles()} elevation={0} square>
            <Router>
              <Menu />
              <Box position="fixed" bottom="0" left="0" m={4} zIndex={1000}>
                <RsvpButton onClick={() => setRsvpModalOpen(true)} />
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
            <RsvpModal
              maxWidth="md"
              open={rsvpModalOpen}
              onClose={() => setRsvpModalOpen(false)}
              loading={submitGuestsResult.state === ResultState.Pending}
              onAddGuests={addNewGuests}
            />
            <ServiceWorkerRegistration src="/service-worker.js" />
          </Paper>
        </LoadScript>
      </ThemeProvider>
    </ParallaxProvider>
  );
};
