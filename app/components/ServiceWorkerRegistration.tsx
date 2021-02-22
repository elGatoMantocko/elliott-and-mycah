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
          <Box display="flex" flexGrow="1">
            <Box my="auto">Service worker loaded!</Box>
            <Box ml={2}>
              <ThumbUpIcon />
            </Box>
          </Box>
        }
        color="primary"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={3000}
        onClose={() => setLoadedSnack(false)}
      />
      ;
    </>
  );
};
