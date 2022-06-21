// allows us to override the navigator and stub out the service worker api
Object.defineProperty(global.navigator, 'serviceWorker', {
  value: {
    getRegistrations: jest.fn(),
    register: jest.fn(),
  },
});
