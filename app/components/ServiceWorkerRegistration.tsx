import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';
import { useCallback, useState } from 'react';

import { fromResult } from '../hooks/useResult';
import { useServiceWorker } from '../hooks/useServiceWorker';

type ServiceWorkerRegistrationProps = { src: string; hideSnackbar?: boolean };
export const ServiceWorkerRegistration = ({
  src,
  hideSnackbar,
}: ServiceWorkerRegistrationProps) => {
  const [loadedSnackOpen, setLoadedSnack] = useState(false);
  fromResult(useServiceWorker(src)).useValue(
    useCallback(() => {
      // For those curious
      console.log(
        'Just an FYI, I only use the SW to precache assets because React and MUI are both really big.',
      );
      setLoadedSnack(true);
    }, []),
  );
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
