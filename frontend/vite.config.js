import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Additional configurations (optional)
  build: {
    // Enable assets optimization
    assetsInlineLimit: 4096, // Files smaller than 4kb will be inlined as data URIs
  },
})
