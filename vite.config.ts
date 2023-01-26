import { defineConfig } from 'vite';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],

  server: {
    open: 'http://127.0.0.1:5173/',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@Rtk': path.resolve(__dirname, './src/rtk'),
      '@Pages': path.resolve(__dirname, './src/pages'),
      '@Assets': path.resolve(__dirname, './src/assets'),
      '@Components': path.resolve(__dirname, './src/components'),
      '@Endpoints': path.resolve(__dirname, './src/consts/endpoints'),
    },
  },
});
