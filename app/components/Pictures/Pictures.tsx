import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Container, Dialog, Grid, IconButton, Link, Typography } from '@mui/material';
import React, { useState } from 'react';

import soundAndSea from '../../images/sound-and-sea.png';
import { pictureSources } from '../../images/wedding-pics';
import { ImageRenderer } from './ImageRenderer';

export const Pictures = () => {
  const [inspectPicture, setInspectPicture] = useState<string>();

  return (
    <>
      <Container maxWidth="xl" sx={(theme) => ({ mt: theme.spacing(6), mb: theme.spacing(12) })}>
        <Grid container spacing={3} justifyContent="space-around">
          {pictureSources.map((src) => (
            <Grid key={src} item>
              <ImageRenderer
                src={src}
                onClick={() => setInspectPicture(src)}
                onError={(e) => console.error('failed to load iamge', e)}
              />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ maxWidth: '300px', mt: 3, mx: 'auto' }}>
          <Box sx={{ borderRadius: '50%', overflow: 'hidden' }}>
            <img src={soundAndSea} style={{ width: '100%', height: '100%' }} />
          </Box>
          <Typography sx={{ position: 'relative', top: -50, textAlign: 'center' }} variant="body2">
            All video and photography provided by the amazing Julie and Sophia at{' '}
            <Link target="_blank" href="https://soundandseaphotography.com/">
              sound and sea photography
            </Link>
            .
          </Typography>
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
