import { Camera as CameraIcon, Home as HomeIcon, Menu as MenuIcon } from '@mui/icons-material';
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
import React, { useState } from 'react';

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
                <ActiveLink href="/pictures">
                  <ScriptTypography>Pictures</ScriptTypography>
                </ActiveLink>
              </Box>
              <Box ml={6}>
                <ActiveLink href="/wedding">
                  <ScriptTypography>Wedding</ScriptTypography>
                </ActiveLink>
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
            <ListItemLink href="/pictures" onClick={closeDrawer}>
              <ListItemIcon>
                <CameraIcon />
              </ListItemIcon>
              <ListItemText primary="Pictures" />
            </ListItemLink>
            <ListItemLink href="/wedding" onClick={closeDrawer}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Wedding" />
            </ListItemLink>
          </List>
        </Drawer>
      </Hidden>
    </>
  );
};
