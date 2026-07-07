import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/react/',
  appType: 'custom',
  build: {
    outDir: '../public/react',
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: 'src/main.tsx',
      output: {
        entryFileNames: 'typewriter.js',
        chunkFileNames: '[name].js',
        assetFileNames: 'typewriter.[ext]',
      },
    },
  },
})
