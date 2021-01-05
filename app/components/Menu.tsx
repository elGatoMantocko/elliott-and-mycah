import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Link, { LinkProps } from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import HotelIcon from '@material-ui/icons/Hotel';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import * as React from 'react';
import { useHistory, useLocation } from 'react-router';

import { ResponsiveContainer } from './ResponsiveContainer';
import { ScriptTypography } from './ScriptTypography';

const useBottomNavigationStyles = makeStyles({
  root: {
    width: '100%',
  },
});

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

export const Menu = () => {
  const { push } = useHistory();
  const { pathname } = useLocation();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <ResponsiveContainer disableGutters>
        <Toolbar>
          <Hidden smDown>
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
          </Hidden>
          <Hidden mdUp>
            <BottomNavigation
              classes={useBottomNavigationStyles()}
              value={pathname}
              onChange={(_, value) => push(value)}
            >
              <BottomNavigationAction icon={<HomeIcon />} label="Home" value="/" />
              <BottomNavigationAction icon={<GroupIcon />} label="Party" value="/wedding-party" />
              <BottomNavigationAction icon={<DirectionsBoatIcon />} label="Venue" value="/venue" />
              <BottomNavigationAction
                icon={<ShoppingCartIcon />}
                label="Registry"
                value="/registry"
              />
              <BottomNavigationAction icon={<HotelIcon />} label="Hotels" value="/accomodations" />
            </BottomNavigation>
          </Hidden>
        </Toolbar>
      </ResponsiveContainer>
    </AppBar>
  );
};
