import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { GoogleMap } from '@react-google-maps/api';
import * as React from 'react';
import { useState } from 'react';

import { ResponsiveContainer } from '../ResponsiveContainer';
import { poi } from './pointsOfInterest';

const useGetMapStyles = (): React.CSSProperties => {
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));
  return { width: '100%', height: isSmallScreen ? '75vh' : 800 };
};

const useExpandButtonStyles = makeStyles({
  root: (props: { expanded: boolean }) => ({
    transition: '0.25s',
    transform: props.expanded ? 'initial' : 'rotate(-180deg)',
  }),
});

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
            {Object.entries(poi).map(([key, { position, mapTypeId, zoom, heading, label }]) => (
              <Button
                key={key}
                classes={buttonClasses}
                variant="contained"
                fullWidth={isSmallScreen}
                onClick={() => {
                  // this is a hack to fix the map remounting whenever the dom refreshes
                  setCenter(position);
                  if (map != null) {
                    map.panTo(position);
                    map.setMapTypeId(mapTypeId || 'roadmap');

                    // becuase of mobile dimensions, zoom looks funky on smaller screens
                    zoom && map.setZoom(isSmallScreen ? zoom * 0.95 : zoom);
                    heading && map.setHeading(heading);
                  }
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Collapse>
        <Hidden mdUp>
          <IconButton onClick={() => setHideButtons(!hideButtons)}>
            <ExpandMore
              className="material-icons"
              classes={useExpandButtonStyles({ expanded: !hideButtons })}
            />
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
