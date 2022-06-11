import { ThumbUp as ThumbUpIcon } from '@mui/icons-material';
import { Box, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { ResultState } from '../../hooks/useResult';
import { useUnregisterServiceWorkers } from '../../hooks/useServiceWorker';

type ServiceWorkerUnregistrationProps = {
  hideSnackbar?: boolean;
};
export const ServiceWorkerUnregistration = ({ hideSnackbar }: ServiceWorkerUnregistrationProps) => {
  const [loadedSnackOpen, setLoadedSnack] = useState(false);

  const swResult = useUnregisterServiceWorkers();

  useEffect(() => {
    if (swResult.state === ResultState.Value) {
      const didUnregister = swResult.value;

      // For those curious
      didUnregister && location.reload();
      console.log('Thanks for uninstalling the SW, I no longer want it.');
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
