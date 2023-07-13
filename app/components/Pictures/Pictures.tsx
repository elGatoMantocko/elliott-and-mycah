import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Container, Dialog, IconButton, Link, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

import soundAndSea from '../../images/sound-and-sea.png';
import { pictureSources } from '../../images/wedding-pics';
import { ImageRenderer } from './ImageRenderer';

export const Pictures = () => {
  const [inspectPicture, setInspectPicture] = useState<string>();

  return (
    <>
      <Container maxWidth="xl" sx={(theme) => ({ mt: theme.spacing(6), mb: theme.spacing(12) })}>
        <Stack direction="row" spacing={3} useFlexGap flexWrap="wrap" justifyContent="space-around">
          {pictureSources.map((image) => (
            <ImageRenderer
              sx={{ mb: 'auto' }}
              key={image.src}
              image={image}
              onClick={() => setInspectPicture(image.src)}
            />
          ))}
        </Stack>
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
