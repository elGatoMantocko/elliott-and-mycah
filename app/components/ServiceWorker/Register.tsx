import { ThumbUp as ThumbUpIcon } from '@mui/icons-material';
import { Box, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { ResultState } from '../../hooks/result';
import { useServiceWorker } from '../../hooks/serviceWorker';

type ServiceWorkerRegistrationProps = {
  src: string;
  hideSnackbar?: boolean;
};
export const ServiceWorkerRegistration = ({
  src,
  hideSnackbar,
}: ServiceWorkerRegistrationProps) => {
  const [loadedSnackOpen, setLoadedSnack] = useState(false);

  const swResult = useServiceWorker(src);

  useEffect(() => {
    if (swResult.state === ResultState.Value) {
      // For those curious
      console.log(
        'Just an FYI, I only use the SW to precache assets because React and MUI are both really big.',
      );
      setLoadedSnack(true);
    }

    if (swResult.state === ResultState.Error) {
      console.error(`I'm sorry you have to deal with my shit: ${swResult.value}`);
    }
  }, [swResult]);

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
