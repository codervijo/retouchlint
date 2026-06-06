// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://retouchlint.com',
  integrations: [sitemap()],
  output: 'static',
});
