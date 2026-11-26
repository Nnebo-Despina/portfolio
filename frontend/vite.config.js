import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// In development the API runs on :8000. The proxy means no CORS setup is needed locally.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000',
      '/media': 'http://127.0.0.1:8000',
    },
  },
  build: { target: 'es2020', cssCodeSplit: true },
})
