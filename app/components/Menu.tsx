import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import Link, { LinkProps } from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import HotelIcon from '@material-ui/icons/Hotel';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import * as React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router';

import { ResponsiveContainer } from './ResponsiveContainer';
import { ScriptTypography } from './ScriptTypography';

type Colors =
  | 'inherit'
  | 'initial'
  | 'primary'
  | 'secondary'
  | 'textPrimary'
  | 'textSecondary'
  | 'error';
type ActiveLinkProps = { href: string; activeColor?: Colors; inactiveColor?: Colors } & LinkProps;
const ActiveLink = ({
  activeColor = 'primary',
  inactiveColor = 'secondary',
  ...linkProps
}: ActiveLinkProps) => {
  const { pathname } = useLocation();
  return <Link {...linkProps} color={pathname === linkProps.href ? activeColor : inactiveColor} />;
};

const ListItemLink = (props: ListItemProps<'a', { button?: true }>) => (
  <ListItem button component="a" {...props} />
);

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box position="fixed" bottom="0" right="0" margin={3} zIndex={1000}>
        <Fab color="secondary" onClick={() => setOpen(true)}>
          <MenuIcon />
        </Fab>
      </Box>
      <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItemLink href="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemLink>
          <ListItemLink href="/wedding-party">
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Wedding Party" />
          </ListItemLink>
          <ListItemLink href="/venue">
            <ListItemIcon>
              <DirectionsBoatIcon />
            </ListItemIcon>
            <ListItemText primary="Venue" />
          </ListItemLink>
          <ListItemLink href="/registry">
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Registry" />
          </ListItemLink>
          <ListItemLink href="/accomodations">
            <ListItemIcon>
              <HotelIcon />
            </ListItemIcon>
            <ListItemText primary="Accomodations" />
          </ListItemLink>
        </List>
      </Drawer>
    </>
  );
};

export const Menu = () => (
  <>
    <Hidden smDown>
      <AppBar position="static" color="transparent" elevation={0}>
        <ResponsiveContainer disableGutters>
          <Toolbar>
            <Box display="flex" justifyContent="space-between" width="100%" px={1}>
              <ActiveLink href="/">
                <img src="/images/eandm.jpg" alt="E + M logo" />
              </ActiveLink>
              <ActiveLink href="/wedding-party">
                <ScriptTypography>Wedding Party</ScriptTypography>
              </ActiveLink>
              <ActiveLink href="/venue">
                <ScriptTypography>Venue</ScriptTypography>
              </ActiveLink>
              <ActiveLink href="/registry">
                <ScriptTypography>Registry</ScriptTypography>
              </ActiveLink>
              <ActiveLink href="/accomodations">
                <ScriptTypography>Accomodations</ScriptTypography>
              </ActiveLink>
            </Box>
          </Toolbar>
        </ResponsiveContainer>
      </AppBar>
    </Hidden>
    <Hidden mdUp>
      <MobileMenu />
    </Hidden>
  </>
);
