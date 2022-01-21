import { Box, Typography } from '@mui/material';
import React from 'react';

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
};

export const Section = ({ title, body, imageSource, imageAlt }: AboutSectionProps) => (
  <Box display="flex" flexDirection="column" pb={1} maxWidth={470}>
    <Box mx={1} px={1} mt={3}>
      <ScriptTypography color="secondary" variant="h3" align="center">
        {title}
      </ScriptTypography>
      <Typography gutterBottom align="center">
        {body}
      </Typography>
    </Box>
    {imageSource && (
      <Box sx={{ mt: 2, mx: 'auto', px: 1 }}>
        <Box
          sx={(theme) => ({
            display: 'flex',
            maxHeight: '60vh',
            borderRadius: theme.spacing(2),
            overflow: 'hidden',
            boxShadow: theme.shadows[5],
          })}
        >
          <img style={{ maxWidth: '100%' }} src={imageSource} alt={imageAlt} />
        </Box>
      </Box>
    )}
  </Box>
);
