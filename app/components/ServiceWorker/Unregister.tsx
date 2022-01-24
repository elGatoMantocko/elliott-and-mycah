import { ThumbUp as ThumbUpIcon } from '@mui/icons-material';
import { Box, Snackbar } from '@mui/material';
import React, { useState } from 'react';

import { fromResult } from '../../hooks/useResult';
import { useUnregisterServiceWorkers } from '../../hooks/useServiceWorker';

type ServiceWorkerUnregistrationProps = {
  hideSnackbar?: boolean;
};
export const ServiceWorkerUnregistration = ({ hideSnackbar }: ServiceWorkerUnregistrationProps) => {
  const [loadedSnackOpen, setLoadedSnack] = useState(false);

  fromResult(useUnregisterServiceWorkers()).useValue(() => {
    // For those curious
    console.log('I no longer want a service worker.');
    setLoadedSnack(true);
  });

  return (
    <Snackbar
      open={loadedSnackOpen && !hideSnackbar}
      message={
        <Box display="flex" flexGrow="1" width="100%">
          <Box mr={1} my="auto">
            <ThumbUpIcon />
          </Box>
          <Box my="auto">Service worker loaded!</Box>
        </Box>
      }
      color="primary"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={1500}
      onClose={() => setLoadedSnack(false)}
    />
  );
};
