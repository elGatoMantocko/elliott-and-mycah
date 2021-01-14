import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { GoogleMap } from '@react-google-maps/api';
import * as React from 'react';
import { useState } from 'react';

import { ResponsiveContainer } from './ResponsiveContainer';

const useGetMapStyles = (): React.CSSProperties => {
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));
  return { width: '100%', height: isSmallScreen ? '75vh' : 800 };
};

enum Location {
  Home = 'home',
  YachtClub = 'yacht-club',
  HamptonInn = 'hampton-inn',
  PanPacificHotel = 'pan-pacific-hotel',
  SeaTacAirport = 'sea-tac',
}

type MapArgs = {
  position: google.maps.ReadonlyLatLngLiteral;
  label: string | JSX.Element;
  description?: string | JSX.Element;
  zoom?: number;
  mapTypeId?: 'satellite' | 'roadmap';
  heading?: number;
};

type PointsOfInterest = {
  [name in Location]: MapArgs;
};

const useExpandButtonStyles = makeStyles({
  root: (props: { expanded: boolean }) => ({
    transition: '0.25s',
    transform: props.expanded ? 'initial' : 'rotate(-180deg)',
  }),
});

const poi: PointsOfInterest = {
  [Location.Home]: {
    position: { lat: 47.487688475492966, lng: -122.3529181906647 },
    zoom: 20.5,
    label: 'Mantock Household',
    description: 'This is where Mycah, Elliott, and Ellie live!',
    mapTypeId: 'satellite',
    heading: 270,
  },
  [Location.YachtClub]: {
    position: { lat: 47.64540544645757, lng: -122.30839522102245 },
    zoom: 17,
    label: 'Seattle Yacht Club',
  },
  [Location.HamptonInn]: {
    position: { lat: 47.62613719101338, lng: -122.34673533018191 },
    zoom: 19,
    label: 'Hampton Inn',
  },
  [Location.PanPacificHotel]: {
    position: { lat: 47.618412587882325, lng: -122.33747379246103 },
    zoom: 18.5,
    label: 'Pan Pacific Hotel',
  },
  [Location.SeaTacAirport]: {
    position: { lat: 47.45111485957373, lng: -122.3067614522024 },
    zoom: 13,
    label: 'SeaTac Airport',
  },
};

const useButtonStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export const Venue = () => {
  const [map, setMap] = useState<google.maps.Map>();

  const [hideButtons, setHideButtons] = useState(false);

  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 47.60664967809876,
    lng: -122.3316322556175,
  });

  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  const buttonClasses = useButtonStyles();

  return (
    <ResponsiveContainer maxWidth="md">
      <Box mb={9}>
        <Collapse collapsedHeight={70} in={hideButtons}>
          <Box display="flex" width="100%" justifyContent="space-between" flexWrap="wrap">
            {Object.entries(poi).map(([key, mapArgs]) => (
              <Button
                key={key}
                classes={buttonClasses}
                variant="contained"
                fullWidth={isSmallScreen}
                onClick={() => {
                  if (map != null) {
                    setCenter(mapArgs.position);
                    map.panTo(mapArgs.position);
                    map.setMapTypeId(mapArgs.mapTypeId || 'roadmap');
                    mapArgs.zoom && map.setZoom(isSmallScreen ? mapArgs.zoom * 0.95 : mapArgs.zoom);
                    mapArgs.heading && map.setHeading(mapArgs.heading);
                  }
                }}
              >
                {mapArgs.label}
              </Button>
            ))}
          </Box>
        </Collapse>
        <Hidden mdUp>
          <IconButton onClick={() => setHideButtons(!hideButtons)}>
            <ExpandMore classes={useExpandButtonStyles({ expanded: !hideButtons })} />
          </IconButton>
        </Hidden>
        <GoogleMap
          onLoad={setMap}
          zoom={13}
          mapContainerStyle={useGetMapStyles()}
          center={center}
        />
      </Box>
    </ResponsiveContainer>
  );
};
