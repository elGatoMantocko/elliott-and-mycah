import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { GoogleMap } from '@react-google-maps/api';
import * as React from 'react';

import { ResponsiveContainer } from './ResponsiveContainer';

const useGetMapStyles = (): React.CSSProperties => {
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));
  return { width: '100%', height: isSmallScreen ? '75vh' : 400 };
};

export const Venue = () => (
  <>
    <ResponsiveContainer maxWidth="md">
      <GoogleMap
        zoom={15}
        mapContainerStyle={useGetMapStyles()}
        center={{
          lat: 47.6453149,
          lng: -122.3085433,
        }}
      />
    </ResponsiveContainer>
  </>
);
