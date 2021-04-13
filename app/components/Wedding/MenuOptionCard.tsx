import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
