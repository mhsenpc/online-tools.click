import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/responsive_grid_helper/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
