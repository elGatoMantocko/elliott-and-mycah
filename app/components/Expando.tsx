import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse, { CollapseProps } from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';
import * as React from 'react';
import { useState } from 'react';

const useExpandButtonStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

const useButtonIconStyles = makeStyles({
  root: (props: { expanded: boolean }) => ({
    transition: '0.25s',
    transform: props.expanded ? 'rotate(-180deg)' : 'initial',
  }),
});

export const Expando = (props: CollapseProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <Collapse {...props} in={expanded}>
        {props.children}
      </Collapse>
      <Divider />
      <Box position="relative" display="flex" top={-17}>
        <Box mx="auto">
          <Button
            classes={useExpandButtonStyles()}
            variant="outlined"
            disableElevation
            onClick={() => setExpanded(!expanded)}
            endIcon={<ExpandMore classes={useButtonIconStyles({ expanded })} />}
          >
            Show {expanded ? 'Less' : 'More'}
          </Button>
        </Box>
      </Box>
    </>
  );
};
