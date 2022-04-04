import { Typography, TypographyProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

export const ScriptTypography = (props: TypographyProps) => {
  const theme = useTheme();

  return (
    <Typography
      {...props}
      sx={{
        ...props.sx,
        fontFamily: '"Lucian Schoenschrift CAT", serif',
        fontSize:
          (props.variant &&
            props.variant !== 'inherit' &&
            `calc(${theme.typography[props.variant].fontSize} * 1.2)`) ||
          26,
        position: 'relative',
        top: 4,
      }}
    />
  );
};
