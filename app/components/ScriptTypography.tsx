import { OverridableComponent, OverrideProps } from '@material-ui/core/OverridableComponent';
import { makeStyles } from '@material-ui/core/styles';
import Typography, { TypographyProps, TypographyTypeMap } from '@material-ui/core/Typography';
import * as React from 'react';

const useScriptStyles = makeStyles((theme) => ({
  root: {
    fontFamily: 'Lucian Schoenschrift CAT',
    fontSize: ({ variant }: TypographyProps) =>
      (variant &&
        variant !== 'inherit' &&
        variant !== 'srOnly' &&
        `calc(${theme.typography[variant].fontSize} * 1.2)`) ||
      26,
    position: 'relative',
    top: 4,
  },
}));

export const ScriptTypography: OverridableComponent<TypographyTypeMap> = <
  C extends React.ElementType = TypographyTypeMap['defaultComponent']
>(
  props: OverrideProps<TypographyTypeMap<unknown, C>, C>,
) => <Typography {...props} classes={useScriptStyles(props)} />;
