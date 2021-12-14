// we want the types from this but the actual component doesn't exist in mui
// eslint-disable-next-line import/no-unresolved
import { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';
import Typography, { TypographyProps, TypographyTypeMap } from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import * as React from 'react';

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

export const ScriptTypography: OverridableComponent<TypographyTypeMap> = <
  C extends React.ElementType = TypographyTypeMap['defaultComponent'],
>(
  props: OverrideProps<TypographyTypeMap<unknown, C>, C>,
) => <Typography {...props} classes={useScriptStyles(props)} />;
