// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import history from 'connect-history-api-fallback';

export default defineConfig({
  plugins: [react()],
  server: {
    middlewareMode: false,
  },
  configureServer(server) {
    server.middlewares.use(
      history({
        verbose: true,
        disableDotRule: false,
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
      })
    );
  },
});
