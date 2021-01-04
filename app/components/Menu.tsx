import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';
import { useHistory } from 'react-router';

import { ResponsiveContainer } from './ResponsiveContainer';
import { ScriptTypography } from './ScriptTypography';

export const Menu = () => {
  const { location } = useHistory();
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <ResponsiveContainer disableGutters>
        <Toolbar disableGutters>
          <Box display="flex" justifyContent="space-between" width="100%" px={1}>
            <ScriptTypography>
              <Link href="/about" color={location.pathname === '/about' ? 'secondary' : 'primary'}>
                About
              </Link>
            </ScriptTypography>
            <ScriptTypography>
              <Link
                href="/wedding-party"
                color={location.pathname === '/wedding-party' ? 'secondary' : 'primary'}
              >
                Wedding Party
              </Link>
            </ScriptTypography>
            <ScriptTypography>
              <Link href="/venue" color={location.pathname === '/venue' ? 'secondary' : 'primary'}>
                Venue
              </Link>
            </ScriptTypography>
            <ScriptTypography>
              <Link
                href="/registry"
                color={location.pathname === '/registry' ? 'secondary' : 'primary'}
              >
                Registry
              </Link>
            </ScriptTypography>
            <ScriptTypography>
              <Link
                href="/hotels"
                color={location.pathname === '/hotels' ? 'secondary' : 'primary'}
              >
                Hotels
              </Link>
            </ScriptTypography>
          </Box>
        </Toolbar>
      </ResponsiveContainer>
    </AppBar>
  );
};
