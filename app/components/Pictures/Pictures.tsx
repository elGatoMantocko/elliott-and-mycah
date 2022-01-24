import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Container, Dialog, Grid, IconButton } from '@mui/material';
import React, { useState } from 'react';

import { pictureSources } from '../../images/wedding-pics';
import { ImageRenderer } from './ImageRenderer';

export const Pictures = () => {
  const [inspectPicture, setInspectPicture] = useState<string>();

  return (
    <>
      <Container sx={(theme) => ({ mt: theme.spacing(6), mb: theme.spacing(12) })}>
        <Grid container spacing={3} justifyContent="space-around">
          {pictureSources.map((src) => (
            <Grid key={src} item>
              <ImageRenderer src={src} onClick={() => setInspectPicture(src)} />
            </Grid>
          ))}
        </Grid>
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
