import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import * as React from 'react';

import { ScriptTypography } from '../ScriptTypography';

const useMenuOptionStyles = makeStyles({
  root: {
    height: '100%',
  },
});

const useMenuOptionTitleStyles = makeStyles({
  root: {
    lineHeight: 1,
  },
});

type MenuOptionCardProps = { name: string | JSX.Element; description: string | JSX.Element };
export const MenuOptionCard = ({ name, description }: MenuOptionCardProps) => (
  <Box mx={1} my={1} maxWidth={330}>
    <Card classes={useMenuOptionStyles()}>
      <CardContent>
        <ScriptTypography classes={useMenuOptionTitleStyles()} gutterBottom variant="h4">
          {name}
        </ScriptTypography>
        <Divider />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  </Box>
);
