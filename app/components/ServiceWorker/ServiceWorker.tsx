import { Button, Snackbar } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { Workbox, WorkboxLifecycleEvent, WorkboxLifecycleWaitingEvent } from 'workbox-window';

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

    const handleRegistration = async (registration: Promise<unknown>) => {
      try {
        // if we get an error, then the service worker was removed and we should unregister it
        await registration;
      } catch (err) {
        for (const reg of await navigator.serviceWorker.getRegistrations()) {
          if (await reg.unregister()) {
            console.log(`successfully unregistered sw ${reg}`);
          }
        }
      }
    };

    const timer = setInterval(() => handleRegistration(wb.update()), 30000);

    const triggerUpdate = (e: WorkboxLifecycleEvent) =>
      setUpdateFound(e.isUpdate || e.isExternal || false);
    const triggerWaitingUpdate = (e: WorkboxLifecycleWaitingEvent) => {
      if (e.wasWaitingBeforeRegister) {
        wb.messageSkipWaiting();
      } else {
        triggerUpdate(e);
      }
    };

    wb.addEventListener('installed', triggerUpdate);
    wb.addEventListener('waiting', triggerWaitingUpdate);

    handleRegistration(wb.register());

    return () => {
      wb.removeEventListener('installed', triggerUpdate);
      wb.removeEventListener('waiting', triggerWaitingUpdate);
      clearInterval(timer);
    };
  }, [wb]);

  return (
    <Snackbar
      open={updateFound}
      title="Update"
      message="A new version of the website is available."
      action={
        <Button
          onClick={async () => {
            await wb?.register();
            window.location.reload();
          }}
        >
          Update
        </Button>
      }
    />
  );
};
