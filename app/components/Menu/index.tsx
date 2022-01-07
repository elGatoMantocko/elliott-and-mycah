import {
  Home as HomeIcon,
  Hotel as HotelIcon,
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  Fab,
  Hidden,
  List,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

import { Rsvp } from '../Rsvp';
import { ScriptTypography } from '../ScriptTypography';
import { ActiveLink } from './ActiveLink';
import { ListItemLink } from './ListItemLink';

export const Menu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <Hidden mdDown>
        <AppBar position="static" color="transparent" elevation={0}>
          <Container>
            <Toolbar>
              <Box>
                <ActiveLink href="/us">
                  <ScriptTypography>About us</ScriptTypography>
                </ActiveLink>
              </Box>
              <Box ml={6}>
                <ActiveLink href="/wedding">
                  <ScriptTypography>Wedding</ScriptTypography>
                </ActiveLink>
              </Box>
              <Box ml={6}>
                <ActiveLink href="/registry">
                  <ScriptTypography>Registry</ScriptTypography>
                </ActiveLink>
              </Box>
              <Box ml={6}>
                <ActiveLink href="/accommodations">
                  <ScriptTypography>Accommodations</ScriptTypography>
                </ActiveLink>
              </Box>
              <Box ml="auto" my="auto" mr={4}>
                <Rsvp />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Hidden>
      <Hidden mdUp>
        <Box position="fixed" bottom="0" right="0" margin={3} zIndex={1000}>
          <Fab color="secondary" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </Fab>
        </Box>
        <Drawer anchor="bottom" open={drawerOpen} onClose={closeDrawer}>
          <List>
            <ListItemLink href="/us" onClick={closeDrawer}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="About us" />
            </ListItemLink>
            <ListItemLink href="/wedding" onClick={closeDrawer}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Wedding" />
            </ListItemLink>
            <ListItemLink href="/registry" onClick={closeDrawer}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Registry" />
            </ListItemLink>
            <ListItemLink href="/accommodations" onClick={closeDrawer}>
              <ListItemIcon>
                <HotelIcon />
              </ListItemIcon>
              <ListItemText primary="Accommodations" />
            </ListItemLink>
          </List>
        </Drawer>
      </Hidden>
    </>
  );
};
