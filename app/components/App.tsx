import {
  AppBar,
  Box,
  Container,
  createMuiTheme,
  Divider,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

const theme = createMuiTheme({
  spacing: (factor) => `${0.5 * factor}rem`,
});

export const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route path="/home">
        <Box />
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container>
          <Box />
          <Typography variant="h1">Mycah &amp; Elliott</Typography>
          <Divider />
          <Typography variant="body1">We are going to have a wedding!</Typography>
        </Container>
      </Route>
    </Router>
  </ThemeProvider>
);
