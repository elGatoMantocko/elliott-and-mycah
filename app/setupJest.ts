import resizeObserverMock from 'resize-observer-polyfill';

import { createMatchMedia } from './testHelpers';

// allows us to override the navigator and stub out the service worker api
Object.defineProperty(global.navigator, 'serviceWorker', {
  value: {
    getRegistrations: jest.fn(),
    register: jest.fn(),
  },
});

// mock window.location
Object.defineProperty(window, 'location', {
  writable: true,
  value: { reload: jest.fn() },
});

// setup resize observer so we don't get a bunch of warnings from the parallax provider
global.ResizeObserver = resizeObserverMock;

// setup match media for `useMediaQuery` material ui
global.matchMedia = createMatchMedia(1440);

// global this doesn't have this flag in jsdom, but @testing-library/react
// would like to know about it or they will throw a bunch of warnings saying that
// we are not in an "act" environment
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.IS_REACT_ACT_ENVIRONMENT = true;
