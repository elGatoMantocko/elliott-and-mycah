import { Theme, useMediaQuery } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import * as React from 'react';

import { Countdown } from '../Countdown';
import { ResponsiveContainer } from '../ResponsiveContainer';
import { ScriptTypography } from '../ScriptTypography';
import { AboutSection } from './AboutSection';
import { Banner } from './Banner';

const useBannerStyles = (): React.CSSProperties => {
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  return isSmallScreen ? { height: '650px' } : { minHeight: '650px' };
};

export const About = () => (
  <>
    <Banner imageSource="/images/balcony.jpg" style={useBannerStyles()}>
      <ResponsiveContainer maxWidth="md">
        <Box display="flex">
          <Box color="white" mx="auto" mb={1}>
            <ScriptTypography variant="h1" component="h1" align="center">
              Mycah &amp; Elliott
            </ScriptTypography>
            <ScriptTypography variant="h2" component="h2" color="textSecondary">
              <Box display="flex" flexWrap="wrap">
                <Box mx="auto">
                  <em>6/12/21</em>
                </Box>
                <Box mx="auto">
                  <em>Seattle</em>
                </Box>
              </Box>
            </ScriptTypography>
          </Box>
        </Box>
        <Countdown toDate={new Date(2021, 5, 12, 0, 0, 0)} />
      </ResponsiveContainer>
    </Banner>
    <ResponsiveContainer maxWidth="md">
      <Box paddingTop="2rem">
        <AboutSection
          title="Engagement"
          body="In August 2019, we took an Alaskan cruise. While ported in Juneau, AK, we had planned
              to hike to a view of Mendenhall glacier followed by a humpback whale watching tour.
              After nearly missing the bus ride to the glacier, losing our group as soon as we
              arrived, and with the rain pouring down, we hiked a mile and half to a gravel beach
              framed by Mendenhall Glacier, a turquoise lake, and a glacier-fed waterfall. Elliott
              asked our tour guide to take a photo of us and after a few snapshots, got down on one
              knee to pop the question."
          imageSource="/images/one_knee.jpg"
          imageAlt="Elliott pops the question in front of the Mendenhall glacier"
        />
        <AboutSection
          title="How we met"
          body="We met through the band program while attending Purdue University. We remained
                friends until our final year when we had our first date at a farm to table
                restaurant in downtown Lafayette."
          variant="row-reverse"
          imageSource="/images/on_the_hill.jpg"
          imageAlt="Mycah and Elliott attend a Slayter concert on the hill"
        />
        <AboutSection
          title="Chicago and Seattle"
          body="We both, coincidentally, had already planned to move to Chicago, IL after graduation In
            August 2018, we moved to Seattle, WA. We lived in the South Lake Union area until we
            bought our house in Burien in September 2019. In May 2019, we added our chocolate lab,
            Ellie, to our family."
          imageSource="/images/ellie_and_rainier.jpg"
          imageAlt="Ellie strikes a pose in front of 14000ft Mt. Rainier"
        />
      </Box>
    </ResponsiveContainer>
  </>
);
