// astro.config.mjs
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// App routes carry `noindex` (see Layout.astro). Keep them out of the sitemap
// too — a noindex URL listed in the sitemap sends Google contradictory signals.
const APP_ROUTES = ['/dashboard/', '/projects/', '/share/'];

export default defineConfig({
  site: 'https://retouchlint.com',
  integrations: [
    sitemap({ filter: (page) => !APP_ROUTES.some((r) => new URL(page).pathname.startsWith(r)) }),
    react(),
  ],
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
