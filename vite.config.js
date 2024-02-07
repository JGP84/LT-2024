import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/LT-2024/",
  resolve: {
    alias: {
      '@': new URL('src', import.meta.url).pathname,
    },
  }
});


