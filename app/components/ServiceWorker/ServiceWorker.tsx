import { Button, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Workbox } from 'workbox-window';

export const ServiceWorker = () => {
  const [updateFound, setUpdateFound] = useState(false);
  const [wb, setWb] = useState<Workbox>();

  useEffect(() => {
    /**
     * import workbox and setup the service worker
     */
    async function setupWb() {
      if ('serviceWorker' in navigator) {
        const { Workbox } = await import('workbox-window');
        setWb(new Workbox('/service-worker.js'));
      }
    }
    setupWb().catch((err: unknown) => console.error(err));
  }, []);

  // ripped from https://developer.chrome.com/docs/workbox/handling-service-worker-updates/
  // more useful reading https://redfin.engineering/how-to-fix-the-refresh-button-when-using-service-workers-a8e27af6df68
  // with a few small modifications
  useEffect(() => {
    // break out if no service worker
    if (wb == null) return undefined;

    // if we fail to register or update the SW - lets just unregister it
    const registrationErrorHandler = async <T,>(err: unknown): Promise<T | undefined> => {
      console.error(err);
      // because our app is a PWA - we respond to 404s with the `index.html` file
      // this will cause an error in the service worker registration, because
      // `service-worker.js` will resolve to the index.html file and be the wrong
      // mime type for an allowed service worker.
      if (err instanceof DOMException) {
        const reg = await navigator.serviceWorker.getRegistration();
        await reg?.unregister();
      }
      return undefined;
    };

    const onControlling = () => window.location.reload();
    const onWaiting = () => {
      // Assuming the user accepted the update, set up a listener
      // that will reload the page as soon as the previously waiting
      // service worker has taken control.
      wb.addEventListener('controlling', onControlling);

      // When `event.wasWaitingBeforeRegister` is true, a previously
      // updated service worker is still waiting.
      // You may want to customize the UI prompt accordingly.
      //
      // The most likely scenario is that the user has the app open in another tab

      setUpdateFound(true);
    };

    // Add an event listener to detect when the registered
    // service worker has installed but is waiting to activate.
    wb.addEventListener('waiting', onWaiting);

    // register the service worker - if the sw was updated before this,
    // that means that we have a new version and need to figure out how to
    // update. This will trigger a `waiting` event with `wasWaitingBeforeRegister === true`.
    wb.register().catch(registrationErrorHandler);
    // FIXME: we should do an immediate check here to see if we are waiting - if so,
    // lets skip waiting and _not_ reload because the user is likely on the latest bundle

    // the service worker wont go check for updates on its own, we need to
    // periodically check for updates
    // if an update is found and installed successfully, it will put the SW in
    // the waiting state and trigger a `waiting` event
    const interval = setInterval(() => {
      wb.update().catch(registrationErrorHandler);
    }, 30000);

    return () => {
      wb.removeEventListener('controlling', onControlling);
      wb.removeEventListener('waiting', onWaiting);
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
