import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import path from 'path';

export default defineConfig({
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    // Usamos path.resolve con __dirname para asegurar que la ruta sea absoluta
    setupFiles: [path.resolve(__dirname, 'src/test.ts')],
    include: ['src/**/*.spec.ts'],
    // Esto asegura que el entorno se prepare ANTES de ejecutar cualquier test
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
});