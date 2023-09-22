import react from '@vitejs/plugin-react';
import { defineConfig, UserConfig } from 'vite';
import { VitePWA as vitePwa } from 'vite-plugin-pwa';

const config: UserConfig = defineConfig({
  // 5kb asset inline limit
  build: { sourcemap: true, assetsInlineLimit: 1024 * 5 },
  plugins: [
    react({ jsxImportSource: '@emotion/react' }),
    vitePwa({
      filename: 'service-worker.js',
      injectRegister: null,
      devOptions: { enabled: true },
      workbox: { skipWaiting: false, clientsClaim: true },
    }),
  ],
});

export default config;
