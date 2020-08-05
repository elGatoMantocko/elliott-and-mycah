import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/icons/Menu';
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
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <Typography variant="h1">Mycah &amp; Elliott</Typography>
          <Divider />
          <Typography variant="body1">We are going to have a wedding!</Typography>
        </Container>
      </Route>
    </Router>
  </ThemeProvider>
);
