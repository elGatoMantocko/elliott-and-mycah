import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import * as React from 'react';
import { useState } from 'react';

import { useResultState } from '../hooks/useResult';
import { useServiceWorker } from '../hooks/useServiceWorker';

type ServiceWorkerRegistrationProps = { src: string };
export const ServiceWorkerRegistration = ({ src }: ServiceWorkerRegistrationProps) => {
  const [loadedSnackOpen, setLoadedSnack] = useState(false);
  useResultState(useServiceWorker(src)).useValue(() => {
    // For those curious
    console.log(
      'Just an FYI, I only use the SW to precache assets because React and MUI are both really big.',
    );
    setLoadedSnack(true);
  });
  return (
    <>
      <Snackbar
        open={loadedSnackOpen}
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
      ;
    </>
  );
};
