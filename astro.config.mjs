// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  server: {
    host: true,
    port: 43123,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
