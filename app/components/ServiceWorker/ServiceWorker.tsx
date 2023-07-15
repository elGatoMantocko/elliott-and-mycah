import { Button, Snackbar } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { Workbox, WorkboxLifecycleWaitingEvent } from 'workbox-window';

const NOOP = () => {};

export const ServiceWorker = () => {
  const [updateFound, setUpdateFound] = useState(false);

  const wb = useMemo(() => {
    if (!('serviceWorker' in navigator)) {
      return undefined;
    }
    return new Workbox('/service-worker.js');
  }, []);

  useEffect(() => {
    // break out if no service worker
    if (wb == null) return undefined;

    const showSkipWaitingPrompt = (e: WorkboxLifecycleWaitingEvent) => {
      // Assuming the user accepted the update, set up a listener
      // that will reload the page as soon as the previously waiting
      // service worker has taken control.
      wb.addEventListener('controlling', () => {
        // At this point, reloading will ensure that the current
        // tab is loaded under the control of the new service worker.
        // Depending on your web app, you may want to auto-save or
        // persist transient state before triggering the reload.
        window.location.reload();
      });

      // When `event.wasWaitingBeforeRegister` is true, a previously
      // updated service worker is still waiting.
      // You may want to customize the UI prompt accordingly.
      if (e.wasWaitingBeforeRegister) {
        return wb.messageSkipWaiting();
      }

      setUpdateFound(true);
    };

    // Add an event listener to detect when the registered
    // service worker has installed but is waiting to activate.
    wb.addEventListener('waiting', showSkipWaitingPrompt);

    const interval = setInterval(() => wb.update(), 5000);

    wb.register();

    return () => {
      wb.removeEventListener('controlling', NOOP);
      wb.removeEventListener('waiting', NOOP);
      clearInterval(interval);
    };
  }, [wb]);

  return (
    <Snackbar
      open={updateFound}
      title="Update"
      message="A new version of the website is available."
      action={<Button onClick={() => wb?.messageSkipWaiting()}>Update</Button>}
    />
  );
};
