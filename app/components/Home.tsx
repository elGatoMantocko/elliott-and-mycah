import { Theme, useMediaQuery } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import { Banner } from './Banner';
import { Hero } from './Hero';

export const Home = () => {
  const isLargeScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.up('sm'));
  return (
    <>
      {/* <Hero /> */}
      <Banner imageSource="/assets/images/balcony.jpg">
        <Hero />
      </Banner>
      <Container maxWidth={isLargeScreen ? 'sm' : false}>
        <Box paddingTop="2rem">
          <Typography variant="h3" align="center" gutterBottom={true}>
            Puppy Info
          </Typography>
          <Typography gutterBottom={true} align="center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt vehicula urna sit amet ullamcorper.
            Fusce blandit felis ipsum, vel ultrices orci sagittis suscipit. Proin convallis posuere nibh ut pharetra.
            Cras facilisis libero ligula, eget condimentum erat gravida a. Nunc vitae feugiat erat. Sed ultricies tortor
            suscipit lacinia lacinia. Donec bibendum auctor ante in rhoncus. Nullam ac purus laoreet, mattis velit
            vitae, porttitor risus. Curabitur dictum, turpis non congue dignissim, lacus massa posuere eros, quis
            fermentum metus metus nec quam.
          </Typography>
          <Typography gutterBottom={true} align="center">
            Fusce ornare nisl quis eros cursus, ac consectetur lorem sodales. Duis bibendum sapien ut urna porttitor
            rhoncus. Donec a turpis molestie enim ultricies lobortis. Praesent iaculis a ligula ac convallis. Morbi
            pellentesque pellentesque turpis consectetur lobortis. Integer scelerisque egestas nisl, at fringilla enim
            molestie sit amet. Cras at lobortis nunc, a lacinia eros. Donec tincidunt eget mauris vitae aliquam.
            Suspendisse non luctus magna, eget pharetra lacus. Vivamus quis mauris velit. Nullam ultricies pulvinar
            lacus, eget consequat nisl ultrices sed. Nam eget vestibulum augue. Vestibulum vitae tempus turpis. Nullam
            posuere pretium consequat. Morbi quis sagittis tellus.
          </Typography>
        </Box>
      </Container>
    </>
  );
};
