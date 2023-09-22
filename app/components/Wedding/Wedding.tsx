import { Container, Link, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import { GoogleMap } from '@react-google-maps/api';
import React from 'react';

import { austin, becca, billbo, brent, chris, gina, paige, rob } from '../../images/headshots';
import yachtClub from '../../images/wedding-pics/me (202 of 828).jpg';
import yachtClubSmall from '../../images/wedding-pics/me (202 of 828)-small.jpg';
import { Banner } from '../Banner';
import { Countdown } from '../Countdown';
import { ScriptTypography } from '../ScriptTypography';
import { MenuOptionCard } from './MenuOptionCard';
import { PartyMember } from './PartyMember';

interface UseGetMapStylesOptions {
  isSmallScreen: boolean;
}
const useGetMapStyles = ({ isSmallScreen }: UseGetMapStylesOptions): React.CSSProperties => ({
  width: '100%',
  height: isSmallScreen ? '75vh' : 500,
});

export const Wedding = () => {
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));

  return (
    <>
      <Banner
        image={{ src: yachtClub, min: yachtClubSmall }}
        translateY={[-15, 15]}
        height={isSmallScreen ? '90vh' : 650}
      >
        <Countdown toDate={new Date(2021, 5, 12, 16, 0, 0)} />
      </Banner>
      <Container sx={{ my: 4 }}>
        <Stack direction="row" spacing={1}>
          <Stack textAlign="center" spacing={1} minWidth="40%">
            <ScriptTypography align="center" variant="h2">
              The Seattle Yacht Club
            </ScriptTypography>
            <ScriptTypography align="center" variant="h3" color="textSecondary" gutterBottom>
              <em>6/12/21 @ 4pm</em>
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
          </Stack>
          <GoogleMap
            center={{ lat: 47.6453105466125, lng: -122.30854550197377 }}
            zoom={15}
            mapContainerStyle={useGetMapStyles({ isSmallScreen })}
          />
        </Stack>
      </Container>
      <Container maxWidth="md" sx={{ mb: 4 }}>
        <Stack mt={4} spacing={1}>
          <ScriptTypography align="center" variant="h2">
            Reception meal options
          </ScriptTypography>
          <Stack direction="row" spacing={1}>
            <MenuOptionCard
              name="Crab Stuffed Salmon"
              description="Dungeness Crab Stuffed Salmon with Citrus Beurre Blanc, Rice Pilaf and Seasonal Vegetables"
            />
            <MenuOptionCard
              name="Pancetta Chicken"
              description={
                <>
                  Oven Roasted with Pancetta, Fresh Sage and Roasted Garlic, Rice Pilaf and Seasonal
                  Vegetables - <em>Gluten Free</em>
                </>
              }
            />
            <MenuOptionCard
              name="Spinach Tortellini"
              description="Spinach and Roasted Garlic with a Creamy Pesto Sauce and Seasonal Vegetables"
            />
          </Stack>
        </Stack>
      </Container>
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Stack spacing={2}>
          <ScriptTypography variant="h2" align="center">
            Bridesmaids
          </ScriptTypography>
          <Stack
            spacing={2}
            direction="row"
            useFlexGap
            flexWrap={isSmallScreen ? undefined : 'wrap'}
            justifyContent="space-around"
          >
            <PartyMember
              name="Paige Ubel"
              description="Friend of the bride."
              location="Fishers, Indiana"
              imgSrc={paige}
              width={33}
            />
            <PartyMember
              name="Rebecca Wiser"
              description="Friend of the bride."
              location="Greenwood, Indiana"
              imgSrc={becca}
              width={33}
            />
            <PartyMember
              name="Gina Sapienza"
              description="Friend of the bride."
              location="Chicago, Illinois"
              imgSrc={gina}
              width={33}
            />
          </Stack>
          <ScriptTypography variant="h2" align="center">
            Groomsmen
          </ScriptTypography>
          <Stack
            spacing={2}
            direction="row"
            useFlexGap
            flexWrap={isSmallScreen ? undefined : 'wrap'}
            justifyContent="space-around"
          >
            <PartyMember
              name="Billy Shank"
              description="Uses all of the beans."
              location="South Bend, Indiana"
              imgSrc={billbo}
              width={33}
            />
            <PartyMember
              name="Austin Sims"
              description="A fellow man of of the Trombone."
              location="Chicago, Illinois"
              imgSrc={austin}
              width={33}
            />
            <PartyMember
              name="Rob Mantock"
              description="Some guy."
              location="Indianapolis, Indiana"
              imgSrc={rob}
              width={33}
            />
            <PartyMember
              name="Brent Mathis"
              description="Beer santa."
              location="St. Louis, Missouri"
              imgSrc={brent}
              width={33}
            />
          </Stack>
          <ScriptTypography variant="h2" align="center">
            Officiant
          </ScriptTypography>
          <Stack
            spacing={2}
            direction="row"
            useFlexGap
            flexWrap={isSmallScreen ? undefined : 'wrap'}
            justifyContent="space-around"
          >
            <PartyMember
              name="Chris Jacobus"
              description="Might actually be an airplane."
              location="Kent, Washington"
              imgSrc={chris}
              width={33}
            />
          </Stack>
        </Stack>
      </Container>
    </>
  );
};
