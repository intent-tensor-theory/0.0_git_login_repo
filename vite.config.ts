/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * vite.config.ts — BUILD CONFIGURATION FOR THE DIAMOND EMPIRE
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './src/0.0_folderRecursiveAppShellContainerAllPages'),
      '@auth': path.resolve(__dirname, './src/0.0_folderRecursiveAppShellContainerAllPages/1.0_folderAuthGateShellParent'),
      '@app': path.resolve(__dirname, './src/0.0_folderRecursiveAppShellContainerAllPages/2.0_folderMainAppShellParent'),
    },
  },
  
  server: {
    port: 3000,
    open: true,
  },
  
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'firebase': ['firebase/app', 'firebase/auth', 'firebase/storage', 'firebase/firestore'],
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
  
  // Environment variable prefix
  envPrefix: 'VITE_',
});
