import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Link, { LinkProps } from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useSwipeable } from 'react-swipeable';

import { ResponsiveContainer } from './ResponsiveContainer';
import { ScriptTypography } from './ScriptTypography';

type Route = { href: string; name: string };
const routes: Route[] = [
  { href: '/about', name: 'About' },
  { href: '/wedding-party', name: 'Wedding Party' },
  { href: '/venue', name: 'Venue' },
  { href: '/registry', name: 'Registry' },
  { href: '/hotels', name: 'Accomodations' },
];

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
  const { location } = useHistory();
  return (
    <Link
      {...linkProps}
      color={location.pathname === linkProps.href ? activeColor : inactiveColor}
    />
  );
};

export const Menu = () => {
  const [xOffset, setXOffset] = useState(0);

  const { location, push } = useHistory();

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const currentRouteIndex = routes.findIndex(({ href }) => location.pathname === href);
      push(routes[(currentRouteIndex === 0 ? routes.length : currentRouteIndex) - 1].href);
      setXOffset(0);
    },
    onSwipedRight: () => {
      const currentRouteIndex = routes.findIndex(({ href }) => location.pathname === href);
      push(routes[currentRouteIndex === routes.length - 1 ? 0 : currentRouteIndex + 1].href);
      setXOffset(0);
    },
    onSwiping: ({ deltaX }) =>
      deltaX < Math.abs(200)
        ? setXOffset(Math.sign(deltaX) * Math.log(Math.abs(deltaX)) * 10)
        : setXOffset(53),
  });

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <ResponsiveContainer disableGutters>
        <Toolbar disableGutters>
          <Hidden smDown>
            <Box display="flex" justifyContent="space-between" width="100%" px={1}>
              <ScriptTypography>
                <ActiveLink href="/about">About</ActiveLink>
              </ScriptTypography>
              <ScriptTypography>
                <ActiveLink href="/wedding-party">Wedding Party</ActiveLink>
              </ScriptTypography>
              <ScriptTypography>
                <ActiveLink href="/venue">Venue</ActiveLink>
              </ScriptTypography>
              <ScriptTypography>
                <ActiveLink href="/registry">Registry</ActiveLink>
              </ScriptTypography>
              <ScriptTypography>
                <ActiveLink href="/hotels">Hotels</ActiveLink>
              </ScriptTypography>
            </Box>
          </Hidden>
          <Hidden mdUp>
            <Box display="flex" width="100%" {...handlers}>
              <Box mx="auto" my="auto" position="relative" left={xOffset}>
                <Typography>
                  <TouchAppIcon /> Swipe left and right to navigate
                </Typography>
              </Box>
            </Box>
          </Hidden>
        </Toolbar>
      </ResponsiveContainer>
    </AppBar>
  );
};
