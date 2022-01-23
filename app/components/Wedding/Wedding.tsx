import { Box, Container, Link, Theme, Typography, useMediaQuery } from '@mui/material';
import { GoogleMap } from '@react-google-maps/api';
import React from 'react';

import { austin, becca, billbo, brent, chris, gina, paige, rob } from '../../images/headshots';
import yachtClub from '../../images/wedding-pics/me (202 of 828).jpg';
import { Banner } from '../Banner';
import { Countdown } from '../Countdown';
import { ScriptTypography } from '../ScriptTypography';
import { MenuOptionCard } from './MenuOptionCard';
import { PartyMember } from './PartyMember';

const useGetMapStyles = (): React.CSSProperties => {
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));
  return { width: '100%', height: isSmallScreen ? '75vh' : 500 };
};

export const Wedding = () => {
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));

  return (
    <>
      <Banner
        translateY={[-15, 15]}
        height={isSmallScreen ? '90vh' : 650}
        imageSource={yachtClub}
      />
      <Container maxWidth="md">
        <Countdown toDate={new Date(2021, 5, 12, 16, 0, 0)} />
      </Container>
      <Container>
        <Box display="flex" flexWrap="wrap" justifyContent="space-around" mt={4}>
          <Box mb={2} textAlign="center" px={1} width={isSmallScreen ? '100%' : '40%'}>
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
          </Box>
          <Box px={1} width={isSmallScreen ? '100%' : '40%'}>
            <GoogleMap
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
        <Box mt={4}>
          <ScriptTypography align="center" variant="h2">
            Reception meal options
          </ScriptTypography>
          <Box
            display="flex"
            justifyContent="space-around"
            flexWrap={isSmallScreen ? 'wrap' : 'nowrap'}
          >
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
          </Box>
        </Box>
      </Container>
      <Container maxWidth="lg">
        <Box mt={4}>
          <ScriptTypography variant="h2" align="center">
            Bridesmaids
          </ScriptTypography>
          <Box
            sx={
              isSmallScreen
                ? { display: 'inline-flex', overflowX: 'scroll', width: '100%' }
                : {
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                  }
            }
          >
            <Box sx={{ minWidth: '16.5rem', maxWidth: '16.5rem' }}>
              <PartyMember
                name="Paige Ubel"
                description="Friend of the bride."
                location="Fishers, Indiana"
                imgSrc={paige}
              />
            </Box>
            <Box sx={{ minWidth: '16.5rem', maxWidth: '16.5rem' }}>
              <PartyMember
                name="Rebecca Wiser"
                description="Friend of the bride."
                location="Greenwood, Indiana"
                imgSrc={becca}
              />
            </Box>
            <Box sx={{ minWidth: '16.5rem', maxWidth: '16.5rem' }}>
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
          <Box
            sx={
              isSmallScreen
                ? { display: 'inline-flex', overflowX: 'scroll', width: '100%' }
                : {
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                  }
            }
          >
            <Box sx={{ minWidth: '16.5rem', maxWidth: '16.5rem' }}>
              <PartyMember
                name="Billy Shank"
                description="Uses all of the beans."
                location="South Bend, Indiana"
                imgSrc={billbo}
              />
            </Box>
            <Box sx={{ minWidth: '16.5rem', maxWidth: '16.5rem' }}>
              <PartyMember
                name="Austin Sims"
                description="A fellow man of of the Trombone."
                location="Chicago, Illinois"
                imgSrc={austin}
              />
            </Box>
            <Box sx={{ minWidth: '16.5rem', maxWidth: '16.5rem' }}>
              <PartyMember
                name="Rob Mantock"
                description="Some guy."
                location="Indianapolis, Indiana"
                imgSrc={rob}
              />
            </Box>
            <Box sx={{ minWidth: '16.5rem', maxWidth: '16.5rem' }}>
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
