import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import * as React from 'react';

import * as balcony from '../../images/balcony.webp';
import * as ellie from '../../images/ellie_and_rainier.webp';
import * as onTheHill from '../../images/on_the_hill.webp';
import * as oneKnee from '../../images/one_knee.webp';
import { Countdown } from '../Countdown';
import { ResponsiveContainer } from '../ResponsiveContainer';
import { ScriptTypography } from '../ScriptTypography';
import { AboutSection } from './AboutSection';
import { Banner } from './Banner';

export const About = () => {
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  return (
    <>
      <Banner imageSource={balcony} style={isSmallScreen ? { height: 650 } : { minHeight: 650 }}>
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
        <Box paddingTop="2rem" mb={isSmallScreen ? 12 : 0}>
          <AboutSection
            title="How we met"
            body="We met through the band program while attending Purdue University. We remained
                friends until our final year when we had our first date at a farm to table
                restaurant in downtown Lafayette."
            imageSource={onTheHill}
            imageAlt="Mycah and Elliott attend a Slayter concert on the hill"
          />
          <AboutSection
            title="Chicago and Seattle"
            body="We both, coincidentally, had already planned to move to Chicago, IL after graduation In
            August 2018, we moved to Seattle, WA. We lived in the South Lake Union area until we
            bought our house in Burien in September 2019. In May 2019, we added our chocolate lab,
            Ellie, to our family."
            imageSource={ellie}
            variant="row-reverse"
            imageAlt="Ellie strikes a pose in front of 14000ft Mt. Rainier"
          />
          <AboutSection
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
      </ResponsiveContainer>
    </>
  );
};
