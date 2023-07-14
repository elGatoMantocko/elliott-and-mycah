import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Card, Container, Dialog, IconButton, Link, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

import soundAndSea from '../../images/sound-and-sea.png';
import { Image, pictureSources } from '../../images/wedding-pics';
import { ImageRenderer } from './ImageRenderer';

interface OpenDialog {
  open: true;
  inspectPicture: Image;
}

interface ClosedDialog {
  open: false;
  inspectPicture: Image | null;
}

type DialogState = OpenDialog | ClosedDialog;

export const Pictures = () => {
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    inspectPicture: null,
  });

  return (
    <>
      <Container maxWidth="xl" sx={(theme) => ({ mt: theme.spacing(6), mb: theme.spacing(12) })}>
        <Stack direction="row" spacing={3} useFlexGap flexWrap="wrap" justifyContent="space-around">
          {pictureSources.map((image) => (
            <Card key={image.src} sx={{ mb: 'auto' }}>
              <ImageRenderer
                image={image}
                onClick={() => setDialogState({ open: true, inspectPicture: image })}
              />
            </Card>
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
        open={dialogState.open}
        fullWidth
        maxWidth="md"
        onClose={() => setDialogState((prev) => ({ ...prev, open: false }))}
        TransitionProps={{
          onExited: () => setDialogState({ open: false, inspectPicture: null }),
        }}
      >
        <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
          <IconButton onClick={() => setDialogState((prev) => ({ ...prev, open: false }))}>
            <CloseIcon />
          </IconButton>
        </Box>
        {dialogState.inspectPicture != null && (
          <ImageRenderer image={dialogState.inspectPicture} fullWidth />
        )}
      </Dialog>
    </>
  );
};
