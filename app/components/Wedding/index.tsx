import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { GoogleMap } from '@react-google-maps/api';
import * as React from 'react';
import { useState } from 'react';

import * as austin from '../../images/headshots/austin.webp';
import * as becca from '../../images/headshots/becca.webp';
import * as billbo from '../../images/headshots/billbo.webp';
import * as brent from '../../images/headshots/brent.webp';
import * as chris from '../../images/headshots/chris.webp';
import * as gina from '../../images/headshots/gina.webp';
import * as paige from '../../images/headshots/paige.webp';
import * as rob from '../../images/headshots/rob.webp';
import * as yachtClubLawn from '../../images/yacht_club_lawn.webp';
import { Banner } from '../Banner';
import { Countdown } from '../Countdown';
import { PartyMember } from '../PartyMember';
import { ScriptTypography } from '../ScriptTypography';

const useGetMapStyles = (): React.CSSProperties => {
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  return { width: '100%', height: isSmallScreen ? '75vh' : 500 };
};

export const Wedding = () => {
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  const [, setMap] = useState<google.maps.Map>();
  return (
    <>
      <Banner
        offset={0.3}
        style={isSmallScreen ? { height: '50vh' } : { minHeight: 650 }}
        imageSource={yachtClubLawn}
      />
      <Container>
        <Box display="flex" flexWrap="wrap" justifyContent="space-around" mt={4}>
          <Box mb={2} textAlign="center" px={1} width={isSmallScreen ? '100%' : '40%'}>
            <ScriptTypography align="center" variant="h1">
              The Seattle Yacht Club
            </ScriptTypography>
            <ScriptTypography
              align="center"
              variant="h2"
              component="h2"
              color="textSecondary"
              gutterBottom
            >
              <em>6/12/21</em>
            </ScriptTypography>
            <Typography variant="body1" gutterBottom>
              Both our ceremony and reception will be held at the following address:
            </Typography>
            <Typography variant="body1" gutterBottom>
              <Link href="https://goo.gl/maps/uMvTrj6rJoa62nz97" target="_blank">
                1807 E. Hamlin St.
                <br />
                Seattle, WA 98112
              </Link>
            </Typography>
          </Box>
          <Box px={1} width={isSmallScreen ? '100%' : '40%'}>
            <GoogleMap
              onLoad={setMap}
              center={{
                lat: 47.6453105466125,
                lng: -122.30854550197377,
              }}
              zoom={15}
              mapContainerStyle={useGetMapStyles()}
            />
          </Box>
        </Box>
      </Container>
      <Container maxWidth="md">
        <Countdown toDate={new Date(2021, 5, 12, 0, 0, 0)} />
      </Container>
      <Container maxWidth="lg">
        <Box mt={4}>
          <ScriptTypography variant="h2" align="center">
            Bridemaids
          </ScriptTypography>
          <Box display="flex" justifyContent="space-around" flexWrap="wrap">
            <Box width="16.5rem">
              <PartyMember
                name="Paige Ubel"
                description="Friend of the bride."
                location="Fishers, Indiana"
                imgSrc={paige}
              />
            </Box>
            <Box width="16.5rem">
              <PartyMember
                name="Rebecca Wiser"
                description="Friend of the bride."
                location="Greenwood, Indiana"
                imgSrc={becca}
              />
            </Box>
            <Box width="16.5rem">
              <PartyMember
                name="Gina Sapienza"
                description="Friend of the bride."
                location="Chicago, Illinois"
                imgSrc={gina}
              />
            </Box>
          </Box>
        </Box>
        <Box mt={4}>
          <ScriptTypography variant="h2" align="center">
            Groomsmen
          </ScriptTypography>
          <Box display="flex" justifyContent="space-around" flexWrap="wrap">
            <Box width="16.5rem">
              <PartyMember
                name="Billy Shank"
                description="Uses all of the beans."
                location="South Bend, Indiana"
                imgSrc={billbo}
              />
            </Box>
            <Box width="16.5rem">
              <PartyMember
                name="Austin Sims"
                description="A fellow man of of the Trombone."
                location="Chicago, Illinois"
                imgSrc={austin}
              />
            </Box>
            <Box width="16.5rem">
              <PartyMember
                name="Rob Mantock"
                description="Some guy."
                location="Indianapolis, Indiana"
                imgSrc={rob}
              />
            </Box>
            <Box width="16.5rem">
              <PartyMember
                name="Brent Mathis"
                description="Beer santa."
                location="St. Louis, Missouri"
                imgSrc={brent}
              />
            </Box>
          </Box>
        </Box>
        <Box mt={4} mb={6}>
          <ScriptTypography variant="h2" align="center">
            Officiant
          </ScriptTypography>
          <Box display="flex">
            <Box mx="auto" width="16.5rem">
              <PartyMember
                name="Chris Jacobus"
                description="Might actually be an airplane."
                location="Kent, Washington"
                imgSrc={chris}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};
