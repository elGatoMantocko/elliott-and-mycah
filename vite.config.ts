import react from '@vitejs/plugin-react-swc';
import { defineConfig as viteDefineConfig, mergeConfig } from 'vite';
import { VitePWA as vitePwa } from 'vite-plugin-pwa';
import { defineConfig as vitestDefineConfig } from 'vitest/config';

// test config options
const testConfig = vitestDefineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: { provider: 'istanbul', enabled: true },
  },
});

// build config options
const buildConfig = viteDefineConfig({
  // 5kb asset inline limit
  build: {
    sourcemap: true,
    assetsInlineLimit: 1024 * 5,
    rollupOptions: {
      onwarn(warn, handler) {
        // ignore sourcemaps error due to terrible noise from MUI esbuild
        // https://github.com/vitejs/vite/issues/15012
        if (warn.code === 'SOURCEMAP_ERROR') {
          return;
        }
        handler(warn);
      },
    },
  },
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

export default mergeConfig(buildConfig, testConfig);
