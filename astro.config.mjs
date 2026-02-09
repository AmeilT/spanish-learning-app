import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://AmeilT.github.io',
  base: '/spanish-learning-app',
  integrations: [react(), tailwind()],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
