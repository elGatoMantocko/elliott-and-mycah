import { defineConfig, UserConfig } from 'vite';
import { VitePWA as vitePwa } from 'vite-plugin-pwa';

const config: UserConfig = defineConfig({
  // 5kb asset inline limit
  build: { sourcemap: true, assetsInlineLimit: 1024 * 5 },
  plugins: [
    vitePwa({
      filename: 'service-worker.js',
      injectRegister: null,
      devOptions: { enabled: true },
      workbox: { skipWaiting: false, clientsClaim: true },
    }),
  ],
});

export default config;
