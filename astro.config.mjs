// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://haydenschultz.dev',
  integrations: [react(), icon()],
  redirects: { '/projects': '/' },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
    },
  }
});