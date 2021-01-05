import { GoogleMap } from '@react-google-maps/api';
import * as React from 'react';

import { ResponsiveContainer } from './ResponsiveContainer';

export const Venue = () => (
  <>
    <ResponsiveContainer maxWidth="md">
      <GoogleMap
        zoom={15}
        mapContainerStyle={{ width: '100%', height: 400 }}
        center={{
          lat: 47.6453149,
          lng: -122.3085433,
        }}
      />
    </ResponsiveContainer>
  </>
);
