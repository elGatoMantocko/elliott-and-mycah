import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import { useState } from 'react';

import { ResponsiveContainer } from '../ResponsiveContainer';
import { ScriptTypography } from '../ScriptTypography';
import { ActiveLink } from './ActiveLink';
import { ListItemLink } from './ListItemLink';
import { routes } from './routes';

export const Menu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <Hidden smDown>
        <AppBar position="static" color="transparent" elevation={0}>
          <ResponsiveContainer disableGutters>
            <Toolbar>
              <Box display="flex" justifyContent="space-between" width="100%" px={1}>
                {routes.map(({ href, label, underConstruction }, i) => (
                  <ActiveLink key={i} href={href} disabled={underConstruction}>
                    {typeof label === 'string' ? (
                      <ScriptTypography>{label}</ScriptTypography>
                    ) : (
                      label
                    )}
                  </ActiveLink>
                ))}
              </Box>
            </Toolbar>
          </ResponsiveContainer>
        </AppBar>
      </Hidden>
      <Hidden mdUp>
        <Box position="fixed" bottom="0" right="0" margin={3} zIndex={1000}>
          <Fab color="secondary" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </Fab>
        </Box>
        <Drawer anchor="bottom" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <List>
            {routes.map(({ href, icon, label, alt, underConstruction }, i) => (
              <ListItemLink key={i} href={href} disabled={underConstruction}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={typeof label === 'string' ? label : alt} />
              </ListItemLink>
            ))}
          </List>
        </Drawer>
      </Hidden>
    </>
  );
};
