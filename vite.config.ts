import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { host: 'localhost', port: 3000, strictPort: true },
  preview: { host: 'localhost', port: 4173, strictPort: true },
});
