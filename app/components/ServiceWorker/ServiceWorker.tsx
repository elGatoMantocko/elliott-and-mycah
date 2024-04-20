import { Button, Snackbar } from '@mui/material';
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { useRegisterSW } from 'virtual:pwa-register/react';

export const ServiceWorker = () => {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
    onRegisteredSW(_, r) {
      r &&
        setInterval(() => {
          r.update().catch((err) => console.error(err));
        }, 60 * 1000);
    },
  });

  // FIXME: update copy + designs here
  return (
    <Snackbar
      open={needRefresh}
      // anchor in bottom-middle to not visually block the profile menu
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      message="A new version of Reef is available."
      action={
        <Button
          onClick={() => {
            updateServiceWorker().catch((err) => console.error(err));
          }}
        >
          Update
        </Button>
      }
    />
  );
};
