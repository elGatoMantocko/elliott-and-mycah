import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import * as React from 'react';

import { ScriptTypography } from '../ScriptTypography';

type AboutSectionProps = {
  /**
   * Section title displayed above body text.
   */
  title: string | JSX.Element;
  /**
   * Section body displayed to the left or right.
   */
  body: string | JSX.Element;
  /**
   * Image to be displayed next to the copy.
   */
  imageSource?: string;
  /**
   * Image alt text.
   */
  imageAlt?: string;
  /**
   * `'row'` displays the image on the right, `'row-reverse'` displays the image on the left
   */
  variant?: 'row' | 'row-reverse';
};
export const AboutSection = ({
  title,
  body,
  imageSource,
  imageAlt,
  variant = 'row',
}: AboutSectionProps) => {
  const isLargeScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'));
  return (
    <Box pb={1} display="flex" flexDirection={isLargeScreen ? variant : 'column'}>
      <Box maxWidth={isLargeScreen ? '50%' : undefined} mx={1} px={1} mt={3}>
        <ScriptTypography color="secondary" variant="h3" align="center">
          {title}
        </ScriptTypography>
        <Typography gutterBottom align="center">
          {body}
        </Typography>
      </Box>
      {imageSource && (
        <Box
          maxWidth={isLargeScreen ? '50%' : undefined}
          mt={2}
          mx={isLargeScreen ? 1 : 'auto'}
          px={1}
        >
          <img
            style={{ maxWidth: '100%', maxHeight: '60vh', borderRadius: '1rem' }}
            src={imageSource}
            alt={imageAlt}
          />
        </Box>
      )}
    </Box>
  );
};
