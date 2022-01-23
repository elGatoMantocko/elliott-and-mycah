import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Container, Dialog, IconButton, Theme, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';

import { pictureSources } from '../../images/wedding-pics';

export const Pictures = () => {
  const [inspectPicture, setInspectPicture] = useState<string>();
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));

  return (
    <>
      <Container>
        <Box
          sx={(theme) => ({
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            mt: theme.spacing(6),
            mb: theme.spacing(12),
          })}
        >
          {pictureSources.map((src) => (
            <Box key={src} sx={{ mt: 'auto', mb: 'auto' }}>
              <Box
                sx={(theme) => ({
                  mt: theme.spacing(3),
                  display: 'flex',
                  overflow: 'hidden',
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: theme.shadows[5],
                })}
              >
                <img
                  src={src}
                  style={{ width: !isSmallScreen ? '20vw' : '40vw', cursor: 'pointer' }}
                  onClick={() => setInspectPicture(src)}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
      <Dialog
        open={inspectPicture != null}
        maxWidth="md"
        onClose={() => setInspectPicture(undefined)}
      >
        <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
          <IconButton onClick={() => setInspectPicture(undefined)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <img src={inspectPicture} style={{ maxHeight: '90vh' }} />
      </Dialog>
    </>
  );
};
