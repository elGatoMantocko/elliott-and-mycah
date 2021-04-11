import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import * as React from 'react';

import * as ellie from '../../images/ellie_and_rainier.webp';
import * as elliottAndMycah from '../../images/elliottandmycah.webp';
import * as onTheHill from '../../images/on_the_hill.webp';
import * as oneKnee from '../../images/one_knee.webp';
import { Banner } from '../Banner';
import { ScriptTypography } from '../ScriptTypography';
import { Section } from './Section';

export const About = () => {
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  return (
    <>
      <Banner
        imageSource={elliottAndMycah}
        offset={0.3}
        style={isSmallScreen ? { height: '90vh' } : { minHeight: 650 }}
      />
      <Container maxWidth="md">
        <Box display="flex">
          <Box mx="auto" my={3}>
            <ScriptTypography variant="h1" align="center">
              Mycah &amp; Elliott
            </ScriptTypography>
          </Box>
        </Box>
      </Container>
      <Container>
        <Box
          pt={4}
          mb={isSmallScreen ? 12 : 0}
          display="flex"
          flexWrap="wrap"
          justifyContent="space-around"
        >
          <Section
            title="How we met"
            body="We met through the band program while attending Purdue University. We remained
              friends until our final year when we had our first date at a farm to table
              restaurant in downtown Lafayette."
            imageSource={onTheHill}
            imageAlt="Mycah and Elliott attend a Slayter concert on the hill"
          />
          <Section
            title="Chicago and Seattle"
            body="We both, coincidentally, had already planned to move to Chicago, IL after graduation In
              August 2018, we moved to Seattle, WA. We lived in the South Lake Union area until we
              bought our house in Burien in September 2019. In May 2019, we added our chocolate lab,
              Ellie, to our family."
            imageSource={ellie}
            imageAlt="Ellie strikes a pose in front of 14000ft Mt. Rainier"
          />
          <Section
            title="Engagement"
            body="In August 2019, we took an Alaskan cruise. While ported in Juneau, AK, we had planned
              to hike to a view of Mendenhall glacier followed by a humpback whale watching tour.
              After nearly missing the bus ride to the glacier, losing our group as soon as we
              arrived, and with the rain pouring down, we hiked a mile and half to a gravel beach
              framed by Mendenhall Glacier, a turquoise lake, and a glacier-fed waterfall. Elliott
              asked our tour guide to take a photo of us and after a few snapshots, got down on one
              knee to pop the question."
            imageSource={oneKnee}
            imageAlt="Elliott pops the question in front of the Mendenhall glacier"
          />
        </Box>
      </Container>
    </>
  );
};
