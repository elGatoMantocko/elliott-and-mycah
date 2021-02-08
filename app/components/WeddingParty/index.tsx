import Box from '@material-ui/core/Box';
import * as React from 'react';

import * as austin from '../../images/headshots/austin.webp';
import * as billbo from '../../images/headshots/billbo.webp';
import * as brent from '../../images/headshots/brent.webp';
import * as rob from '../../images/headshots/rob.webp';
import { ResponsiveContainer } from '../ResponsiveContainer';
import { ScriptTypography } from '../ScriptTypography';
import { PartyMember } from './PartyMember';

export const WeddingParty = () => (
  <>
    <ResponsiveContainer maxWidth="lg">
      <ScriptTypography variant="h2">Groomsmen</ScriptTypography>
      <Box display="flex" justifyContent="space-around">
        <Box width="20vw">
          <PartyMember
            name="Billy Shank"
            description="Billy makes sure to use all of the beans."
            imgSrc={billbo}
          />
        </Box>
        <Box width="20vw">
          <PartyMember
            name="Austin Sims"
            description="Friend of the groom and a fellow man of of the Trombone."
            imgSrc={austin}
          />
        </Box>
        <Box width="20vw">
          <PartyMember name="Rob Mantock" description="Brother of the groom." imgSrc={rob} />
        </Box>
        <Box width="20vw">
          <PartyMember
            name="Brent Mathis"
            description="Friend of the groom and really likes beer."
            imgSrc={brent}
          />
        </Box>
      </Box>
      <ScriptTypography variant="h2">Bridemaids</ScriptTypography>
    </ResponsiveContainer>
  </>
);
