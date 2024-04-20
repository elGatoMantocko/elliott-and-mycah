import react from '@vitejs/plugin-react-swc';
import { defineConfig as viteDefineConfig } from 'vite';
import { VitePWA as vitePwa } from 'vite-plugin-pwa';
import vercel from 'vite-plugin-vercel';

export default viteDefineConfig({
  // 5kb asset inline limit
  build: {
    sourcemap: true,
    assetsInlineLimit: 1024 * 5,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          return null;
        },
      },
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
      workbox: {
        // includes default node_modules `globIgnores` pattern from vite-pwa's workbox settings
        globIgnores: ['**/node_modules/**/*', 'index.html'],
        // since we aren't pre-caching index.html, it can't be used as a fallback navigation
        // https://github.com/vite-pwa/vite-plugin-pwa/issues/120#issuecomment-1202579983
        navigateFallback: null,
      },
    }),
    vercel(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: { provider: 'istanbul', enabled: true },
  },
});
