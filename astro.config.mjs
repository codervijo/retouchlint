// astro.config.mjs
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://retouchlint.com',
  integrations: [sitemap(), react()],
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
