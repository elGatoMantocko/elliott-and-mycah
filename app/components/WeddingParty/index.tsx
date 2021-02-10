import Box from '@material-ui/core/Box';
import * as React from 'react';

import * as austin from '../../images/headshots/austin.webp';
import * as becca from '../../images/headshots/becca.webp';
import * as billbo from '../../images/headshots/billbo.webp';
import * as brent from '../../images/headshots/brent.webp';
import * as chris from '../../images/headshots/chris.webp';
import * as paige from '../../images/headshots/paige.webp';
import * as rob from '../../images/headshots/rob.webp';
import { ResponsiveContainer } from '../ResponsiveContainer';
import { ScriptTypography } from '../ScriptTypography';
import { PartyMember } from './PartyMember';

export const WeddingParty = () => (
  <>
    <ResponsiveContainer maxWidth="lg">
      <Box mt={4}>
        <ScriptTypography variant="h2" align="center">
          Groomsmen
        </ScriptTypography>
        <Box display="flex" justifyContent="space-around" flexWrap="wrap">
          <Box width="16.5rem">
            <PartyMember
              name="Billy Shank"
              description="Billy makes sure to use all of the beans. Lives in South Bend, Indiana."
              imgSrc={billbo}
            />
          </Box>
          <Box width="16.5rem">
            <PartyMember
              name="Austin Sims"
              description="Friend of the groom and a fellow man of of the Trombone. Lives in Chicago, Illinois."
              imgSrc={austin}
            />
          </Box>
          <Box width="16.5rem">
            <PartyMember
              name="Rob Mantock"
              description="Some guy. Lives in Indianapolis, Indiana."
              imgSrc={rob}
            />
          </Box>
          <Box width="16.5rem">
            <PartyMember
              name="Brent Mathis"
              description="Close friend of the bride and groom and beer santa. Lives in St. Louis, Missouri"
              imgSrc={brent}
            />
          </Box>
        </Box>
      </Box>
      <Box mt={4}>
        <ScriptTypography variant="h2" align="center">
          Bridemaids
        </ScriptTypography>
        <Box display="flex" justifyContent="space-around" flexWrap="wrap">
          <Box width="16.5rem">
            <PartyMember
              name="Paige Ubel"
              description="Friend of the bride. Lives in Fishers, Indiana."
              imgSrc={paige}
            />
          </Box>
          <Box width="16.5rem">
            <PartyMember
              name="Kat Martin"
              description="Friend of the bride. Lives in Seoul, South Korea."
              imgSrc=""
            />
          </Box>
          <Box width="16.5rem">
            <PartyMember
              name="Rebecca Wiser"
              description="Friend of the bride. Lives in Greenwood, Indiana."
              imgSrc={becca}
            />
          </Box>
          <Box width="16.5rem">
            <PartyMember
              name="Gina Sapienza"
              description="Friend of the bride. Lives in Chicago, Illinois."
              imgSrc=""
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
              description="Close friend of the bride and groom."
              imgSrc={chris}
            />
          </Box>
        </Box>
      </Box>
    </ResponsiveContainer>
  </>
);
