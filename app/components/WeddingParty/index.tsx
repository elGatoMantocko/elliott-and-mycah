import * as React from 'react';

import { ResponsiveContainer } from '../ResponsiveContainer';
import { ScriptTypography } from '../ScriptTypography';

export const WeddingParty = () => (
  <>
    <ResponsiveContainer maxWidth="md">
      <ScriptTypography variant="h2" align="center">
        Bridemaids
      </ScriptTypography>
      <ScriptTypography variant="h2" align="center">
        Groomsmen
      </ScriptTypography>
    </ResponsiveContainer>
  </>
);
