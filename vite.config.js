import { sveltekit } from '@sveltejs/kit/vite';
import houdini from 'houdini/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [houdini(), sveltekit()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    alias: {
      $lib: '/src/lib'
    },
    setupFiles: ['/src/setupTests.ts']
  }
};

export default config;
