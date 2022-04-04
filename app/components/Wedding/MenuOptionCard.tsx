import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';

import { ScriptTypography } from '../ScriptTypography';

type MenuOptionCardProps = { name: string | JSX.Element; description: string | JSX.Element };
export const MenuOptionCard = ({ name, description }: MenuOptionCardProps) => (
  <Box mx={1} my={1} maxWidth={330}>
    <Card
      sx={{
        height: '100%',
      }}
    >
      <CardContent>
        <ScriptTypography
          sx={{
            lineHeight: 1,
          }}
          gutterBottom
          variant="h4"
        >
          {name}
        </ScriptTypography>
        <Divider />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  </Box>
);
