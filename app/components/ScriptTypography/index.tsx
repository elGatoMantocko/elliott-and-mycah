import { Typography, TypographyProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useScriptStyles = makeStyles((theme) => ({
  root: {
    fontFamily: '"Lucian Schoenschrift CAT", serif',
    fontSize: ({ variant }: TypographyProps) =>
      (variant && variant !== 'inherit' && `calc(${theme.typography[variant].fontSize} * 1.2)`) ||
      26,
    position: 'relative',
    top: 4,
  },
}));

export const ScriptTypography = (props: TypographyProps) => (
  <Typography {...props} classes={useScriptStyles(props)} />
);
